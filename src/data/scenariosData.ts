export interface DecisionImpact {
  cash: number;
  debt: number;
  stress: number;
  literacy: number;
  feedback: string;
}

export interface ScenarioCard {
  id: number;
  scenario: string;
  category: string;
  yes: DecisionImpact;
  no: DecisionImpact;
}

export interface ModuleData {
  id: "pinjol" | "judol" | "budget";
  title: string;
  tag: string;
  badgeLabel: string;
  color: string;
  bgColor: string;
  initialCash: number;
  initialDebt: number;
  cards: ScenarioCard[];
}

export const ALL_SCENARIOS: Record<"pinjol" | "judol" | "budget", ScenarioCard[]> = {
  pinjol: [
    {
      id: 1,
      scenario: "Teman ngajak liburan mendadak ke Bali. Uang saku sisa Rp500.000. Ada SMS pinjol 'Cair 2 Juta Tanpa Syarat KTP, Bunga 2%/Hari'. Ambil tawaran ini?",
      category: "Jebakan Pinjol Ilegal",
      yes: { cash: 2000000, debt: 3200000, stress: 25, literacy: -20, feedback: "Bahaya! Bunga 2% per hari melipatgandakan utangmu dalam hitungan minggu." },
      no: { cash: 0, debt: 0, stress: -5, literacy: 20, feedback: "Bagus! Menolak pinjaman berbunga harian liar menyelamatkan masa depanmu." }
    },
    {
      id: 2,
      scenario: "Aplikasi pinjol meminta izin akses seluruh 'Kontak Telepon, Galeri Foto, & Lokasi GPS' agar dana Rp3.000.000 bisa cair. Izinkan akses?",
      category: "Penyedotan Izin Gadget",
      yes: { cash: 3000000, debt: 4500000, stress: 35, literacy: -25, feedback: "Fatal! Data kontak dan foto pribadimu kini tersimpan di server ilegal untuk disebarkan." },
      no: { cash: 0, debt: 0, stress: -5, literacy: 25, feedback: "Cerdas! Fintech legal OJK hanya diizinkan mengakses Kamera, Mikrofon, dan Lokasi (CAMILAN)." }
    },
    {
      id: 3,
      scenario: "Cicilan pinjol pertama jatuh tempo Rp1.000.000. Kamu tidak punya uang, lalu ada tawaran meminjam di aplikasi pinjol kedua untuk menutupnya. Ambil pinjaman baru?",
      category: "Gali Lubang Tutup Lubang",
      yes: { cash: 1000000, debt: 2200000, stress: 40, literacy: -30, feedback: "Terjebak! Siklus gali lubang tutup lubang melipatgandakan beban utang secara eksponensial." },
      no: { cash: -500000, debt: -500000, stress: 10, literacy: 20, feedback: "Tepat! Hadapi dan cicil semampunya tanpa menambah utang baru." }
    },
    {
      id: 4,
      scenario: "Debt collector mengirim pesan WhatsApp mengancam menyebarkan foto KTP editan vulgar ke grup keluarga jika tidak bayar dalam 2 jam. Panik dan jual laptop kuliah murah?",
      category: "Teror & Intimidasi DC",
      yes: { cash: 1500000, debt: -1500000, stress: 45, literacy: -20, feedback: "Rugi besar! Menjual aset produktif untuk membayar denda fiktif pemeras ilegal." },
      no: { cash: 0, debt: 0, stress: 10, literacy: 25, feedback: "Pilihan tepat! Laporkan teror pemerasan ke Satgas PASTI / OJK (157) dan kepolisian." }
    },
    {
      id: 5,
      scenario: "Ada akun media sosial menawarkan 'Jasa Joki Pinjol / Hapus Data Server OJK' dengan tarif jasa transfer Rp400.000 di muka. Apakah kamu mau mentransfer?",
      category: "Scam Jasa Joki",
      yes: { cash: -400000, debt: 0, stress: 30, literacy: -30, feedback: "Kena tipu! Tidak ada pihak luar yang bisa menghapus data riwayat SLIK OJK." },
      no: { cash: 0, debt: 0, stress: -5, literacy: 25, feedback: "Kritis! Menghindari sindikat joki yang mengeksploitasi kepanikan korban." }
    },
    {
      id: 6,
      scenario: "Mendapat transferan dana misterius Rp1.500.000 di rekening tanpa pernah mengajukan pinjaman. Beberapa jam kemudian ada yang menagih denda bunga. Pakai uangnya?",
      category: "Transfer Siluman Pinjol",
      yes: { cash: 1500000, debt: 3000000, stress: 35, literacy: -25, feedback: "Jebakan transfer paksa! Memakai uang tersebut membuatmu terjerat skema bunga liar." },
      no: { cash: 0, debt: 0, stress: -5, literacy: 30, feedback: "Tepat! Amankan bukti mutasi, jangan sentuh dananya, lalu laporkan ke bank & Satgas PASTI." }
    },
    {
      id: 7,
      scenario: "Teman satu kos minta tolong meminjamkan KTP dan foto selfie pegang KTP milikmu agar dia bisa mencairkan pinjaman online. Berikan KTP-mu?",
      category: "Penyalahgunaan Identitas",
      yes: { cash: 0, debt: 3000000, stress: 40, literacy: -30, feedback: "Fatal! Utang dan catatan buruk di SLIK OJK sepenuhnya atas nama dan tanggung jawabmu." },
      no: { cash: 0, debt: 0, stress: 0, literacy: 25, feedback: "Bijak! Jangan pernah meminjamkan dokumen identitas pribadi untuk transaksi keuangan orang lain." }
    },
    {
      id: 8,
      scenario: "Aplikasi pinjol menawarkan pencairan 'Rp5 Juta dalam 5 Menit', tapi biaya admin dipotong di awal Rp1.500.000 dan kamu hanya menerima Rp3.500.000. Terima?",
      category: "Potongan Admin Liar",
      yes: { cash: 3500000, debt: 5500000, stress: 25, literacy: -20, feedback: "Potongan admin 30% di muka sangat mencekik sebelum kamu sempat menggunakan dananya." },
      no: { cash: 0, debt: 0, stress: -5, literacy: 20, feedback: "Benar! Tolak pinjaman yang memotong admin tidak masuk akal di depan." }
    },
    {
      id: 9,
      scenario: "Gaji magang cair Rp2.500.000. Apakah kamu langsung alokasikan Rp1.800.000 untuk melunasi sisa pokok utang dan memblokir kontak pinjol ilegal?",
      category: "Pemulihan Finansial",
      yes: { cash: -1800000, debt: -2500000, stress: -45, literacy: 30, feedback: "Luar biasa! Melunasi pokok utang memutus rantai jeratan bunga berbunga." },
      no: { cash: 0, debt: 800000, stress: 25, literacy: -20, feedback: "Menunda pelunasan membuat denda harian terus bertambah tanpa henti." }
    },
    {
      id: 10,
      scenario: "Melihat logo OJK di website aplikasi pinjol, tapi saat dicek di kontak WhatsApp OJK 081-157-157-157 nama aplikasinya TIDAK TERDAFTAR. Tetap pinjam?",
      category: "Pencatutan Logo OJK Palsu",
      yes: { cash: 2000000, debt: 3800000, stress: 30, literacy: -25, feedback: "Pinjol ilegal sering mencatut logo OJK secara palsu untuk menipu korban." },
      no: { cash: 0, debt: 0, stress: -5, literacy: 25, feedback: "Sangat teliti! Selalu verifikasi legalitas fintech langsung di kanal resmi OJK." }
    },
    {
      id: 11,
      scenario: "Muncul notifikasi pinjaman menawarkan bunga rendah 0.1% per hari. Namun di syarat ketentuan tersembunyi tertulis denda keterlambatan Rp200.000/hari. Setujui?",
      category: "Klausul Denda Tersembunyi",
      yes: { cash: 1000000, debt: 2500000, stress: 30, literacy: -20, feedback: "Denda keterlambatan ratusan ribu per hari adalah jebakan predator finansial." },
      no: { cash: 0, debt: 0, stress: -5, literacy: 20, feedback: "Bagus! Membaca detail syarat dan denda sebelum menyetujui perjanjian pinjaman." }
    },
    {
      id: 12,
      scenario: "Kamu ditawari menjadi perantara / affiliate link pinjol ilegal dengan komisi Rp100.000 per kontak teman kampus yang mendaftar. Mau sebarkan link?",
      category: "Jaringan Makelar Pinjol",
      yes: { cash: 300000, debt: 0, stress: 25, literacy: -25, feedback: "Kamu membahayakan teman-temanmu dan bisa terseret masalah hukum persekongkolan." },
      no: { cash: 0, debt: 0, stress: 0, literacy: 25, feedback: "Integritas tinggi! Menolak keuntungan sesaat yang merugikan orang sekitar." }
    },
    {
      id: 13,
      scenario: "Pinjol ilegal menawarkan perpanjangan tenor 7 hari dengan syarat membayar 'Biaya Perpanjangan' Rp500.000 tanpa mengurangi pokok utang sama sekali. Bayar?",
      category: "Jebakan Biaya Rollover",
      yes: { cash: -500000, debt: 0, stress: 20, literacy: -25, feedback: "Biaya rollover hanya membeli waktu tanpa mengurangi sepeserpun utang pokokmu." },
      no: { cash: 0, debt: 0, stress: 5, literacy: 20, feedback: "Benar! Fokuskan negosiasi hanya untuk pembayaran pokok pinjaman." }
    },
    {
      id: 14,
      scenario: "Seorang oknum mengaku dari customer service pinjol meminta kode OTP SMS yang baru masuk ke HP-mu untuk verifikasi pembatalan pinjaman. Berikan kodenya?",
      category: "Social Engineering OTP",
      yes: { cash: -1000000, debt: 2000000, stress: 40, literacy: -35, feedback: "OTP adalah kunci gerbang akunmu! Memberikannya berarti menyetujui pencairan utang baru." },
      no: { cash: 0, debt: 0, stress: -5, literacy: 30, feedback: "Hebat! Jangan pernah membagikan kode OTP kepada siapa pun, termasuk pihak aplikasi." }
    },
    {
      id: 15,
      scenario: "Kamu menerima link download file pinjol berformat '.APK' lewat WhatsApp dari nomor tak dikenal dengan klaim 'Persetujuan Limit Rp10 Juta'. Install aplikasinya?",
      category: "Malware APK Pencuri Data",
      yes: { cash: 0, debt: 5000000, stress: 50, literacy: -35, feedback: "File APK tersebut menyusupkan malware pencuri SMS OTP m-banking dan kontakmu." },
      no: { cash: 0, debt: 0, stress: -5, literacy: 30, feedback: "Pintar! Menolak instalasi APK dari luar toko aplikasi resmi (Play Store / App Store)." }
    },
    {
      id: 16,
      scenario: "Mendapat tawaran pinjaman online dengan tenor sangat singkat hanya 4 hari. Apakah kamu menyetujui tawaran kilat ini?",
      category: "Tenor Mencekik",
      yes: { cash: 1000000, debt: 1800000, stress: 30, literacy: -20, feedback: "Tenor 4 hari dirancang agar debitur gagal bayar dan terkena akumulasi denda." },
      no: { cash: 0, debt: 0, stress: -5, literacy: 20, feedback: "Tepat! Hindari pinjaman dengan batas waktu yang tidak realistis untuk dilunasi." }
    },
    {
      id: 17,
      scenario: "Keluarga dihubungi DC pinjol karena nomormu dijadikan kontak darurat tanpa izin. Apakah kamu langsung mengganti nomor HP dan kabur dari masalah?",
      category: "Penanganan Masalah",
      yes: { cash: 0, debt: 1000000, stress: 30, literacy: -15, feedback: "Melarikan diri tidak menyelesaikan masalah dan justru membebani kontak darurat." },
      no: { cash: 0, debt: 0, stress: 5, literacy: 25, feedback: "Dewasa! Hadapi dengan pendampingan hukum dan klarifikasi ke pihak keluarga." }
    },
    {
      id: 18,
      scenario: "Apakah kamu mengecek riwayat kreditmu di aplikasi iDebku OJK / SLIK sebelum mengajukan beasiswa atau cicilan rumah pertama?",
      category: "Cek Kesehatan Skor Kredit",
      yes: { cash: 0, debt: 0, stress: -10, literacy: 25, feedback: "Sangat baik! Memastikan status kolektibilitas kredit tetap bersih (KOL 1 - Lancar)." },
      no: { cash: 0, debt: 0, stress: 5, literacy: -10, feedback: "Tidak peduli skor kredit bisa menghambat pengajuan pembiayaan penting di masa depan." }
    },
    {
      id: 19,
      scenario: "Ada penawaran dana kilat dengan syarat menyerahkan jaminan ijazah asli atau buku tabungan beserta kartu ATM. Serahkan dokumen fisik?",
      category: "Penahanan Dokumen Ilegal",
      yes: { cash: 2000000, debt: 3000000, stress: 40, literacy: -30, feedback: "Menyerahkan dokumen asli berharga membuatmu tersandera oleh lintah darat." },
      no: { cash: 0, debt: 0, stress: -5, literacy: 25, feedback: "Tepat! Jangan pernah jadikan dokumen kependudukan/ijazah sebagai jaminan pinjol." }
    },
    {
      id: 20,
      scenario: "Setelah melunasi pinjol legal berizin OJK, kamu meminta 'Surat Keterangan Lunas (SKL)' resmi dari customer service. Lakukan ini?",
      category: "Administrasi Pelunasan",
      yes: { cash: 0, debt: 0, stress: -15, literacy: 25, feedback: "Langkah proaktif! SKL adalah bukti mutlak jika sewaktu-waktu terjadi kesalahan penagihan." },
      no: { cash: 0, debt: 0, stress: 5, literacy: -10, feedback: "Tanpa bukti SKL, catatan kreditmu berisiko masih terdaftar tertunggak di sistem." }
    }
  ],
  judol: [
    {
      id: 1,
      scenario: "Melihat iklan game putar roda berhadiah: 'Deposit Rp50.000 langsung dapat saldo Rp200.000, dijamin cair ke e-wallet'. Apakah kamu mau transfer deposit awal?",
      category: "Jebakan Masuk",
      yes: { cash: -50000, debt: 0, stress: 15, literacy: -20, feedback: "Kamu terpancing masuk ke dalam sistem manipulasi algoritma judi online." },
      no: { cash: 0, debt: 0, stress: -5, literacy: 20, feedback: "Tepat! Game penghasil uang instan 99% adalah kamuflase platform judol berlisensi palsu." }
    },
    {
      id: 2,
      scenario: "Di putaran awal kamu sengaja 'dibuat menang' Rp400.000 oleh algoritma. Notifikasi muncul: 'Pasang Rp250.000 sekarang untuk membuka Jackpot Sensational Rp5 Juta'. Pasang taruhan?",
      category: "Ilusi Menang Awal",
      yes: { cash: -250000, debt: 0, stress: 25, literacy: -25, feedback: "Manipulasi dopamin berhasil membuatmu mempertaruhkan uang sungguhan demi angka di layar." },
      no: { cash: 150000, debt: 0, stress: -10, literacy: 25, feedback: "Hebat! Kamu segera menarik sisa saldo dan berhenti sebelum algoritma menyedot habis modalmu." }
    },
    {
      id: 3,
      scenario: "Saldo di akun tiba-tiba terkunci. CS Telegram menyatakan: 'Akun membeku, setor uang jaminan Rp500.000 agar kemenangan bisa dicairkan'. Kirim uang jaminan?",
      category: "Scam Penarikan Dana",
      yes: { cash: -500000, debt: 0, stress: 35, literacy: -30, feedback: "Kamu masuk jebakan deposit tebusan. Uang jaminan tersebut tidak akan pernah kembali." },
      no: { cash: 0, debt: 0, stress: 5, literacy: 25, feedback: "Pilihan bijak! Memutus kerugian (cut loss) dan tidak tertipu modus uang tebusan pencairan." }
    },
    {
      id: 4,
      scenario: "Saldo habis total. Teman tongkrongan menawarkan pinjaman modal Rp1.000.000 dengan syarat bagi hasil kemenangan nanti malam. Ambil pinjaman ini?",
      category: "Siklus Balas Modal",
      yes: { cash: 1000000, debt: 1200000, stress: 40, literacy: -30, feedback: "Berbahaya! Berutang demi judi adalah awal dari kehancuran relasi sosial dan jeratan utang." },
      no: { cash: 0, debt: 0, stress: -10, literacy: 25, feedback: "Tepat! Menolak pinjaman spekulatif menjaga hubungan pertemanan dan masa depanmu." }
    },
    {
      id: 5,
      scenario: "Seorang influencer mempromosikan bot pola gacor dengan klaim akurasi kemenangan 98% seharga Rp200.000. Mau beli bot tersebut?",
      category: "Scam Pola Gacor",
      yes: { cash: -200000, debt: 0, stress: 25, literacy: -25, feedback: "Pola gacor adalah mitos! Algoritma server RNG judol 100% diatur untuk memenangkan bandar." },
      no: { cash: 0, debt: 0, stress: -5, literacy: 25, feedback: "Kritis! Memahami bahwa bandar judi tidak pernah membuat sistem yang membuat pemain kaya." }
    },
    {
      id: 6,
      scenario: "Apakah kamu memutuskan untuk menghapus seluruh aplikasi game taruhan, memblokir kontak agen Telegram, dan melapor ke aduankonten.id Komdigi?",
      category: "Pemutusan Adiksi",
      yes: { cash: 0, debt: 0, stress: -40, literacy: 30, feedback: "Selamat! Kamu berhasil memutus siklus adiksi sebelum terlambat dan menyelamatkan finansialmu." },
      no: { cash: -300000, debt: 500000, stress: 30, literacy: -20, feedback: "Menyimpan kontak agen membuatmu rentan kembali terjerumus di kemudian hari." }
    },
    {
      id: 7,
      scenario: "Muncul pesan blast SMS berisi link login situs slot dengan klaim saldo gratis 'Freebet Rp100.000 tanpa deposit'. Klik link dan daftarkan nomor rekening?",
      category: "Phishing Data Rekening",
      yes: { cash: 0, debt: 0, stress: 20, literacy: -20, feedback: "Situs phishing mencatat data perbankan dan nomor teleponmu untuk dijual ke sindikat penipu." },
      no: { cash: 0, debt: 0, stress: -5, literacy: 20, feedback: "Bagus! Jangan pernah mendaftarkan nomor rekening pada platform perjudian ilegal." }
    },
    {
      id: 8,
      scenario: "Setelah kalah Rp500.000, muncul rasa penasaran dan keyakinan 'putaran berikutnya pasti jackpot untuk balas dendam'. Apakah kamu terus mengisi deposit?",
      category: "Gambler's Fallacy",
      yes: { cash: -500000, debt: 0, stress: 35, literacy: -25, feedback: "Gambler's fallacy: mengira kekalahan berulang memperbesar peluang menang di masa depan." },
      no: { cash: 0, debt: 0, stress: -10, literacy: 25, feedback: "Pintar! Menolak dorongan emosional 'chasing losses' yang selalu berujung kebangkrutan." }
    },
    {
      id: 9,
      scenario: "Ada tawaran menyewakan rekening tabungan bank milikmu kepada pihak ketiga dengan imbalan sewa Rp500.000 per bulan. Terima tawaran sewa rekening?",
      category: "Rekening Penampung Judol",
      yes: { cash: 500000, debt: 0, stress: 50, literacy: -40, feedback: "Bahaya kriminal! Rekeningmu dijadikan tempat pencucian uang judol dan bisa diblokir PPATK." },
      no: { cash: 0, debt: 0, stress: 0, literacy: 30, feedback: "Sangat tepat! Menyewakan rekening bank melanggar hukum dan berisiko pidana perbankan." }
    },
    {
      id: 10,
      scenario: "Teman mengajak patungan modal Rp200.000 untuk main bareng di platform live casino online. Apakah kamu ikut patungan?",
      category: "Tekanan Rekan Sebaya",
      yes: { cash: -200000, debt: 0, stress: 20, literacy: -15, feedback: "Tekanan sosial sering menjadi gerbang utama masuknya anak muda ke dalam jeratan judi." },
      no: { cash: 0, debt: 0, stress: -5, literacy: 20, feedback: "Tegas! Memiliki batasan prinsip keuangan pribadi yang tidak goyah oleh ajakan teman." }
    },
    {
      id: 11,
      scenario: "Kamu melihat iklan game santai mencantumkan fitur 'Lootbox berbayar dengan peluang hadiah 1%'. Apakah kamu membeli koin untuk gacha berulang kali?",
      category: "Gacha & Gamifikasi Judi",
      yes: { cash: -150000, debt: 0, stress: 15, literacy: -15, feedback: "Mekanika gacha berbayar memicu lonjakan dopamin yang identik dengan mesin slot kasino." },
      no: { cash: 0, debt: 0, stress: 0, literacy: 20, feedback: "Bijak! Menikmati game tanpa terjebak mekanika mikrotransaksi spekulatif." }
    },
    {
      id: 12,
      scenario: "Merasa stres karena tugas kuliah menumpuk, lalu ingin mencari hiburan instan dengan bermain game spin berbayar 10 menit saja. Buka aplikasinya?",
      category: "Pelarian Emosional",
      yes: { cash: -100000, debt: 0, stress: 25, literacy: -20, feedback: "Menggunakan judi sebagai pelarian stres justru menambah beban pikiran dan saldo habis." },
      no: { cash: 0, debt: 0, stress: -10, literacy: 20, feedback: "Sehat! Mengalihkan stres ke kegiatan produktif atau olahraga tanpa risiko finansial." }
    },
    {
      id: 13,
      scenario: "Akun e-wallet terhubung langsung dengan fitur one-click payment ke situs game taruhan. Apakah kamu segera memutuskan integrasi pembayaran tersebut?",
      category: "Pemutusan Akses Finansial",
      yes: { cash: 0, debt: 0, stress: -15, literacy: 25, feedback: "Langkah protektif! Menambah friksi pembayaran mencegah keputusan impulsif di saat emosi." },
      no: { cash: -200000, debt: 0, stress: 15, literacy: -15, feedback: "Kemudahan one-click payment membuat saldo e-wallet terkuras tanpa sempat berpikir logis." }
    },
    {
      id: 14,
      scenario: "Menemukan situs live streaming game yang menyisipkan banner promosi situs judi online. Apakah kamu melaporkan live stream tersebut?",
      category: "Partisipasi Laporan Publik",
      yes: { cash: 0, debt: 0, stress: 0, literacy: 20, feedback: "Aksi nyata! Melaporkan konten promosi judol membantu melindungi generasi muda lainnya." },
      no: { cash: 0, debt: 0, stress: 0, literacy: 0, feedback: "Membiarkan promosi judol memperluas jangkauan korban di platform publik." }
    },
    {
      id: 15,
      scenario: "Gaji bulanan masuk. Teman menyarankan menyisihkan 10% untuk 'investasi spekulasi cepat di platform tebak angka'. Alokasikan dananya?",
      category: "Kamuflase Investasi Bodong",
      yes: { cash: -250000, debt: 0, stress: 25, literacy: -25, feedback: "Tebak angka bukan investasi! Itu adalah perjudian murni dengan ekspektasi nilai negatif." },
      no: { cash: 0, debt: 0, stress: -5, literacy: 25, feedback: "Cerdas! Bedakan investasi beraset riil dan instrumen spekulasi berkedok trading/judi." }
    },
    {
      id: 16,
      scenario: "CS situs judol menawarkan bonus cashback 10% dari total kekalahan jika melakukan deposit ulang Rp500.000 hari ini. Ambil promosi cashback?",
      category: "Promosi Cashback Manipulatif",
      yes: { cash: -500000, debt: 0, stress: 30, literacy: -25, feedback: "Bonus cashback adalah umpan bandar agar pemain terus menyetor dana segar yang lebih besar." },
      no: { cash: 0, debt: 0, stress: -5, literacy: 20, feedback: "Tepat! Jangan tertipu ilusi diskon pada platform yang dirancang untuk merugikanmu." }
    },
    {
      id: 17,
      scenario: "Apakah kamu memasang aplikasi pemblokir situs terlarang (DNS filtering) di smartphone untuk mencegah godaan membuka situs taruhan?",
      category: "Self-Control Tooling",
      yes: { cash: 0, debt: 0, stress: -10, literacy: 25, feedback: "Disiplin digital! Memasang firewall mandiri menciptakan lingkungan digital yang bersih." },
      no: { cash: 0, debt: 0, stress: 5, literacy: -5, feedback: "Tanpa proteksi, iklan pop-up di internet dapat memicu dorongan adiksi kambuh kembali." }
    },
    {
      id: 18,
      scenario: "Mendengar cerita teman yang mengaku menang Rp10 juta dari game taruhan. Apakah kamu langsung tergiur untuk ikut mencoba?",
      category: "Survivorship Bias",
      yes: { cash: -300000, debt: 0, stress: 20, literacy: -20, feedback: "Survivorship bias: orang hanya menceritakan kemenangannya dan menyembunyikan kekalahannya." },
      no: { cash: 0, debt: 0, stress: -5, literacy: 25, feedback: "Logis! Menyadari bahwa di balik 1 orang yang pamer menang, ada ribuan orang yang bangkrut." }
    },
    {
      id: 19,
      scenario: "Apakah kamu memisahkan rekening kebutuhan harian dengan rekening tabungan utama agar dana tabungan tidak mudah ditarik secara impulsif?",
      category: "Sistem Manajemen Rekening",
      yes: { cash: 0, debt: 0, stress: -15, literacy: 25, feedback: "Strategi ampuh! Memisahkan rekening menjaga dana masa depan dari kebocoran transaksi impulsif." },
      no: { cash: -150000, debt: 0, stress: 10, literacy: -10, feedback: "Satu rekening campur aduk membuatmu mudah mengorbankan tabungan darurat." }
    },
    {
      id: 20,
      scenario: "Melihat grup komunitas di Telegram yang sering membagikan bukti transfer kemenangan. Apakah kamu keluar dari grup tersebut?",
      category: "Detoks Lingkungan Komunitas",
      yes: { cash: 0, debt: 0, stress: -10, literacy: 25, feedback: "Langkah bijak! Testimoni grup Telegram umumnya adalah rekayasa admin untuk memancing deposit." },
      no: { cash: -100000, debt: 0, stress: 15, literacy: -15, feedback: "Bertahan di lingkungan toxic membuat alam bawah sadarmu terbiasa dengan narasi judol." }
    }
  ],
  budget: [
    {
      id: 1,
      scenario: "Baru awal bulan, tanggal kembar 10.10 tiba. Ada flash sale sneaker idaman diskon 50% seharga Rp800.000 dengan tawaran 'Cicilan Paylater 12 Bulan Rp89.000/bln'. Beli sekarang?",
      category: "Godaan Konsumtif",
      yes: { cash: 0, debt: 1068000, stress: 15, literacy: -20, feedback: "Cicilan kecil jika ditotal bunganya mencapai 33%! Uang saku bulananmu kini terpotong cicilan." },
      no: { cash: 0, debt: 0, stress: -5, literacy: 20, feedback: "Disiplin! Membedakan kebutuhan primer dan keinginan impulsif di awal bulan." }
    },
    {
      id: 2,
      scenario: "Teman-teman satu jurusan mengajak nongkrong di kafe estetik setiap pulang kuliah (est. Rp60.000/hari atau Rp1.200.000/bln). Apakah kamu ikut setiap hari demi FOMO?",
      category: "Tekanan Sosial",
      yes: { cash: -600000, debt: 0, stress: 20, literacy: -15, feedback: "Pengeluaran latte factor menguras 30% total uang saku bulananmu tanpa kamu sadari." },
      no: { cash: -150000, debt: 0, stress: -10, literacy: 20, feedback: "Bagus! Membatasi nongkrong 1-2 kali seminggu menjaga dompet tetap sehat tanpa terisolasi." }
    },
    {
      id: 3,
      scenario: "Cek mutasi bank: Kamu menemukan 4 tagihan langganan otomatis (Netflix, Spotify, Cloud, Gym) senilai Rp350.000 yang jarang kamu pakai. Apakah kamu membatalkan langganan tersebut?",
      category: "Biaya Siluman",
      yes: { cash: 350000, debt: 0, stress: -10, literacy: 25, feedback: "Pintar! Menghilangkan subscription trap menghemat jutaan rupiah dalam setahun." },
      no: { cash: -350000, debt: 0, stress: 15, literacy: -15, feedback: "Uang menguap untuk layanan yang tidak memberi nilai tambah nyata pada produktivitasmu." }
    },
    {
      id: 4,
      scenario: "Di minggu ke-3, laptopmu rusak dan butuh servis darurat Rp400.000. Apakah kamu menggunakan dana darurat tabungan daripada mengaktifkan fitur Paylater berbunga?",
      category: "Dana Darurat",
      yes: { cash: -400000, debt: 0, stress: -5, literacy: 25, feedback: "Inilah fungsi sesungguhnya dari dana darurat: menyelesaikan masalah tanpa berutang." },
      no: { cash: 0, debt: 550000, stress: 25, literacy: -20, feedback: "Menggunakan paylater untuk kebutuhan darurat menambah beban bunga baru." }
    },
    {
      id: 5,
      scenario: "Akhir bulan tersisa uang Rp400.000. Apakah kamu alokasikan Rp300.000 ke instrumen reksa dana pasar uang / emas digital untuk tabungan masa depan?",
      category: "Investasi & Disiplin",
      yes: { cash: -300000, debt: 0, stress: -30, literacy: 30, feedback: "Selamat! Kamu berhasil menuntaskan survival 30 hari dan mulai membangun aset produktif!" },
      no: { cash: -400000, debt: 0, stress: 15, literacy: -15, feedback: "Uang sisa habis dipakai foya-foya tanpa ada cadangan untuk bulan depan." }
    },
    {
      id: 6,
      scenario: "Mendapat tawaran voucher diskon 70% pesan makanan online, tetapi syarat minimal belanja Rp150.000 padahal kamu sedang sendirian. Tetap beli?",
      category: "Jebakan Minimum Belanja",
      yes: { cash: -150000, debt: 0, stress: 10, literacy: -15, feedback: "Hemat Rp30.000 tapi membuang Rp150.000 untuk porsi makan berlebih bukanlah penghematan." },
      no: { cash: -35000, debt: 0, stress: -5, literacy: 20, feedback: "Rasional! Membeli makanan sesuai kebutuhan porsi nyata tanpa tergoda trik promo." }
    },
    {
      id: 7,
      scenario: "Gaji pertama cair. Teman-teman menuntutmu mentraktir makan malam mewah senilai Rp800.000 demi gengsi. Apakah kamu mengiyakan seluruh traktiran?",
      category: "Traktiran Gengsi",
      yes: { cash: -800000, debt: 0, stress: 25, literacy: -20, feedback: "Gengsi sesaat mengorbankan 40% alokasi tabungan awal bulanmu." },
      no: { cash: -200000, debt: 0, stress: -5, literacy: 25, feedback: "Tegas! Mentraktir camilan wajar semampunya tanpa merusak rencana anggaran bulanan." }
    },
    {
      id: 8,
      scenario: "Melihat opsi pembayaran kartu kredit / paylater: 'Bayar Minimum Saja (Minimum Payment 10%)'. Apakah kamu memilih bayar minimum dan menunda sisanya?",
      category: "Jebakan Minimum Payment",
      yes: { cash: 0, debt: 600000, stress: 20, literacy: -25, feedback: "Membayar minimum memicu bunga berbunga harian yang membuat utang pokok tak kunjung lunas." },
      no: { cash: -500000, debt: -500000, stress: -10, literacy: 25, feedback: "Cerdas! Selalu lunasi tagihan secara penuh (full payment) sebelum tanggal jatuh tempo." }
    },
    {
      id: 9,
      scenario: "Apakah kamu mencatat setiap pemasukan dan pengeluaran harian di aplikasi pencatat keuangan secara disiplin setiap malam?",
      category: "Budget Tracking",
      yes: { cash: 0, debt: 0, stress: -10, literacy: 25, feedback: "Hebat! Mengetahui ke mana setiap rupiah mengalir adalah fondasi utama kekayaan." },
      no: { cash: -100000, debt: 0, stress: 10, literacy: -10, feedback: "Tanpa pencatatan, pengeluaran kecil tak terlihat (bocor halus) akan menguras dompetmu." }
    },
    {
      id: 10,
      scenario: "Saat berjalan di mall, kamu melihat baju diskon bagus yang tidak ada dalam daftar belanjaan bulanan. Apakah kamu menerapkan 'Aturan Tunggu 48 Jam' sebelum beli?",
      category: "Metode Delayed Gratification",
      yes: { cash: 0, debt: 0, stress: -5, literacy: 25, feedback: "Metode 48 jam ampuh meredam nafsu belanja impulsif yang sering disesali kemudian." },
      no: { cash: -350000, debt: 0, stress: 15, literacy: -15, feedback: "Belanja impulsif barang non-primer mengurangi alokasi untuk pos kebutuhan penting." }
    },
    {
      id: 11,
      scenario: "Mendapat kenaikan uang saku / gaji Rp500.000. Apakah kamu langsung menaikkan gaya hidup konsumtifmu setara dengan kenaikan tersebut?",
      category: "Lifestyle Inflation",
      yes: { cash: -500000, debt: 0, stress: 15, literacy: -20, feedback: "Lifestyle inflation membuat tabunganmu tetap nol meskipun penghasilan terus meningkat." },
      no: { cash: 0, debt: 0, stress: -10, literacy: 25, feedback: "Sangat matang! Mengalihkan kenaikan pendapatan langsung ke tabungan dan investasi." }
    },
    {
      id: 12,
      scenario: "Ada tawaran upgrade smartphone terbaru dengan cicilan 0% selama 24 bulan, padahal smartphonemu saat ini masih berfungsi sangat lancar. Ambil cicilan?",
      category: "Upgrade Gadget Konsumtif",
      yes: { cash: 0, debt: 12000000, stress: 30, literacy: -25, feedback: "Cicilan jangka panjang 2 tahun mengikat fleksibilitas keuangan masa depanmu." },
      no: { cash: 0, debt: 0, stress: -5, literacy: 25, feedback: "Bijak! Menggunakan gadget hingga usia ekonomis optimal sebelum memutuskan upgrade." }
    },
    {
      id: 13,
      scenario: "Apakah kamu menerapkan rumus alokasi anggaran 50/30/20 (50% Kebutuhan, 30% Keinginan, 20% Tabungan/Investasi)?",
      category: "Budgeting Rule 50/30/20",
      yes: { cash: 0, debt: 0, stress: -15, literacy: 30, feedback: "Standar emas finansial! Struktur anggaran terencana memberi rasa tenang dan kepastian." },
      no: { cash: -200000, debt: 0, stress: 15, literacy: -15, feedback: "Tanpa rasio baku, pos keinginan seringkali menelan lebih dari 60% pendapatan." }
    },
    {
      id: 14,
      scenario: "Supermarket menawarkan promo 'Beli 3 Gratis 1' untuk produk camilan yang cepat kedaluwarsa. Apakah kamu membeli 3 paket sekaligus?",
      category: "Jebakan Bulk Buying",
      yes: { cash: -120000, debt: 0, stress: 5, literacy: -10, feedback: "Membeli makanan berlebih yang berakhir basi di kulkas adalah pemborosan terselubung." },
      no: { cash: -30000, debt: 0, stress: 0, literacy: 20, feedback: "Rasional! Membeli hanya sejumlah yang sanggup dikonsumsi sebelum masa kedaluwarsa." }
    },
    {
      id: 15,
      scenario: "Apakah kamu menyiapkan dana darurat minimal setara 3 bulan biaya hidup sebelum mulai berinvestasi pada instrumen berisiko tinggi (kripto/saham)?",
      category: "Hierarki Piramida Finansial",
      yes: { cash: 0, debt: 0, stress: -20, literacy: 30, feedback: "Pondasi kokoh! Dana darurat melindungimu dari keharusan menjual aset saat pasar jatuh." },
      no: { cash: 0, debt: 0, stress: 20, literacy: -20, feedback: "Investasi tanpa dana darurat memaksa orang berutang saat terjadi musibah mendadak." }
    },
    {
      id: 16,
      scenario: "Teman menawarkan investasi titip dana dengan imbal hasil tetap 15% per bulan tanpa risiko. Apakah kamu menyetorkan tabunganmu?",
      category: "Investasi Bodong Ponzi",
      yes: { cash: -1000000, debt: 0, stress: 45, literacy: -35, feedback: "Skema Ponzi klasik! Tidak ada instrumen investasi legal yang menjamin return 15%/bulan." },
      no: { cash: 0, debt: 0, stress: -5, literacy: 30, feedback: "Kritis! Selalu ingat prinsip 2L dari OJK: Legal (berizin) dan Logis (masuk akal)." }
    },
    {
      id: 17,
      scenario: "Saat berbelanja bulanan, apakah kamu selalu menulis daftar belanjaan dari rumah dan berjanji tidak membeli barang di luar daftar?",
      category: "Disiplin Shopping List",
      yes: { cash: 0, debt: 0, stress: -5, literacy: 20, feedback: "Daftar belanjaan adalah tameng terbaik melawan trik penataan etalase toko." },
      no: { cash: -200000, debt: 0, stress: 10, literacy: -10, feedback: "Belanja tanpa daftar membuat keranjang terisi oleh barang-barang tidak penting." }
    },
    {
      id: 18,
      scenario: "Apakah kamu secara rutin membandingkan harga barang kebutuhan di beberapa platform e-commerce sebelum menekan tombol checkout?",
      category: "Smart Price Comparison",
      yes: { cash: 50000, debt: 0, stress: -5, literacy: 20, feedback: "Konsumen cerdas! Menghemat selisih harga dan ongkos kirim secara konsisten." },
      no: { cash: -50000, debt: 0, stress: 0, literacy: -5, feedback: "Membeli langsung tanpa perbandingan seringkali membayar harga lebih mahal." }
    },
    {
      id: 19,
      scenario: "Menghadapi promo 'Cashback Koin 50%' yang hanya bisa digunakan untuk belanja lagi dalam 7 hari ke depan. Apakah kamu memaksakan belanja demi memakai koin?",
      category: "Jebakan Cashback Koin",
      yes: { cash: -150000, debt: 0, stress: 10, literacy: -15, feedback: "Membelanjakan uang baru demi koin diskon adalah trik platform menjaga retensi belanjamu." },
      no: { cash: 0, debt: 0, stress: -5, literacy: 20, feedback: "Cerdas! Menolak belanja yang tidak direncanakan hanya demi voucher kedaluwarsa." }
    },
    {
      id: 20,
      scenario: "Apakah kamu mengevaluasi total pengeluaran dan capaian tabunganmu di setiap akhir bulan bersama pasangan / keluarga?",
      category: "Evaluasi Finansial Bulanan",
      yes: { cash: 0, debt: 0, stress: -15, literacy: 25, feedback: "Luar biasa! Evaluasi rutin membantu mendeteksi kebocoran anggaran dan menyelaraskan target." },
      no: { cash: 0, debt: 0, stress: 10, literacy: -10, feedback: "Tanpa evaluasi, kesalahan finansial yang sama akan terus berulang di bulan berikutnya." }
    }
  ]
};

export const getRandomScenarios = (moduleId: "pinjol" | "judol" | "budget", count = 5): ScenarioCard[] => {
  const pool = [...(ALL_SCENARIOS[moduleId] || ALL_SCENARIOS.pinjol)];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count);
};
