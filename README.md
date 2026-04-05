<div align="center">
  <img src="favicon.svg" alt="Smart Task Manager Logo" width="120"/>
  <h1>Smart Task Manager 🎓</h1>
  <p><strong>Aplikasi web modern untuk manajemen waktu dan tugas bagi mahasiswa agar tetap produktif dan tidak pernah melewatkan <i>deadline</i>.</strong></p>
  
  <p>
    <img src="https://img.shields.io/badge/Status-Active-success.svg" alt="Status">
    <img src="https://img.shields.io/badge/Made%20with-HTML%20%7C%20TailwindCSS%20%7C%20JS-blue" alt="Tech Stack">
    <img src="https://img.shields.io/badge/License-MIT-purple.svg" alt="License">
  </p>
</div>

---
<p align="center">
  <a href="https://nailul-ghufron.github.io/Smart-Task-Manager-untuk-Mahasiswa-/" target="_blank">
    🚀 <b>Live Demo</b>
  </a>
</p>

## 📌 Tentang Aplikasi
**Smart Task Manager** adalah aplikasi *To-Do List* atau sistem manajemen tugas berbasis peramban (browser) reaktif dengan desain UI modern (*Glassmorphism*, dukungan Mode Gelap, dan animasi mikro). Aplikasi ini didesain khusus untuk membantu rutinitas harian para mahasiswa agar tugas atau proyek tidak terabaikan berkat sistem peringatan (*reminder*) hingga batas waktu (*deadline*).

## ✨ Fitur Utama
* 📝 **Manajemen Tugas Komprehensif** - Buat, edit, hapus, dan tandai tugas agar mudah dipantau.
* 🚦 **Prioritas Berwarna** - Tetapkan tugas dengan prioritas Rendah (Hijau), Sedang (Kuning), atau Tinggi (Merah). 
* ⏰ **Sistem Deadline & Reminder** - Notifikasi jika tenggat waktu sudah melampaui batas dan mode peringatan otomatis setiap 60 menit dengan *Desktop Notification API*.
* 🎛️ **Filter & Sortir yang Cerdas** - Saring tampilan tugas berdasarkan prioritas, status pengerjaan, rentang batas waktu (Minggu Ini/Bulan Ini), dan urutan kedekatan deadline.
* 🎨 **UI Modern & Mode Gelap** - Tampilan Glassmorphism mulus, animasi responsif dengan menggunakan kekuatan TailwindCSS. Mendukung tema *Dark Mode* otomatis menyesuaikan dengan preferensi perangkat pengunjung.

## 🛠️ Teknologi yang Digunakan
Proyek ini dibangun murni di atas pondasi web dengan prinsip *Zero-Build-Step Development* untuk pengalaman *cloning* yang cepat (tidak perlu *npm install*):
* **[HTML5](https://developer.mozilla.org/en-US/docs/Glossary/HTML5)** - Struktur semantik halaman.
* **[Tailwind CSS (via CDN)](https://tailwindcss.com/)** - *Styling*, desain responsif, mode komposer, efek animasi dan bayangan modern.
* **[Vanilla JavaScript (ES6 Modules)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)** - Logika aplikasi, *Controller*, repositori interaktif & *Events bus*.
* **[LocalStorage DOM](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)** - Menyimpan data agar tidak hilang meskipun jendela browser tertutup.

## 📁 Struktur Direktori
```text
Smart-Task-Manager-(untuk-Mahasiswa)/
├── index.html        # Halaman utama aplikasi (Entry Point)
├── style.css         # Custom styling (Glass efek, inverting logo dll)
├── favicon.svg       # Ikon situs modern berstandar vektor
└── js/               # Sumber Logika Aplikasi
    ├── app.js        # Bootstrapper (Main JS)
    ├── controllers/  # Menyambungkan Logika Modul (Misal: UIController.js)
    ├── models/       # Skema / Model Tugas 
    ├── services/     # Layanan utama (Reminders, Notifikasi, Manipulasi Task)
    ├── repositories/ # Pengelolaan data di Storage Engine
    └── utils/        # Event Bus dan Helper fungsionalitas Format Tanggal
```

## 🚀 Panduan Memulai Cepat (Instalasi)

Tidak perlu setup _backend_ atau konfigurasi server khusus! 

1. **Clone repositori ini:**
   ```bash
   git clone https://github.com/nailul-ghufron/Smart-Task-Manager-untuk-Mahasiswa-.git
   ```

2. **Masuk ke folder proyek:**
   ```bash
   cd Smart-Task-Manager-untuk-Mahasiswa-
   ```

3. **Buka ke Browser Utama (Menjalankan Secara Lokal):**
   * Klik-dua kali pada file `index.html`.
   * ATAU, lebih disarankan menjalanakan *Live Server* dari ekstensi VS Code (`Live Server`) untuk menghindari isolasi modul (CORS Error saat me-*load* format `type="module"` pada Javascript).
   * Anda bisa juga menggunakan ekstensi sederhana di terminal:
     ```bash
     npx serve .
     ```

## 📱 Tangkapan Layar (Screenshots)
*(Belum Tersedia)*
```markdown
![Dashboard](link-to-dashboard-image.jpg)
```

## 🤝 Kontribusi
Kami selalu membuka jalan bagi pengembang atau pelajar mana pun untuk memajukan kode sumber ini!
1. Lakukan *Fork* pada repositori ini
2. Buat *branch* fitur Anda (`git checkout -b fitur/FiturKeren`)
3. Lakukan *Commit* perubahan Anda (`git commit -m 'Menambahkan FiturKeren'`)
4. Lakukan *Push* ke branch (`git push origin fitur/FiturKeren`)
5. Buka sebuah *Pull Request*

## 📜 Lisensi
Lisensi dilindungi di bawah regulasi **MIT License**. Lihat [LICENSE](LICENSE) untuk mempelajari lebih lanjut. Murni untuk tujuan publik, pembelajaran, dan open source.

---
Dikembangkan dengan ❤️ untuk kemudahan pengelolaan proyek kuliah dan tugas tanpa stres!
# Smart-Task-Manager-untuk-Mahasiswa-
