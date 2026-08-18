/**
 * GestureDetector - Calibrated Velocity/Delta Spike & Rolling Baseline Detector
 * Eliminates auto-trigger loops by using:
 * - 15-frame Rolling Average Baseline
 * - YAW_THRESHOLD = 0.090 (intentional turn left/right)
 * - PITCH_THRESHOLD = 0.160 (intentional nod down, well above resting 0.08 delta)
 * - REQUIRED_FRAMES = 8 (~300ms hold)
 * - COOLDOWN_MS = 1200
 * - Mandatory neutral re-centering before the next card can be triggered
 */

export interface LandmarkPoint {
  x: number;
  y: number;
  z?: number;
}

export interface GestureDetectionResult {
  detected: "NOD" | "SHAKE" | null;
  statusText: string;
  yawRatio: number;
  pitchRatio: number;
  deltaYaw: number;
  deltaPitch: number;
  nodProgress: number;
  shakeProgress: number;
  hasReturnedToNeutral: boolean;
}

export class GestureDetector {
  // Calibrated Thresholds
  private readonly YAW_THRESHOLD = 0.090;    // Geleng: intentional turn left/right
  private readonly PITCH_THRESHOLD = 0.160;  // Angguk: intentional nod down (well above resting 0.08 delta)
  private readonly REQUIRED_FRAMES = 8;      // ~300ms hold
  private readonly COOLDOWN_MS = 1200;

  // Frame Accumulator State
  private nodFrameCount: number = 0;
  private shakeFrameCount: number = 0;
  private isCoolingDown: boolean = false;
  private hasReturnedToNeutral: boolean = true;

  // 15-frame Rolling Baseline
  private pitchHistory: number[] = [];
  private yawHistory: number[] = [];

  public setLock(locked: boolean) {
    this.isCoolingDown = locked;
    if (locked) {
      this.hasReturnedToNeutral = false;
      this.nodFrameCount = 0;
      this.shakeFrameCount = 0;
    }
  }

  public reset() {
    this.nodFrameCount = 0;
    this.shakeFrameCount = 0;
    this.isCoolingDown = false;
    this.hasReturnedToNeutral = true;
    this.pitchHistory = [];
    this.yawHistory = [];
  }

  /**
   * Process 468/478 MediaPipe facial landmarks directly if available
   */
  public processLandmarks(landmarks: LandmarkPoint[]): GestureDetectionResult {
    if (!landmarks || landmarks.length < 455) {
      return this.createIdleResult(this.isCoolingDown ? "⏳ Menyiapkan Kartu Berikutnya..." : "Mencari Wajah...");
    }

    const nose = landmarks[1];
    const leftCheek = landmarks[234];
    const rightCheek = landmarks[454];
    const forehead = landmarks[10];
    const chin = landmarks[152];

    if (!nose || !leftCheek || !rightCheek || !forehead || !chin) {
      return this.createIdleResult("Landmark Wajah Tidak Lengkap");
    }

    // 1. Calculate Raw 3D Proportions
    const distLeft = Math.abs(nose.x - leftCheek.x);
    const distRight = Math.abs(nose.x - rightCheek.x);
    const currentYaw = distLeft / (distRight + 0.0001);

    const upperFace = Math.abs(nose.y - forehead.y);
    const lowerFace = Math.abs(chin.y - nose.y);
    const currentPitch = upperFace / (lowerFace + 0.0001);

    return this.evaluateHeadPose(currentYaw, currentPitch);
  }

  /**
   * Process downscaled video frame with optical facial ratio extraction
   */
  public processFrame(
    video: HTMLVideoElement,
    canvas: HTMLCanvasElement
  ): GestureDetectionResult {
    if (video.readyState < 2) {
      return this.createIdleResult(this.isCoolingDown ? "⏳ Menyiapkan Kartu Berikutnya..." : "Mempersiapkan Kamera...");
    }

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) {
      return this.createIdleResult("Error Canvas Context");
    }

    const width = 64;
    const height = 48;
    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(video, 0, 0, width, height);
    const frameData = ctx.getImageData(0, 0, width, height);
    const data = frameData.data;

    let leftWeight = 0;
    let rightWeight = 0;
    let upperWeight = 0;
    let lowerWeight = 0;
    let centerX = 0;
    let centerY = 0;
    let totalFaceWeight = 0;

    const startX = Math.floor(width * 0.15);
    const endX = Math.floor(width * 0.85);
    const startY = Math.floor(height * 0.1);
    const endY = Math.floor(height * 0.9);

    for (let y = startY; y < endY; y += 2) {
      for (let x = startX; x < endX; x += 2) {
        const idx = (y * width + x) * 4;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];

        const lum = 0.299 * r + 0.587 * g + 0.114 * b;
        const isSkin = r > 60 && g > 40 && b > 20 && r > b && (r - g) > 5;
        const weight = isSkin ? lum * 1.6 : lum > 40 ? lum * 0.6 : 0;

        if (weight > 25) {
          totalFaceWeight += weight;
          centerX += x * weight;
          centerY += y * weight;

          if (x < width * 0.45) leftWeight += weight;
          else if (x > width * 0.55) rightWeight += weight;

          if (y < height * 0.45) upperWeight += weight;
          else if (y > height * 0.55) lowerWeight += weight;
        }
      }
    }

    if (totalFaceWeight === 0) {
      return this.createIdleResult("Wajah Tidak Terdeteksi");
    }

    const noseX = centerX / totalFaceWeight;
    const noseY = centerY / totalFaceWeight;

    const leftDist = Math.max(2, noseX - startX);
    const rightDist = Math.max(2, endX - noseX);
    const currentYaw = (leftDist / rightDist) * ((rightWeight + 1) / (leftWeight + 1));

    const upperDist = Math.max(2, noseY - startY);
    const lowerDist = Math.max(2, endY - noseY);
    const currentPitch = (upperDist / lowerDist) * ((lowerWeight + 1) / (upperWeight + 1));

    return this.evaluateHeadPose(currentYaw, currentPitch);
  }

  /**
   * Process Head Pose with 15-frame Rolling Baseline & Mandatory Neutral Reset
   */
  private evaluateHeadPose(currentYaw: number, currentPitch: number): GestureDetectionResult {
    // 1. Maintain 15-frame Rolling Baseline
    this.pitchHistory.push(currentPitch);
    this.yawHistory.push(currentYaw);
    if (this.pitchHistory.length > 15) this.pitchHistory.shift();
    if (this.yawHistory.length > 15) this.yawHistory.shift();

    const avgPitch = this.pitchHistory.reduce((a, b) => a + b, 0) / this.pitchHistory.length;
    const avgYaw = this.yawHistory.reduce((a, b) => a + b, 0) / this.yawHistory.length;

    const deltaPitch = currentPitch - avgPitch;
    const deltaYaw = currentYaw - avgYaw;

    // 2. Handle Cooldown & Neutral Re-entry
    if (this.isCoolingDown) {
      return {
        detected: null,
        statusText: "⏳ Menyiapkan Kartu Berikutnya...",
        yawRatio: currentYaw,
        pitchRatio: currentPitch,
        deltaYaw,
        deltaPitch,
        nodProgress: 0,
        shakeProgress: 0,
        hasReturnedToNeutral: false,
      };
    }

    const isPhysicallyNeutral = Math.abs(deltaYaw) < 0.04 && Math.abs(deltaPitch) < 0.06;
    if (!this.hasReturnedToNeutral) {
      if (isPhysicallyNeutral) {
        this.hasReturnedToNeutral = true;
      } else {
        return {
          detected: null,
          statusText: "🟢 Kembalikan kepala ke posisi tegak...",
          yawRatio: currentYaw,
          pitchRatio: currentPitch,
          deltaYaw,
          deltaPitch,
          nodProgress: 0,
          shakeProgress: 0,
          hasReturnedToNeutral: false,
        };
      }
    }

    // 3. Gesture Evaluation (Strict Thresholds)
    const isShaking = Math.abs(deltaYaw) > this.YAW_THRESHOLD;
    const isNodding = deltaPitch > this.PITCH_THRESHOLD;

    let detected: "NOD" | "SHAKE" | null = null;
    let statusText = "🟢 Siap Membaca Gerakan (Netral)";

    if (isNodding) {
      this.nodFrameCount++;
      this.shakeFrameCount = 0;
      statusText = `🟢 Mendeteksi Angguk [Terima] (${this.nodFrameCount}/${this.REQUIRED_FRAMES})...`;

      if (this.nodFrameCount >= this.REQUIRED_FRAMES) {
        this.nodFrameCount = 0;
        this.hasReturnedToNeutral = false; // Force re-centering for next card
        this.isCoolingDown = true;
        detected = "NOD";
        statusText = "✅ KEPUTUSAN DITERIMA!";

        setTimeout(() => {
          this.isCoolingDown = false;
        }, this.COOLDOWN_MS);
      }
    } else if (isShaking) {
      this.shakeFrameCount++;
      this.nodFrameCount = 0;
      statusText = `🔴 Mendeteksi Geleng [Tolak] (${this.shakeFrameCount}/${this.REQUIRED_FRAMES})...`;

      if (this.shakeFrameCount >= this.REQUIRED_FRAMES) {
        this.shakeFrameCount = 0;
        this.hasReturnedToNeutral = false; // Force re-centering for next card
        this.isCoolingDown = true;
        detected = "SHAKE";
        statusText = "❌ KEPUTUSAN DITOLAK!";

        setTimeout(() => {
          this.isCoolingDown = false;
        }, this.COOLDOWN_MS);
      }
    } else {
      this.nodFrameCount = Math.max(0, this.nodFrameCount - 1);
      this.shakeFrameCount = Math.max(0, this.shakeFrameCount - 1);
      statusText = "🟢 Siap Membaca Gerakan (Netral)";
    }

    return {
      detected,
      statusText,
      yawRatio: currentYaw,
      pitchRatio: currentPitch,
      deltaYaw,
      deltaPitch,
      nodProgress: Math.min(1, this.nodFrameCount / this.REQUIRED_FRAMES),
      shakeProgress: Math.min(1, this.shakeFrameCount / this.REQUIRED_FRAMES),
      hasReturnedToNeutral: this.hasReturnedToNeutral,
    };
  }

  private createIdleResult(statusText: string): GestureDetectionResult {
    return {
      detected: null,
      statusText,
      yawRatio: 1.0,
      pitchRatio: 1.25,
      deltaYaw: 0,
      deltaPitch: 0,
      nodProgress: 0,
      shakeProgress: 0,
      hasReturnedToNeutral: this.hasReturnedToNeutral,
    };
  }
}
