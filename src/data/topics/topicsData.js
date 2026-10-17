/**
 * Data 5 Topik Pembelajaran Finansial Komprehensif - KitaInvest
 * Agent 3: Learning, Quiz & Gamification
 * Domain: /src/data/topics/
 *
 * Mematuhi RULES.md & Panduan Master Agent:
 * 1. Pengantar & Konsep Dasar (minimal 3-4 paragraf terstruktur per topik)
 * 2. Kamus Istilah Penting (Glossary Cards)
 * 3. Simulasi Tabel / Bedah Angka Nyata (format Rupiah 'Rp' dan pemisah titik ribuan)
 * 4. Video YouTube Edukasi Bahasa Indonesia (autoplay=0) & Transkrip Inti
 * 5. Intisari Pembelajaran (Key Takeaways)
 * 6. Kuis Interaktif Pilihan Ganda dengan Pembahasan Jawaban
 */

export const TOPICS = [
  {
    id: 1,
    slug: 'pengelolaan-uang',
    title: 'Pengelolaan Uang dan Aliran Kas',
    icon: '💰',
    duration: '6 Menit',
    summary: 'Memahami dasar arus kas masuk dan keluar, membedakan kebutuhan pokok vs keinginan, serta memahami perbedaan mendasar antara menabung dan berinvestasi tanpa formula persentase kaku.',
    perspectives: {
      pelajar: 'Sebagai pelajar/mahasiswa dengan uang saku Rp1.000.000/bulan, fokus utama adalah menyisihkan uang saku di awal bulan (misal Rp150.000) sebelum dipakai jajan, bukan menunggu sisa di akhir bulan.',
      pekerja: 'Sebagai pekerja dengan gaji bulanan Rp6.000.000/bulan, arus kas diprioritaskan untuk kebutuhan pokok dan dana darurat terlebih dahulu sebelum dialokasikan ke instrumen investasi pertumbuhan.',
      pensiunan: 'Sebagai pensiunan dengan dana simpanan, pengelolaan uang menitikberatkan pada menjaga likuiditas pengeluaran rutin bulanan agar modal pokok tidak terkuras oleh kebutuhan mendadak.',
      Pelajar: 'Sebagai pelajar/mahasiswa dengan uang saku Rp1.000.000/bulan, fokus utama adalah menyisihkan uang saku di awal bulan (misal Rp150.000) sebelum dipakai jajan, bukan menunggu sisa di akhir bulan.',
      Pekerja: 'Sebagai pekerja dengan gaji bulanan Rp6.000.000/bulan, arus kas diprioritaskan untuk kebutuhan pokok dan dana darurat terlebih dahulu sebelum dialokasikan ke instrumen investasi pertumbuhan.',
      Pensiunan: 'Sebagai pensiunan dengan dana simpanan, pengelolaan uang menitikberatkan pada menjaga likuiditas pengeluaran rutin bulanan agar modal pokok tidak terkuras oleh kebutuhan mendadak.',
    },
    introduction: [
      'Pengelolaan uang adalah keterampilan bertahan hidup paling mendasar sebelum melangkah ke dunia investasi. Banyak orang beranggapan bahwa kunci kekayaan adalah memiliki penghasilan yang sangat besar. Namun kenyataannya, tanpa kesadaran mengendalikan arus kas keluar (pengeluaran), sebesar apa pun uang yang masuk akan selalu habis tanpa meninggalkan aset produktif yang bernilai.',
      'Langkah awal yang paling menentukan adalah mengenali perbedaan hakiki antara Kebutuhan (Needs) dan Keinginan (Wants). Kebutuhan adalah hal-hal vital yang jika tidak dipenuhi akan mengganggu kelangsungan hidup atau produktivitas, seperti makan sehari-hari, sewa hunian, tagihan listrik, serta transportasi kerja. Sebaliknya, keinginan adalah pemuas gaya hidup yang dapat ditunda, dikurangi, atau dinegosiasikan saat kondisi keuangan sedang menuntut pengetatan anggaran.',
      'KitaInvest secara tegas tidak memaksakan formula persentase wajib yang kaku (seperti aturan baku 50/30/20) kepada semua pengguna. Setiap orang berada pada kondisi awal, tanggungan keluarga, dan kemampuan finansial yang berbeda-beda. Bagi seseorang di kota metropolitan dengan biaya hidup tinggi, menyisihkan 10% pendapatan sudah merupakan pencapaian luar biasa. Inti dari pengelolaan uang adalah membangun kebiasaan menyisihkan uang di awal bulan (pay yourself first) secara konsisten dan realistis.',
      'Sebelum mulai menaruh uang ke instrumen investasi yang berfluktuasi, pondasi pertama yang wajib dimiliki setiap orang adalah Dana Darurat (Emergency Fund). Memiliki tabungan kas setara 3 hingga 6 bulan pengeluaran rutin memberikan ketenangan batin dan melindungi kita dari keharusan berutang ketika menghadapi keadaan darurat seperti sakit, musibah, atau perbaikan kendaraan mendadak.',
    ],
    glossary: [
      {
        term: 'Arus Kas (Cash Flow)',
        icon: '🌊',
        definition: 'Pola pergerakan uang masuk (pemasukan/penghasilan) dan uang keluar (belanja/pengeluaran) dalam rentang waktu tertentu, umumnya dievaluasi setiap satu bulan.',
      },
      {
        term: 'Dana Darurat (Emergency Fund)',
        icon: '🛡️',
        definition: 'Cadangan dana tunai yang sangat likuid dan aman, khusus disiapkan untuk membiayai keadaan tak terduga tanpa harus mengganggu investasi atau berutang.',
      },
      {
        term: 'Likuiditas (Liquidity)',
        icon: '💧',
        definition: 'Tingkat kemudahan dan kecepatan suatu aset keuangan untuk dicairkan menjadi uang tunai seketika tanpa mengalami potongan nilai yang berarti.',
      },
      {
        term: 'Prinsip Pay Yourself First',
        icon: '⭐',
        definition: 'Kebiasaan langsung menyisihkan sejumlah uang tabungan atau investasi di awal begitu pemasukan diterima, bukan menunggu sisa uang di akhir bulan.',
      },
    ],
    simulationCase: {
      title: 'Bedah Arus Kas Nyata & Perbandingan Menabung vs Berinvestasi',
      subtitle: 'Contoh simulasi alokasi pendapatan bulanan Rp3.000.000 dan perbedaan mendasar penempatan dana.',
      cashflowSummary: [
        { label: 'Pemasukan Bulanan Bersih', amount: 'Rp3.000.000', percent: '100%', note: 'Gaji, honor, atau uang saku bulanan' },
        { label: 'Kebutuhan Pokok (Makan, Kos/Hunian, Transport, Tagihan)', amount: 'Rp1.800.000', percent: '60%', note: 'Prioritas utama yang wajib dipenuhi' },
        { label: 'Tabungan & Dana Darurat (Disisihkan di Awal)', amount: 'Rp600.000', percent: '20%', note: 'Dialokasikan ke rekening terpisah' },
        { label: 'Keinginan & Rekreasi Bebas Bersalah', amount: 'Rp600.000', percent: '20%', note: 'Untuk hiburan dan menjaga motivasi' },
      ],
      table: {
        caption: 'Tabel Perbandingan Mendalam: Menabung di Rekening Bank vs Berinvestasi pada Aset Bertumbuh',
        headers: ['Aspek Evaluasi', 'Menabung di Rekening Bank', 'Berinvestasi pada Aset Bertumbuh'],
        rows: [
          ['Tujuan Finansial', 'Keamanan modal pokok & likuiditas harian', 'Menumbuhkan nilai modal & mengalahkan inflasi'],
          ['Tingkat Risiko', 'Sangat Rendah (dijamin lembaga penjamin)', 'Bervariasi (Rendah hingga Tinggi, ada fluktuasi nilai)'],
          ['Potensi Imbal Hasil', 'Kecil (umumnya 0% s.d. 2% per tahun)', 'Potensi lebih tinggi (misal 6% s.d. 12%+ per tahun)'],
          ['Daya Tahan Inflasi', 'Rentan tergerus inflasi tahunan', 'Berpotensi mempertahankan daya beli riil modal'],
          ['Kemudahan Pencairan', 'Seketika (ATM, QRIS, transfer 24 jam)', 'Butuh waktu pencairan (umumnya 1 s.d. 3 hari kerja bursa)'],
          ['Waktu Penempatan Ideal', 'Jangka sangat pendek (< 1 tahun) & Dana Darurat', 'Jangka menengah hingga panjang (> 3 sampai 5+ tahun)'],
        ],
      },
      takeaway: 'Kesimpulan Penting: Menabung dan berinvestasi bukanlah pilihan yang saling meniadakan, melainkan dua pilar yang saling melengkapi. Menabung melindungi kebutuhan jangka pendek Anda, sedangkan investasi mengamankan daya beli masa depan Anda.',
    },
    sections: [
      {
        heading: 'Pemasukan, Kebutuhan Pokok, dan Tabungan',
        content: 'Mengelola keuangan dimulai dari menyadari arus kas masuk dan keluar. Kebutuhan dasar hidup harus selalu didahulukan daripada keinginan sesaat. Yang terpenting bukanlah mematok persentase wajib yang kaku (seperti aturan 50/30/20), melainkan membangun kebiasaan menyisihkan uang secara sadar dan realistis sesuai kapasitas keuangan masing-masing.',
        keyPoints: [
          'Kebutuhan pokok adalah prioritas utama sebelum keinginan konsumtif.',
          'Tidak ada formula persentase tunggal yang wajib untuk semua orang.',
          'Kebiasaan menyisihkan dana di awal bulan jauh lebih efektif daripada menunggu sisa di akhir bulan.',
        ],
      },
      {
        heading: 'Menabung vs Berinvestasi',
        content: 'Menabung berfokus pada keamanan dan likuiditas (mudah diambil sewaktu-waktu untuk kebutuhan mendesak), namun nilainya rentan tergerus inflasi jangka panjang. Sementara itu, berinvestasi bertujuan menumbuhkan nilai aset dari waktu ke waktu dengan menerima konsekuensi fluktuasi jangka pendek.',
        keyPoints: [
          'Menabung cocok untuk dana darurat dan tujuan jangka sangat pendek.',
          'Investasi bertujuan menumbuhkan daya beli modal untuk jangka waktu lebih panjang.',
          'Keduanya saling melengkapi, bukan saling menggantikan.',
        ],
      },
    ],
    video: {
      videoId: 'q59ekdLC7u8',
      videoTitle: '7 Cara Mengatur Uang & Mengelola Keuangan Sejak Dini',
      duration: '12 Menit',
      summary: 'Video edukasi ini menjelaskan langkah-langkah praktis dan aplikatif bagi pemula untuk mengendalikan arus kas harian, mengenali kebocoran keuangan kecil (latte factor), dan menabung tanpa merasa tersiksa.',
      transcriptPoints: [
        'Kunci kebebasan finansial bukan seberapa besar gaji Anda hari ini, melainkan seberapa disiplin Anda menahan pengeluaran yang tidak perlu.',
        'Waspadai "latte factor"—pengeluaran kecil bernilai puluhan ribu rupiah setiap hari (kopi kekinian, biaya admin, cemilan impulsif) yang jika diakumulasi mencapai jutaan rupiah per bulan.',
        'Gunakan metode pemisahan rekening bank: rekening penerima gaji, rekening belanja operasional harian, dan rekening simpanan tabungan yang tidak dipasangi kartu debit.',
        'Batasi gaya hidup konsumtif maksimal 20% sampai 30% dari penghasilan dan tolak tegas godaan berutang pinjol atau paylater untuk barang konsumtif.',
      ],
    },
    keyTakeaways: [
      'Sisihkan dana tabungan di awal bulan begitu pemasukan masuk (pay yourself first), jangan menunggu sisa uang di akhir bulan.',
      'Dahulukan kebutuhan pokok dan dana darurat terlebih dahulu sebelum mengalokasikan uang ke instrumen investasi.',
      'Menabung untuk menjaga likuiditas dan keamanan modal darurat, berinvestasi untuk melawan inflasi jangka panjang.',
      'Tidak ada formula persentase tunggal yang sakral; kunci keberhasilan finansial adalah konsistensi dan kesadaran arus kas.',
    ],
    quiz: [
      {
        id: 'q1-1',
        question: 'Mengapa KitaInvest tidak mematok aturan persentase tabungan yang kaku (misalnya wajib 20%)?',
        options: [
          'Karena persentase tabungan wajib ditetapkan oleh pemerintah.',
          'Karena kondisi finansial dan kapasitas setiap orang berbeda; yang utama adalah konsistensi dan kesadaran mengelola arus kas.',
          'Karena menabung tidak lagi penting di era modern.',
          'Karena seluruh penghasilan seharusnya langsung diinvestasikan tanpa disisihkan.',
        ],
        correctIndex: 1,
        explanation: 'Kondisi finansial tiap individu sangat unik. Memaksakan persentase kaku seringkali tidak realistis; prinsip intinya adalah mendahulukan kebutuhan pokok dan konsisten menyisihkan dana sesuai kemampuan.',
      },
      {
        id: 'q1-2',
        question: 'Apa perbedaan mendasar antara menabung konvensional dan berinvestasi?',
        options: [
          'Menabung selalu menghasilkan keuntungan besar, sedangkan investasi tidak ada gunanya.',
          'Menabung mengutamakan likuiditas dan keamanan jangka pendek, sedangkan investasi bertujuan menumbuhkan nilai aset dengan menghadapi fluktuasi.',
          'Menabung hanya untuk lansia, sedangkan investasi hanya untuk mahasiswa.',
          'Tidak ada perbedaan sama sekali antara menabung dan berinvestasi.',
        ],
        correctIndex: 1,
        explanation: 'Menabung ditujukan untuk keamanan modal dan kemudahan akses dana tunai (likuiditas), sementara investasi bertujuan mengembangkan aset untuk jangka panjang dengan toleransi terhadap pergerakan nilai.',
      },
    ],
  },
  {
    id: 2,
    slug: 'tujuan-keuangan',
    title: 'Tujuan Keuangan dan Jangka Waktu',
    icon: '🎯',
    duration: '6 Menit',
    summary: 'Merumuskan target dana yang jelas, menghitung kesiapan modal awal, serta merencanakan setoran rutin bulanan yang selaras dengan horizon waktu.',
    perspectives: {
      pelajar: 'Bagi pelajar/mahasiswa, contoh tujuan nyata adalah menyiapkan dana pembelian laptop kuliah seharga Rp12.000.000 dalam jangka waktu 12 sampai 24 bulan ke depan.',
      pekerja: 'Bagi pekerja muda, contoh tujuan nyata adalah mengumpulkan dana darurat 6 bulan pengeluaran (misal Rp24.000.000) atau persiapan uang muka rumah pertama.',
      pensiunan: 'Bagi pensiunan, perencanaan berfokus pada alokasi biaya kesehatan dan pemeliharaan gaya hidup tenang dalam horizon waktu jangka menengah.',
      Pelajar: 'Bagi pelajar/mahasiswa, contoh tujuan nyata adalah menyiapkan dana pembelian laptop kuliah seharga Rp12.000.000 dalam jangka waktu 12 sampai 24 bulan ke depan.',
      Pekerja: 'Bagi pekerja muda, contoh tujuan nyata adalah mengumpulkan dana darurat 6 bulan pengeluaran (misal Rp24.000.000) atau persiapan uang muka rumah pertama.',
      Pensiunan: 'Bagi pensiunan, perencanaan berfokus pada alokasi biaya kesehatan dan pemeliharaan gaya hidup tenang dalam horizon waktu jangka menengah.',
    },
    introduction: [
      'Menabung atau berinvestasi tanpa sasaran target yang jelas ibarat menaiki kendaraan tanpa mengetahui kota tujuan. Tanpa target dana yang terukur, kita mudah tergoda untuk menggunakan uang yang sudah terkumpul demi memuaskan keinginan konsumtif sesaat.',
      'Perencanaan keuangan modern berpegang pada prinsip SMART (Specific, Measurable, Achievable, Relevant, Time-bound). Sasaran Anda harus memiliki nama yang jelas (misal: "Dana Laptop Kerja"), nominal rupiah yang terukur (misal: "Rp12.000.000"), dan batas waktu penyelesaian yang tegas (misal: "24 bulan ke depan").',
      'Tiga pilar matematis yang saling mengunci dalam setiap simulasi rencana dana adalah: Target Dana (berapa rupiah yang dibutuhkan), Dana Awal (modal yang telah dimiliki di Bulan 0), dan Jangka Waktu (berapa bulan periode pengumpulan). Jika salah satu variabel berubah, maka nilai setoran bulanan yang dibutuhkan otomatis ikut berubah.',
      'Horizon waktu juga menentukan instrumen keuangan mana yang paling pantas dipilih. Sasaran jangka sangat pendek membutuhkan instrumen yang aman dari fluktuasi nilai, sedangkan sasaran jangka panjang memberi ruang bagi kita untuk memanfaatkan potensi instrumen dengan pertumbuhan lebih tinggi.',
    ],
    glossary: [
      {
        term: 'Target Dana (Financial Goal)',
        icon: '🏆',
        definition: 'Jumlah nominal dana pasti dalam Rupiah yang ingin dicapai pada akhir periode waktu perencanaan untuk kebutuhan tertentu.',
      },
      {
        term: 'Dana Awal (Starting Capital)',
        icon: '💼',
        definition: 'Sejumlah modal permulaan yang sudah dimiliki saat ini (di Bulan 0) dan siap dialokasikan khusus untuk mempercepat tercapainya rencana dana.',
      },
      {
        term: 'Setoran Bulanan (Monthly Contribution)',
        icon: '📅',
        definition: 'Komitmen nominal uang yang ditambahkan secara disiplin pada setiap akhir bulan ke dalam pos rencana keuangan Anda.',
      },
      {
        term: 'Horizon Waktu (Time Horizon)',
        icon: '⏳',
        definition: 'Rentang waktu (dalam bulan atau tahun) dari hari ini hingga saat dana tersebut benar-benar akan ditarik dan dibelanjakan.',
      },
    ],
    simulationCase: {
      title: 'Simulasi Perbandingan Target: Membeli Laptop Spesifikasi Kerja Rp12.000.000',
      subtitle: 'Analisis pengaruh durasi waktu dan setoran bulanan terhadap tercapainya target dana.',
      table: {
        caption: 'Tabel Perbandingan Skenario Waktu untuk Target Dana Rp12.000.000 (Modal Awal Rp0)',
        headers: ['Skenario Rencana', 'Jangka Waktu', 'Setoran Bulanan Diperlukan', 'Beban Finansial Bulanan', 'Keunggulan Skenario'],
        rows: [
          ['Skenario Agresif (1 Tahun)', '12 Bulan', 'Rp1.000.000 / bulan', 'Tinggi (membutuhkan komitmen ketat)', 'Laptop terbeli cepat dalam 1 tahun'],
          ['Skenario Moderat (2 Tahun)', '24 Bulan', 'Rp500.000 / bulan', 'Sedang (sangat realistis bagi mahasiswa/pekerja)', 'Arus kas bulanan tetap longgar & aman'],
          ['Skenario Santai (3 Tahun)', '36 Bulan', 'Rp333.333 / bulan', 'Rendah (sangat ringan disisihkan)', 'Tidak mengorbankan pos kebutuhan pokok'],
          ['Dengan Modal Awal Rp3.000.000', '18 Bulan', 'Rp500.000 / bulan', 'Sedang (terbantu modal awal di awal)', 'Waktu pengumpulan terpangkas 6 bulan'],
        ],
      },
      takeaway: 'Wawasan Finansial: Jika setoran bulanan Anda terbatas, jangan batalkan rencana! Anda cukup memperpanjang horizon waktu agar nominal setoran bulanan menjadi lebih terjangkau dan realistis.',
    },
    sections: [
      {
        heading: 'Pilar Perencanaan Rencana Dana',
        content: 'Rencana keuangan tanpa sasaran angka yang jelas ibarat berlayar tanpa kompas. Tiga variabel krusial dalam perencanaan adalah: Target Dana (berapa rupiah yang dibutuhkan), Dana Awal (modal permulaan yang siap dialokasikan), dan Jangka Waktu (berapa bulan/tahun waktu yang dimiliki).',
        keyPoints: [
          'Target dana harus terukur secara spesifik (misal Rp15.000.000 untuk laptop).',
          'Dana awal memberikan lompatan awal percepatan akumulasi.',
          'Jangka waktu menentukan seberapa besar setoran bulanan yang dibutuhkan.',
        ],
      },
      {
        heading: 'Peran Setoran Rutin Bulanan',
        content: 'Setoran rutin yang disiplin setiap akhir bulan seringkali menjadi pendorong terbesar keberhasilan mencapai target finansial, terutama bagi pemula yang belum memiliki modal awal dalam jumlah besar.',
        keyPoints: [
          'Konsistensi setoran bulanan mengalahkan jumlah awal yang besar namun tidak pernah ditambah.',
          'Waktu penyetoran (misal akhir bulan) mempengaruhi waktu berjalannya perhitungan pertumbuhan modal.',
        ],
      },
    ],
    video: {
      videoId: 'CQa_-zbJ9Sg',
      videoTitle: 'Strategi Menyusun Target Dana & Mengumpulkan Dana Darurat Secara Bertahap',
      duration: '10 Menit',
      summary: 'Video ini membahas cara memetakan target keuangan berdasarkan prioritas hidup, menentukan jangka waktu yang masuk akal, dan strategi mengumpulkan modal secara konsisten.',
      transcriptPoints: [
        'Jangan mengejar terlalu banyak target finansial dalam satu waktu sekaligus; pilih 1 sampai 2 sasaran prioritas tertinggi terlebih dahulu.',
        'Bagi target menjadi jangka pendek (< 1 tahun), menengah (1-5 tahun), dan panjang (> 5 tahun) untuk menentukan produk penempatan yang tepat.',
        'Gunakan fitur transfer otomatis atau autodebet terjadwal tepat setelah tanggal pemasukan agar proses menabung berjalan konsisten.',
        'Lakukan evaluasi berkala setiap 6 bulan untuk menaikkan nominal setoran seiring peningkatan penghasilan atau uang saku.',
      ],
    },
    keyTakeaways: [
      'Target finansial wajib spesifik nominalnya (dalam Rupiah) dan jelas batas tanggal pencapaiannya.',
      'Memperpanjang jangka waktu (horizon) menurunkan nominal setoran bulanan yang wajib disisihkan setiap bulannya.',
      'Modal awal di Bulan 0 memberikan percepatan signifikan dan memangkas waktu pencapaian target dana.',
      'Sesuaikan instrumen penyimpanan dengan batas waktu: jangan menempatkan dana kebutuhan jangka pendek pada instrumen berisiko tinggi.',
    ],
    quiz: [
      {
        id: 'q2-1',
        question: 'Tiga komponen utama yang wajib ditentukan saat menyusun rencana dana adalah:',
        options: [
          'Merk ponsel, rekening bank, dan tanggal lahir.',
          'Target Dana, Dana Awal, dan Jangka Waktu (periode bulan).',
          'Nama teman, pinjaman online, dan kartu kredit.',
          'Nilai inflasi masa lalu tanpa target nominal akhir.',
        ],
        correctIndex: 1,
        explanation: 'Target Dana, Dana Awal, dan Jangka Waktu adalah tiga parameter pokok yang menjadi pondasi perhitungan simulasi finansial.',
      },
      {
        id: 'q2-2',
        question: 'Jika seseorang belum memiliki dana awal yang besar, apa strategi terbaik untuk mencapai target dana?',
        options: [
          'Meminjam uang dengan bunga tinggi agar modal langsung terlihat banyak.',
          'Membatalkan seluruh rencana keuangan selamanya.',
          'Menentukan setoran rutin bulanan yang realistis dan konsisten setiap akhir bulan.',
          'Menunggu mendapat hadiah undian tanpa melakukan apapun.',
        ],
        correctIndex: 2,
        explanation: 'Setoran rutin bulanan yang berkesinambungan adalah cara teruji dan aman untuk mengumpulkan modal secara bertahap menuju target yang diharapkan.',
      },
    ],
  },
  {
    id: 3,
    slug: 'manajemen-risiko',
    title: 'Memahami Risiko dan Fluktuasi Nilai',
    icon: '🛡️',
    duration: '6 Menit',
    summary: 'Menyadari bahwa nilai investasi dapat berfluktuasi naik maupun turun di bawah modal awal, serta memahami mengapa angka asumsi bukanlah jaminan keuntungan pasti.',
    perspectives: {
      pelajar: 'Sebagai pelajar, penting membentengi diri dari tawaran investasi ilegal atau skema cepat kaya di media sosial yang menjanjikan keuntungan pasti tanpa risiko.',
      pekerja: 'Sebagai pekerja, penting menyesuaikan alokasi portofolio dengan profil risiko agar tidak panik menjual rugi saat pasar modal mengalami koreksi berkala.',
      pensiunan: 'Sebagai pensiunan, perlindungan modal pokok adalah prioritas tertinggi dengan membatasi penempatan dana pada instrumen yang memiliki volatilitas tinggi.',
      Pelajar: 'Sebagai pelajar, penting membentengi diri dari tawaran investasi ilegal atau skema cepat kaya di media sosial yang menjanjikan keuntungan pasti tanpa risiko.',
      Pekerja: 'Sebagai pekerja, penting menyesuaikan alokasi portofolio dengan profil risiko agar tidak panik menjual rugi saat pasar modal mengalami koreksi berkala.',
      Pensiunan: 'Sebagai pensiunan, perlindungan modal pokok adalah prioritas tertinggi dengan membatasi penempatan dana pada instrumen yang memiliki volatilitas tinggi.',
    },
    introduction: [
      'Dalam dunia finansial berlaku hukum universal yang tidak dapat dihindari: Risk and Return Go Hand in Hand (Potensi hasil berbanding lurus dengan risiko). Semakin tinggi potensi imbal hasil yang dijanjikan suatu instrumen, semakin besar pula kemungkinan terjadinya penurunan nilai atau bahkan risiko kehilangan modal.',
      'Pertumbuhan nilai investasi di dunia nyata tidak pernah membentuk garis lurus yang terus-menerus naik secara mulus dari waktu ke waktu. Pasar keuangan bergerak dinamis mengikuti kondisi ekonomi makro, laporan kinerja industri, dan sentimen pasar global. Hal ini menyebabkan saldo aset kita bisa mengalami periode fluktuasi turun sementara (koreksi pasar).',
      'Ketika Anda melihat simulasi dengan asumsi return tahunan (misal 10% atau 12%/tahun), angka tersebut adalah rata-rata pemodelan matematis jangka panjang untuk keperluan proyeksi edukasi. Angka asumsi BUKANLAH garansi atau janji keuntungan pasti dari bank. Di dunia nyata, Anda bisa mendapatkan hasil +20% di tahun pertama, namun mengalami -5% di tahun kedua.',
      'Mengenali Profil Risiko diri sendiri adalah tameng terbaik dari kepanikan psikologis. Ketika kita memahami batasan toleransi risiko pribadi dan menerapkan diversifikasi (menyebar modal ke beberapa jenis aset), kita tidak akan panik menjual rugi ketika pasar mengalami masa koreksi sesaat.',
    ],
    glossary: [
      {
        term: 'Risiko Finansial (Financial Risk)',
        icon: '⚠️',
        definition: 'Kemungkinan terjadinya hasil riil investasi yang lebih rendah dari ekspektasi, termasuk potensi penurunan nilai saldo di bawah modal awal yang disetorkan.',
      },
      {
        term: 'Volatilitas (Volatility)',
        icon: '📈',
        definition: 'Derajat fluktuasi atau seberapa cepat dan tajam harga/nilai suatu aset bergerak naik dan turun dalam rentang waktu tertentu.',
      },
      {
        term: 'Profil Risiko (Risk Profile)',
        icon: '🧭',
        definition: 'Tingkat kesiapan mental dan kapasitas finansial seseorang dalam menghadapi potensi risiko penurunan saldo investasi.',
      },
      {
        term: 'Diversifikasi (Diversification)',
        icon: '🧺',
        definition: 'Strategi membagi modal ke beberapa kelas aset berbeda agar penurunan pada satu aset dapat diredam oleh kestabilan aset lainnya ("jangan taruh semua telur dalam satu keranjang").',
      },
    ],
    simulationCase: {
      title: 'Bedah Kasus: Fluktuasi Pasar Modal pada Modal Rp10.000.000',
      subtitle: 'Memahami bagaimana nilai investasi dapat turun sementara dan mengapa asumsi return bukan jaminan pasti.',
      table: {
        caption: 'Tabel Perjalanan Fluktuasi Portofolio Finansial Nyata vs Asumsi Rata-rata Garis Lurus',
        headers: ['Periode Waktu', 'Peristiwa Pasar Ekonomi', 'Nilai Portofolio Riil', 'Perubahan Nilai', 'Sikap Investor Bijak'],
        rows: [
          ['Bulan 0', 'Penyetoran Modal Awal', 'Rp10.000.000', '0% (Modal Awal)', 'Menetapkan horizon waktu minimal 3-5 tahun'],
          ['Bulan 6', 'Pasar Normal & Menguat', 'Rp10.700.000', '+Rp700.000 (+7,0%)', 'Tetap disiplin, tidak overconfidence'],
          ['Bulan 12', 'Koreksi Pasar Global', 'Rp8.800.000', '-Rp1.900.000 (-17,7%)', 'TETAP TENANG. Saldo di bawah modal awal adalah fluktuasi wajar yang belum terealisasi selama tidak dijual panik'],
          ['Bulan 18', 'Fase Rebound / Pemulihan', 'Rp10.200.000', '+Rp1.400.000 (+15,9%)', 'Nilai portofolio kembali melampaui modal pokok'],
          ['Bulan 24', 'Pertumbuhan Berlanjut', 'Rp11.800.000', '+Rp1.600.000 (+15,6%)', 'Rata-rata pertumbuhan mencapai ~8,6% per tahun'],
        ],
      },
      takeaway: 'Pelajaran Emas: Investor yang panik di Bulan ke-12 dan menjual portofolionya akan mengunci kerugian riil sebesar Rp1.200.000. Sebaliknya, investor yang memahami horizon waktu dan risiko tetap bertahan hingga pasar pulih.',
    },
    sections: [
      {
        heading: 'Hakikat Risiko: Tidak Ada Pertumbuhan Tanpa Fluktuasi',
        content: 'Setiap instrumen investasi memiliki potensi risiko. Nilai investasi dapat bergerak naik maupun turun sewaktu-waktu. Asumsi tingkat pertumbuhan tahunan (misal 10% atau 12%) dalam simulasi adalah rata-rata proyeksi matematis, bukan jaminan angka pasti di dunia nyata.',
        keyPoints: [
          'Hasil investasi nyata tidak pernah membentuk garis lurus yang mulus.',
          'Nilai saldo investasi dapat mengalami penurunan sementara (koreksi nilai).',
          'Waspadai tawaran yang menjanjikan "keuntungan tinggi tanpa risiko" karena hal tersebut tidak logis secara finansial.',
        ],
      },
      {
        heading: 'Prinsip Diversifikasi dan Toleransi Risiko',
        content: 'Diversifikasi adalah strategi menyebarkan dana ke berbagai instrumen agar risiko kerugian pada satu aset dapat diredam oleh aset lainnya. Mengenali profil risiko diri sendiri membantu kita tetap tenang dan tidak panik menjual saat terjadi penurunan pasar.',
        keyPoints: [
          'Jangan menaruh seluruh dana dalam satu keranjang aset saja.',
          'Jangka waktu investasi yang lebih panjang umumnya membantu meredam volatilitas jangka pendek.',
        ],
      },
    ],
    video: {
      videoId: 'Cgib1vmWEC8',
      videoTitle: 'Manajemen Keuangan: Konsep Dasar Hasil (Return) dan Risiko Investasi',
      duration: '9 Menit',
      summary: 'Video ini mengupas tuntas prinsip dasar hubungan timbal balik antara imbal hasil (return) dan risiko, mengenali profil risiko pribadi, dan pentingnya berinvestasi menggunakan dana dingin.',
      transcriptPoints: [
        'Tidak ada instrumen investasi legal di dunia yang mampu memberikan imbal hasil tinggi tanpa membawa risiko fluktuasi modal.',
        'Waspadai tawaran investasi bodong dengan ciri-ciri: menjanjikan profit tetap bulanan yang tidak masuk akal, mengklaim bebas risiko 100%, dan mewajibkan merekrut anggota baru.',
        'Gunakan selalu "uang dingin"—yaitu uang yang tidak akan digunakan untuk kebutuhan hidup, cicilan pokok, atau dana darurat dalam jangka 3 sampai 5 tahun ke depan.',
        'Pahami bahwa penurunan nilai aset sementara (paper loss) baru menjadi kerugian nyata apabila Anda panik dan menjual aset tersebut saat harga sedang jatuh.',
      ],
    },
    keyTakeaways: [
      'Semua investasi membawa risiko; hasil nyata tidak pernah membentuk garis lurus yang mulus.',
      'Angka asumsi return pada simulasi adalah proyeksi rata-rata pemodelan matematis, bukan jaminan pasti.',
      'Jangan pernah berinvestasi menggunakan dana darurat atau dana kebutuhan pokok sehari-hari (selalu gunakan uang dingin).',
      'Diversifikasi dan jangka waktu yang panjang adalah strategi terbaik untuk meredam risiko fluktuasi jangka pendek.',
    ],
    quiz: [
      {
        id: 'q3-1',
        question: 'Manakah pernyataan yang BENAR mengenai asumsi pertumbuhan (misal 12%/tahun) dalam simulasi investasi?',
        options: [
          'Angka 12% adalah garansi pasti dari bank atau manajer investasi setiap bulannya.',
          'Angka tersebut adalah asumsi pemodelan matematis; pada kenyataannya hasil investasi berfluktuasi dan dapat turun.',
          'Investasi pasti selalu naik dan tidak pernah mengalami penurunan.',
          'Jika bulan depan turun, berarti sistem simulasi matematika salah hitung.',
        ],
        correctIndex: 1,
        explanation: 'Asumsi tingkat pertumbuhan merupakan rata-rata proyeksi matematis. Di dunia nyata, pasar keuangan bergerak dinamis dan nilai aset bisa berfluktuasi naik maupun turun.',
      },
      {
        id: 'q3-2',
        question: 'Bagaimana sikap bijak seorang investor ketika nilai investasinya mengalami penurunan jangka pendek?',
        options: [
          'Panik dan langsung meminjam uang untuk menutupi penurunan.',
          'Memahami bahwa fluktuasi adalah bagian dari risiko investasi dan mengevaluasi kembali tujuan jangka panjang serta profil risikonya.',
          'Menyalahkan orang lain dan berhenti mengelola keuangan sama sekali.',
          'Mengabaikan kebutuhan pokok demi menambah spekulasi berisiko tinggi.',
        ],
        correctIndex: 1,
        explanation: 'Investor yang teredukasi memahami bahwa penurunan nilai jangka pendek adalah konsekuensi wajar dari instrumen pertumbuhan, sehingga tetap berpegang pada rencana jangka panjang.',
      },
    ],
  },
  {
    id: 4,
    slug: 'bunga-majemuk',
    title: 'Setoran Berkala dan Pertumbuhan Majemuk',
    icon: '🌱',
    duration: '7 Menit',
    summary: 'Mempelajari cara kerja bunga majemuk (compounding effect) di mana bunga bulan berjalan dihitung dari akumulasi saldo total terbaru, menciptakan efek bola salju eksponensial.',
    perspectives: {
      pelajar: 'Bagi pelajar/mahasiswa, waktu adalah keunggulan terbesar. Memulai dari Rp100.000/bulan sejak usia muda memberikan ruang puluhan tahun bagi efek majemuk untuk bekerja melipatgandakan dana.',
      pekerja: 'Bagi pekerja, menyisihkan sebagian gaji bulanan secara konsisten setiap tanggal gajian menciptakan efek bola salju modal yang mempercepat pencapaian target dana pensiun.',
      pensiunan: 'Bagi pensiunan, memahami pertumbuhan majemuk membantu menjaga daya tahan sisa dana pokok agar tidak menyusut terlalu cepat akibat penarikan rutin.',
      Pelajar: 'Bagi pelajar/mahasiswa, waktu adalah keunggulan terbesar. Memulai dari Rp100.000/bulan sejak usia muda memberikan ruang puluhan tahun bagi efek majemuk untuk bekerja melipatgandakan dana.',
      Pekerja: 'Bagi pekerja, menyisihkan sebagian gaji bulanan secara konsisten setiap tanggal gajian menciptakan efek bola salju modal yang mempercepat pencapaian target dana pensiun.',
      Pensiunan: 'Bagi pensiunan, memahami pertumbuhan majemuk membantu menjaga daya tahan sisa dana pokok agar tidak menyusut terlalu cepat akibat penarikan rutin.',
    },
    introduction: [
      'Bunga majemuk (compound interest) sering disebut sebagai salah satu konsep paling kuat dalam dunia keuangan. Berbeda dengan bunga sederhana (simple interest) yang hanya menghitung imbal hasil dari modal pokok awal saja, bunga majemuk menghitung keuntungan di atas total saldo berjalan (modal pokok ditambah seluruh akumulasi imbal hasil dari periode-periode sebelumnya).',
      'Fenomena ini melahirkan apa yang dikenal sebagai "Efek Bola Salju" (Snowball Effect). Saat bola salju kecil digelindingkan dari puncak bukit es, putaran awalnya hanya menambah sedikit salju. Namun semakin jauh menggelinding, bola tersebut menjadi semakin besar dan mampu menarik volume salju yang berlipat ganda dalam setiap putarannya.',
      'Dalam standar perhitungan KitaInvest, setoran rutin bulanan masuk di akhir bulan. Ini berarti setoran bulan berjalan belum langsung memperoleh bunga di bulan yang sama, melainkan baru akan ikut diperhitungkan menghasilkan imbal hasil pada bulan-bulan berikutnya.',
      'Waktu adalah bahan bakar utama pertumbuhan majemuk. Seseorang yang mulai berinvestasi lebih awal dengan nominal kecil seringkali memperoleh hasil akhir yang jauh lebih besar dibandingkan orang yang menunda berinvestasi dan baru mulai dengan modal besar di usia lanjut.',
    ],
    glossary: [
      {
        term: 'Bunga Majemuk (Compound Interest)',
        icon: '🔁',
        definition: 'Bunga berbunga; mekanisme perhitungan keuntungan di mana hasil imbal hasil periode lalu diinvestasikan kembali untuk menghasilkan imbal hasil baru di periode berikutnya.',
      },
      {
        term: 'Efek Bola Salju (Snowball Effect)',
        icon: '❄️',
        definition: 'Pertumbuhan aset yang pada awalnya terlihat lambat dan datar, namun seiring bertambahnya waktu akan melesat eksponensial ke atas.',
      },
      {
        term: 'Setoran Akhir Bulan',
        icon: '⏳',
        definition: 'Prinsip akuntansi di mana setoran dana masuk di hari terakhir bulan berjalan, sehingga imbal hasil setoran tersebut baru mulai dihitung pada bulan selanjutnya.',
      },
      {
        term: 'Tingkat Bunga Bulanan (r_bulanan)',
        icon: '➗',
        definition: 'Konversi pertumbuhan tahunan ke bulanan dengan rumus eksak: r_bulanan = (1 + r_tahunan)^(1/12) - 1.',
      },
    ],
    simulationCase: {
      title: 'Simulasi Efek Bola Salju: Modal Awal Rp1.000.000 + Setoran Rp250.000/Bulan (Return 12%/Tahun)',
      subtitle: 'Memperlihatkan pergeseran dominasi antara uang setoran sendiri versus tambahan pertumbuhan majemuk.',
      table: {
        caption: 'Tabel Proyeksi Saldo dari Bulan ke Bulan Mengikuti Rumus Eksak calculator.js',
        headers: ['Waktu Berjalan', 'Total Modal Disetor Sendiri', 'Saldo Nominal Total', 'Tambahan Keuntungan Majemuk', 'Porsi Keuntungan dari Total'],
        rows: [
          ['Bulan 0', 'Rp1.000.000', 'Rp1.000.000', 'Rp0', '0,0%'],
          ['Bulan 6', 'Rp2.500.000', 'Rp2.585.420', '+Rp85.420', '3,3%'],
          ['Bulan 12 (1 Thn)', 'Rp4.000.000', 'Rp4.301.844', '+Rp301.844', '7,0%'],
          ['Bulan 24 (2 Thn)', 'Rp7.000.000', 'Rp8.140.232', '+Rp1.140.232', '14,0%'],
          ['Bulan 36 (3 Thn)', 'Rp10.000.000', 'Rp12.607.411', '+Rp2.607.411', '20,7%'],
          ['Bulan 60 (5 Thn)', 'Rp16.000.000', 'Rp24.237.112', '+Rp8.237.112', '34,0%'],
        ],
      },
      takeaway: 'Bukti Nyata: Pada Bulan ke-60 (Tahun ke-5), lebih dari 34% total kekayaan Anda (senilai Rp8.237.112) murni lahir dari kinerja bunga majemuk, bukan dari uang yang Anda keluarkan dari dompet Anda sendiri!',
    },
    sections: [
      {
        heading: 'Mekanisme Bunga Majemuk (Compounding Effect)',
        content: 'Bunga majemuk sering disebut sebagai keajaiban dunia finansial. Berbeda dengan bunga sederhana yang hanya menghitung imbal hasil dari modal pokok awal, bunga majemuk menghitung pertumbuhan di atas saldo terbaru (modal pokok + akumulasi imbal hasil sebelumnya).',
        keyPoints: [
          'Saldo_t = Saldo_{t-1} × (1 + r_{bulanan}) + Setoran_Bulanan.',
          'Semakin lama waktu berjalan, porsi pertumbuhan nilai akan melampaui total uang yang Anda setorkan sendiri.',
          'Memulai lebih awal memberikan keuntungan waktu yang tidak dapat dibeli dengan uang.',
        ],
      },
      {
        heading: 'Peran Setoran di Akhir Bulan',
        content: 'Dalam standar perhitungan akuntansi KitaInvest, setoran bulanan masuk di akhir bulan. Artinya, setoran bulan tersebut baru akan mulai menghasilkan imbal hasil pada bulan berikutnya.',
        keyPoints: [
          'Setoran akhir bulan tidak langsung memperoleh imbal hasil di bulan yang sama.',
          'Kombinasi modal awal yang bekerja sejak hari pertama dan setoran rutin menghasilkan kurva eksponensial yang kuat.',
        ],
      },
    ],
    video: {
      videoId: 'RpF13dQurZ0',
      videoTitle: 'Pentingnya Investasi Sejak Muda & Efek Compounding (Bunga Berbunga)',
      duration: '11 Menit',
      summary: 'Video edukasi ini mengilustrasikan keajaiban daya ungkit waktu dan bunga majemuk, membandingkan simulasi orang yang mulai investasi di usia 20 tahun vs usia 30 tahun.',
      transcriptPoints: [
        'Memulai investasi 10 tahun lebih cepat menghasilkan saldo akhir berkali-kali lipat lebih besar sekalipun modal yang disetor per bulan jauh lebih kecil.',
        'Bunga majemuk membutuhkan kesabaran psikologis karena kurva pertumbuhan di 2 sampai 3 tahun pertama tampak lambat dan belum terlihat spektakuler.',
        'Jangan pernah menarik imbal hasil atau dividen di awal periode; biarkan seluruh imbal hasil tergulung kembali agar efek bola salju tidak terhenti.',
        'Kunci utama adalah konsistensi setoran berkala setiap bulan tanpa tergoda menunggu waktu pasar yang sempurna (market timing).',
      ],
    },
    keyTakeaways: [
      'Bunga majemuk menghitung imbal hasil dari total saldo terbaru, bukan hanya modal pokok awal.',
      'Waktu adalah faktor paling berpengaruh: semakin panjang durasi investasi, semakin curam kurva pertumbuhan aset.',
      'Setoran akhir bulan baru mulai berkontribusi menghasilkan imbal hasil pada bulan berikutnya.',
      'Konsistensi setoran rutin bulanan mengalahkan jumlah awal yang besar namun tidak pernah ditambah lagi.',
    ],
    quiz: [
      {
        id: 'q4-1',
        question: 'Apa perbedaan utama antara bunga sederhana (simple interest) dan pertumbuhan majemuk (compound interest)?',
        options: [
          'Bunga majemuk hanya berlaku untuk pinjaman bank, bukan investasi.',
          'Bunga sederhana dihitung dari saldo terbaru, sedangkan bunga majemuk dihitung dari modal awal saja.',
          'Pada bunga majemuk, imbal hasil dihitung dari akumulasi saldo terbaru (modal + imbal hasil periode lalu), bukan hanya dari modal awal.',
          'Bunga sederhana selalu menghasilkan uang lebih banyak daripada bunga majemuk.',
        ],
        correctIndex: 2,
        explanation: 'Pertumbuhan majemuk menghitung imbal hasil dari total saldo berjalan, sehingga hasil pertumbuhan periode lalu ikut menghasilkan pertumbuhan baru di periode berikutnya.',
      },
      {
        id: 'q4-2',
        question: 'Faktor apa yang paling krusial dalam memaksimalkan efek pertumbuhan majemuk?',
        options: [
          'Sering berganti-ganti rekening setiap minggu.',
          'Horizon waktu (jangka waktu yang panjang) dan kedisiplinan setoran berkala.',
          'Menunggu hingga usia tua baru mulai merencanakan keuangan.',
          'Menghindari pencatatan keuangan sama sekali.',
        ],
        correctIndex: 1,
        explanation: 'Waktu adalah katalis utama pertumbuhan majemuk. Semakin panjang waktu bergulir, semakin besar efek pelipatgandaan saldo yang terjadi.',
      },
    ],
  },
  {
    id: 5,
    slug: 'inflasi-daya-beli',
    title: 'Inflasi dan Daya Beli Riil',
    icon: '📉',
    duration: '6 Menit',
    summary: 'Memahami bagaimana kenaikan harga barang (inflasi) menggerus daya beli uang tunai dari tahun ke tahun dan bagaimana menghitung nilai riil aset Anda.',
    perspectives: {
      pelajar: 'Sebagai pelajar, Anda merasakan bahwa uang saku Rp10.000 beberapa tahun lalu bisa membeli makan siang kenyang, namun kini hanya cukup untuk membeli sebotol minuman.',
      pekerja: 'Sebagai pekerja, penting memastikan bahwa kenaikan penghasilan dan imbal hasil investasi mampu mengalahkan laju inflasi tahunan agar kesejahteraan keluarga tidak menurun.',
      pensiunan: 'Sebagai pensiunan, inflasi adalah ancaman terbesar bagi dana simpanan tetap, terutama untuk pos pengeluaran medis dan bahan kebutuhan pokok.',
      Pelajar: 'Sebagai pelajar, Anda merasakan bahwa uang saku Rp10.000 beberapa tahun lalu bisa membeli makan siang kenyang, namun kini hanya cukup untuk membeli sebotol minuman.',
      Pekerja: 'Sebagai pekerja, penting memastikan bahwa kenaikan penghasilan dan imbal hasil investasi mampu mengalahkan laju inflasi tahunan agar kesejahteraan keluarga tidak menurun.',
      Pensiunan: 'Sebagai pensiunan, inflasi adalah ancaman terbesar bagi dana simpanan tetap, terutama untuk pos pengeluaran medis dan bahan kebutuhan pokok.',
    },
    introduction: [
      'Inflasi adalah kenaikan harga barang dan jasa secara umum yang berlangsung secara terus-menerus dalam perekonomian. Dalam istilah keuangan, inflasi sering dijuluki sebagai "Pencuri Senyap" (Silent Thief) karena ia mengikis kekayaan kita tanpa kita sadari, tanpa ada uang fisik yang hilang dari dompet kita.',
      'Sangat penting membedakan antara Nilai Nominal dan Daya Beli Riil. Nilai nominal adalah angka rupiah yang tercetak di atas lembaran uang atau saldo rekening bank Anda. Daya beli riil adalah jumlah barang atau jasa nyata yang sesungguhnya dapat Anda beli dengan uang tersebut. Jika harga barang naik dua kali lipat, maka daya beli uang Anda berkurang separuhnya.',
      'Rumus perhitungan daya beli pada bulan t yang diimplementasikan pada KitaInvest adalah: Daya Beli = Saldo Nominal / (1 + inflasi_tahunan)^(t/12). Dengan inflasi 5% per tahun, uang tunai Rp10.000.000 yang Anda simpan di bawah kasur akan kehilangan lebih dari 21% daya belinya hanya dalam kurun waktu 5 tahun.',
      'Menyimpan seluruh kekayaan dalam bentuk uang tunai atau tabungan berbunga 0% adalah salah satu keputusan yang membawa risiko pasti: penurunan daya beli. Oleh karena itu, berinvestasi pada instrumen yang mampu memberikan tingkat pertumbuhan di atas tingkat inflasi tahunan bukanlah opsi kemewahan, melainkan kebutuhan mutlak untuk mempertahankan kualitas hidup.',
    ],
    glossary: [
      {
        term: 'Inflasi (Inflation)',
        icon: '🏷️',
        definition: 'Fenomena kenaikan harga barang dan jasa secara terus-menerus yang mengakibatkan turunnya daya beli mata uang.',
      },
      {
        term: 'Daya Beli Riil (Purchasing Power)',
        icon: '🛒',
        definition: 'Kemampuan uang nyata untuk ditukarkan dengan sejumlah barang dan jasa setelah memperhitungkan faktor penyesuaian inflasi.',
      },
      {
        term: 'Nilai Nominal (Nominal Value)',
        icon: '💵',
        definition: 'Nilai angka uang yang tertulis secara eksplisit pada mata uang tanpa memperhitungkan perubahan harga barang di pasar.',
      },
      {
        term: 'Imbal Hasil Riil (Real Return)',
        icon: '📊',
        definition: 'Tingkat keuntungan bersih dari investasi setelah dikurangi laju inflasi (Return Riil ≈ Return Nominal - Tingkat Inflasi).',
      },
    ],
    simulationCase: {
      title: 'Simulasi Erosi Daya Beli: Uang Tunai Rp10.000.000 Tanpa Investasi (Inflasi 5%/Tahun)',
      subtitle: 'Memperlihatkan penurunan daya beli riil uang tunai seiring berjalannya waktu.',
      table: {
        caption: 'Tabel Penurunan Kemampuan Membeli Barang dari Uang Tunai Rp10.000.000 (Bunga 0%)',
        headers: ['Waktu Disimpan', 'Saldo Nominal Rekening', 'Daya Beli Riil (Nilai Barang)', 'Penurunan Daya Beli', 'Dampak Nyata pada Kemampuan Konsumsi'],
        rows: [
          ['Tahun 0 (Hari Ini)', 'Rp10.000.000', 'Rp10.000.000', 'Rp0 (0%)', 'Mampu membeli 100 paket kebutuhan pokok'],
          ['Tahun 1', 'Rp10.000.000', 'Rp9.523.810', '-Rp476.190 (-4,8%)', 'Kemampuan beli setara 95 paket'],
          ['Tahun 3', 'Rp10.000.000', 'Rp8.638.376', '-Rp1.361.624 (-13,6%)', 'Kemampuan beli setara 86 paket'],
          ['Tahun 5', 'Rp10.000.000', 'Rp7.835.262', '-Rp2.164.738 (-21,6%)', 'Kemampuan beli berkurang hampir seperempatnya'],
          ['Tahun 10', 'Rp10.000.000', 'Rp6.139.133', '-Rp3.860.867 (-38,6%)', 'Daya beli berkurang hampir 40%'],
        ],
      },
      takeaway: 'Strategi Solusi: Jika uang Rp10.000.000 tersebut diinvestasikan pada instrumen bertumbuh 10%/tahun, maka dalam 10 tahun saldonya menjadi Rp25.937.425 dengan Daya Beli Riil tetap naik menjadi Rp15.923.364 (+59,2% di atas inflasi!).',
    },
    sections: [
      {
        heading: 'Nominal Uang vs Daya Beli Riil',
        content: 'Inflasi adalah kenaikan harga barang dan jasa secara umum yang berlangsung terus-menerus. Uang Rp100.000 hari ini tidak akan mampu membeli jumlah barang yang sama sepuluh tahun mendatang. Oleh karena itu, memiliki nominal saldo yang bertambah belum menjamin kita menjadi lebih kaya jika kenaikan harganya lebih cepat dari pertumbuhan dana.',
        keyPoints: [
          'Saldo Nominal adalah angka rupiah yang tertera di rekening Anda.',
          'Daya Beli (Nilai Riil) adalah kemampuan uang tersebut untuk ditukarkan dengan barang nyata setelah memperhitungkan faktor inflasi.',
          'Rumus daya beli pada bulan t: Daya Beli = Saldo Nominal / (1 + i_{tahunan})^{t/12}.',
        ],
      },
      {
        heading: 'Mengapa Investasi Penting Menghadapi Inflasi',
        content: 'Menyimpan seluruh uang dalam bentuk tunai atau tabungan berbunga nol persen di bawah kasur berisiko mengalami penurunan daya beli secara pasti setiap tahunnya. Berinvestasi pada aset yang bertumbuh bertujuan melindungi dan mempertahankan daya beli modal kita.',
        keyPoints: [
          'Jika inflasi 5% dan pertumbuhan investasi 0%, daya beli uang Anda berkurang sekitar 5% per tahun.',
          'Target investasi yang sehat sebaiknya menghasilkan tingkat pertumbuhan di atas tingkat inflasi tahunan.',
        ],
      },
    ],
    video: {
      videoId: 'NmxeJmuOF1g',
      videoTitle: 'Inflasi: Mengapa Harga Barang Naik dan Daya Beli Uang Kita Turun?',
      duration: '8 Menit',
      summary: 'Video ini memberikan analogi sederhana tentang penyebab inflasi di Indonesia, dampaknya terhadap harga barang sehari-hari, dan cara melawannya dengan instrumen investasi.',
      transcriptPoints: [
        'Inflasi disebabkan oleh naiknya biaya produksi bahan baku (cost-push) dan tingginya permintaan masyarakat yang melebihi ketersediaan barang (demand-pull).',
        'Uang tunai adalah aset yang dijamin mengalami depresiasi daya beli secara pasti setiap tahunnya jika hanya didiamkan.',
        'Suku bunga tabungan biasa (0-1%) setelah dipotong biaya administrasi bulanan dan pajak bunga bank justru menghasilkan return negatif.',
        'Melawan inflasi dilakukan dengan menempatkan sebagian dana pada instrumen yang memiliki riwayat return di atas tingkat inflasi nasional (seperti SBN, reksa dana, atau saham).',
      ],
    },
    keyTakeaways: [
      'Saldo nominal yang bertambah belum tentu meningkatkan kekayaan jika laju inflasi lebih tinggi.',
      'Daya beli riil mengukur kemampuan belanja nyata setelah disesuaikan dengan kenaikan harga barang.',
      'Menyimpan uang tunai jangka panjang tanpa bunga menjamin erosi nilai riil secara pasti.',
      'Investasi adalah instrumen perlindungan diri agar daya beli modal tidak tergerus oleh kenaikan harga di masa depan.',
    ],
    quiz: [
      {
        id: 'q5-1',
        question: 'Jika seseorang memiliki saldo Rp10.000.000 hari ini dan inflasi tahunan 5%, apa arti nilai daya beli uang tersebut 5 tahun lagi?',
        options: [
          'Daya beli uang tersebut tetap sama persis karena nilai nominalnya masih Rp10.000.000.',
          'Daya beli uang tersebut menurun, artinya dengan Rp10.000.000 ia akan memperoleh lebih sedikit barang dibandingkan hari ini.',
          'Daya beli uang tersebut otomatis berlipat ganda menjadi Rp20.000.000.',
          'Inflasi tidak mempengaruhi harga barang dan jasa di pasar.',
        ],
        correctIndex: 1,
        explanation: 'Inflasi menurunkan daya beli uang. Meskipun nilai nominalnya tetap Rp10.000.000, kenaikan harga barang menyebabkan jumlah barang yang dapat dibeli menjadi lebih sedikit.',
      },
      {
        id: 'q5-2',
        question: 'Bagaimana grafik KitaInvest menampilkan perbedaan antara Saldo Nominal dan Daya Beli Riil?',
        options: [
          'Garis Saldo Nominal selalu berada di bawah garis Daya Beli.',
          'Garis Daya Beli memperhitungkan faktor inflasi kumulatif, sehingga seiring berjalannya waktu nilainya berada di bawah garis Saldo Nominal.',
          'Kedua garis selalu menyatu tanpa ada perbedaan sama sekali.',
          'Garis Daya Beli hanya menampilkan pengeluaran bulanan pengguna.',
        ],
        correctIndex: 1,
        explanation: 'Karena inflasi mengikis nilai riil uang seiring bertambahnya waktu (bulan t), garis Daya Beli Riil akan terdiskon oleh faktor inflasi sehingga nilainya tampak lebih rendah dibandingkan Saldo Nominal di masa depan.',
      },
    ],
  },
];

export function getTopicById(id) {
  const numericId = Number(id);
  return TOPICS.find((t) => t.id === numericId) || null;
}

export function getTopicBySlug(slug) {
  return TOPICS.find((t) => t.slug === slug) || null;
}

export function getSortedTopicsForCategory(category) {
  const c = String(category || 'pelajar').toLowerCase();
  const topicsCopy = [...TOPICS];
  if (c === 'pelajar') {
    // Pelajar: Mulai dari Pengelolaan Uang, Tujuan Keuangan, Bunga Majemuk, Risiko, Inflasi
    const order = [1, 2, 4, 3, 5];
    return order.map((id) => topicsCopy.find((t) => t.id === id));
  } else if (c === 'pekerja') {
    // Pekerja: Pengelolaan Uang, Risiko, Inflasi, Tujuan Keuangan, Bunga Majemuk
    const order = [1, 3, 5, 2, 4];
    return order.map((id) => topicsCopy.find((t) => t.id === id));
  } else if (c === 'pensiunan') {
    // Pensiunan: Inflasi & Daya Beli, Risiko, Pengelolaan Uang, Tujuan Keuangan, Bunga Majemuk
    const order = [5, 3, 1, 2, 4];
    return order.map((id) => topicsCopy.find((t) => t.id === id));
  }
  return topicsCopy;
}
