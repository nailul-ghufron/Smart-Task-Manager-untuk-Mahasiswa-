Smart Task Manager  |  Product Backlog v2.0

**📋 PRODUCT BACKLOG**

Smart Task Manager – Post-MVP Enhancement

Versi 2.0  |  Target Pengguna: Mahasiswa Aktif

Dibuat: April 2026

# **1. Ringkasan Eksekutif**
Dokumen ini adalah Product Backlog resmi untuk pengembangan Smart Task Manager pasca-MVP (Versi 2.0). Berdasarkan analisis saran peningkatan yang telah dikumpulkan, backlog ini mencakup 22 User Story yang dikelompokkan ke dalam 7 Epic, siap diprioritaskan dan dijadwalkan ke dalam Sprint 4–7.

|**Metrik**|**Nilai**|
| :-: | :-: |
|**Total Epic**|7 Epic|
|**Total User Story**|22 User Story|
|**Total Story Points**|150 SP|
|**Sprint yang Direncanakan**|Sprint 4 – Sprint 7 (Post-MVP)|
|**Product Owner**|Tim Pengembang Smart Task Manager|
|**Metode Estimasi**|Story Points (Fibonacci: 1, 2, 3, 5, 8, 13)|

# **2. Definisi Prioritas & Story Points**

|**Prioritas**|**Keterangan**|**Contoh**|
| :-: | :-: | :-: |
|**Critical**|Wajib ada di Sprint berikutnya. Aplikasi tidak berguna tanpanya.|Autentikasi, Migrasi ke Backend|
|**Tinggi**|Sangat diharapkan pengguna. Nilai tinggi, effort terkelola.|Dark Mode, Kategori Mata Kuliah, Sub-tugas|
|**Sedang**|Meningkatkan pengalaman, namun bisa ditunda 1–2 sprint.|Tampilan Kalender, PWA, Recurring Task|
|**Rendah**|Nice to have. Dikerjakan jika kapasitas sprint masih ada.|Drag & Drop, Aksesibilitas, Kolaborasi|

|**Story Points**|**Estimasi Kompleksitas**|
| :-: | :-: |
|1 – 2|Sangat sederhana. Satu komponen UI atau fungsi kecil.|
|3 – 5|Sedang. Melibatkan beberapa komponen atau satu fitur utuh.|
|8|Kompleks. Butuh koordinasi antar modul, mungkin perlu spike.|
|13|Sangat kompleks. Wajib dipecah menjadi task lebih kecil sebelum sprint dimulai.|

# **3. Daftar Epic**

|**ID**|**Nama Epic**|**Deskripsi**|**# US**|**SP**|
| :-: | :-: | :-: | :-: | :-: |
|**EP-01**|**Core Task Management**|Fondasi CRUD tugas yang sudah ada di MVP (Sprint 1-3). Basis dari semua fitur lain.|0|0|
|**EP-02**|**User & Data Persistence**|Autentikasi, multi-user, dan penyimpanan data cloud agar data tidak hilang.|4|34|
|**EP-03**|**Smart Notifications**|Pengingat yang lebih cerdas, fleksibel, dan andal (tidak hanya bergantung tab terbuka).|4|24|
|**EP-04**|**Organization & Discovery**|Kategorisasi, pencarian, dan cara-cara untuk menemukan tugas dengan cepat.|4|21|
|**EP-05**|**Productivity & Analytics**|Sub-tugas, recurring tasks, statistik, dan insight produktivitas.|4|26|
|**EP-06**|**UX & Accessibility**|Peningkatan tampilan, dark mode, drag & drop, PWA, dan pengalaman pengguna.|4|19|
|**EP-07**|**Integrations**|Koneksi ke layanan pihak ketiga (Google Calendar, Email, dsb.).|2|26|

# **4. Product Backlog – Detail User Story**
## **EP-01 – Core Task Management**
Fondasi CRUD tugas yang sudah ada di MVP (Sprint 1-3). Basis dari semua fitur lain.

|**ID**|**Judul**|**User Story**|**Prioritas**|**SP**|**Sprint**|
| :-: | :-: | :-: | :-: | :-: | :-: |

## **EP-02 – User & Data Persistence**
Autentikasi, multi-user, dan penyimpanan data cloud agar data tidak hilang.

|**ID**|**Judul**|**User Story**|**Prioritas**|**SP**|**Sprint**|
| :-: | :-: | :-: | :-: | :-: | :-: |
|**US-01**|**Registrasi & Login dengan Email**|<p>*Sebagai* **Mahasiswa**</p><p>*Saya ingin* mendaftar dan masuk dengan email & password</p><p>*Agar* data tersimpan aman dan bisa diakses dari mana saja</p>|**Critical**|13|Sprint 4|
|<p>**✅ Acceptance Criteria:**</p><p>- Form registrasi dengan validasi email</p><p>- Login dengan JWT token</p><p>- Logout bersih (hapus token)</p><p>**📌 Catatan:** *Backend Node.js + Express diperlukan*</p>||||||
|**US-02**|**Migrasi Data ke Backend (REST API)**|<p>*Sebagai* **Sistem**</p><p>*Saya ingin* menyimpan tugas di database MongoDB</p><p>*Agar* data tidak hilang saat ganti perangkat/browser</p>|**Critical**|13|Sprint 4|
|<p>**✅ Acceptance Criteria:**</p><p>- Endpoint CRUD /api/tasks</p><p>- Repository diubah dari localStorage ke fetch</p><p>- Migrasi data localStorage lama ke backend (one-time)</p><p>**📌 Catatan:** *Mengganti TaskRepository.js sepenuhnya*</p>||||||
|**US-03**|**Ekspor & Impor Data JSON**|<p>*Sebagai* **Mahasiswa**</p><p>*Saya ingin* mengekspor semua tugas ke file JSON dan mengimpornya kembali</p><p>*Agar* punya cadangan data dan bisa pindah perangkat</p>|**Tinggi**|5|Sprint 4|
|<p>**✅ Acceptance Criteria:**</p><p>- Tombol 'Export JSON' mengunduh file</p><p>- Tombol 'Import JSON' membaca file dan memuat tugas</p><p>- Validasi format JSON saat import</p><p>**📌 Catatan:** *Prioritas tinggi karena solusi sementara sebelum backend siap*</p>||||||
|**US-04**|**Sesi Persistent (Remember Me)**|<p>*Sebagai* **Mahasiswa**</p><p>*Saya ingin* memilih opsi 'Ingat saya' saat login</p><p>*Agar* tidak perlu login ulang setiap kali membuka browser</p>|**Sedang**|3|Sprint 5|
|<p>**✅ Acceptance Criteria:**</p><p>- Checkbox 'Ingat saya' di form login</p><p>- Token disimpan di localStorage jika dicentang</p><p>- Token kedaluwarsa otomatis setelah 30 hari</p>||||||

## **EP-03 – Smart Notifications**
Pengingat yang lebih cerdas, fleksibel, dan andal (tidak hanya bergantung tab terbuka).

|**ID**|**Judul**|**User Story**|**Prioritas**|**SP**|**Sprint**|
| :-: | :-: | :-: | :-: | :-: | :-: |
|**US-05**|**Push Notification via Service Worker**|<p>*Sebagai* **Mahasiswa**</p><p>*Saya ingin* menerima notifikasi meski browser ditutup</p><p>*Agar* tidak melewatkan deadline bahkan saat tidak membuka aplikasi</p>|**Tinggi**|8|Sprint 5|
|<p>**✅ Acceptance Criteria:**</p><p>- Service Worker terdaftar dengan benar</p><p>- Notifikasi muncul pada H-1 dan H-0 meski tab tertutup</p><p>- Tombol 'Izinkan Notifikasi' tampil jika belum diizinkan</p><p>**📌 Catatan:** *Perlu FCM atau Web Push Protocol*</p>||||||
|**US-06**|**Pengingat Kustom (Bisa Pilih Waktu)**|<p>*Sebagai* **Mahasiswa**</p><p>*Saya ingin* mengatur waktu pengingat sendiri (misal: 3 hari sebelum, jam 18.00)</p><p>*Agar* fleksibel sesuai kebiasaan belajar</p>|**Sedang**|5|Sprint 5|
|<p>**✅ Acceptance Criteria:**</p><p>- Field 'Ingatkan saya' di form tambah/edit tugas</p><p>- Pilihan preset: H-1, H-2, H-3, H-7</p><p>- Pilihan waktu jam (default 08.00)</p><p>- Pengingat kustom tersimpan di model Task</p>||||||
|**US-07**|**Notifikasi via Email (H-1)**|<p>*Sebagai* **Mahasiswa**</p><p>*Saya ingin* menerima email pengingat sehari sebelum deadline</p><p>*Agar* pengingat andal meski jarang membuka browser</p>|**Sedang**|8|Sprint 6|
|<p>**✅ Acceptance Criteria:**</p><p>- Email terkirim H-1 pukul 08.00 ke email terdaftar</p><p>- Email berisi judul tugas, deadline, dan link aplikasi</p><p>- Tombol opt-out di pengaturan profil</p><p>**📌 Catatan:** *Gunakan EmailJS atau Nodemailer + cron job*</p>||||||
|**US-08**|**Log Notifikasi yang Lebih Lengkap**|<p>*Sebagai* **Mahasiswa**</p><p>*Saya ingin* melihat riwayat semua notifikasi yang pernah dikirim</p><p>*Agar* bisa mengecek apakah pengingat sudah terkirim atau belum</p>|**Rendah**|3|Sprint 6|
|<p>**✅ Acceptance Criteria:**</p><p>- Halaman / drawer 'Riwayat Notifikasi'</p><p>- Kolom: tanggal, jenis (browser/email), judul tugas</p><p>- Bisa dihapus per item atau semua sekaligus</p>||||||

## **EP-04 – Organization & Discovery**
Kategorisasi, pencarian, dan cara-cara untuk menemukan tugas dengan cepat.

|**ID**|**Judul**|**User Story**|**Prioritas**|**SP**|**Sprint**|
| :-: | :-: | :-: | :-: | :-: | :-: |
|**US-09**|**Kategori / Mata Kuliah**|<p>*Sebagai* **Mahasiswa**</p><p>*Saya ingin* menambahkan kategori (mata kuliah) ke setiap tugas</p><p>*Agar* tugas lebih terorganisir dan mudah dipisahkan per mata kuliah</p>|**Tinggi**|5|Sprint 4|
|<p>**✅ Acceptance Criteria:**</p><p>- Field 'Mata Kuliah' di form tugas (dropdown + opsi baru)</p><p>- Filter 'Mata Kuliah' di daftar tugas</p><p>- Kelola daftar mata kuliah (tambah, hapus, rename)</p><p>**📌 Catatan:** *Tambah field course ke model Task*</p>||||||
|**US-10**|**Pencarian Teks Real-time**|<p>*Sebagai* **Mahasiswa**</p><p>*Saya ingin* mengetik kata kunci di kotak pencarian</p><p>*Agar* cepat menemukan tugas tertentu saat jumlah tugas sudah banyak</p>|**Tinggi**|3|Sprint 4|
|<p>**✅ Acceptance Criteria:**</p><p>- Kotak pencarian di atas daftar tugas</p><p>- Pencarian berjalan saat mengetik (debounce 300ms)</p><p>- Mencari di judul dan deskripsi tugas</p><p>- Menampilkan 'Tidak ditemukan' jika kosong</p>||||||
|**US-11**|**Tampilan Kalender Bulanan**|<p>*Sebagai* **Mahasiswa**</p><p>*Saya ingin* melihat tugas dalam tampilan kalender bulanan</p><p>*Agar* mudah melihat hari-hari sibuk dan merencanakan belajar</p>|**Sedang**|8|Sprint 5|
|<p>**✅ Acceptance Criteria:**</p><p>- Toggle antara tampilan list dan kalender</p><p>- Titik warna pada tanggal berdasarkan prioritas</p><p>- Klik tanggal menampilkan detail tugas di hari itu</p><p>**📌 Catatan:** *Gunakan library FullCalendar atau custom*</p>||||||
|**US-12**|**Tag / Label Fleksibel**|<p>*Sebagai* **Mahasiswa**</p><p>*Saya ingin* menambahkan tag bebas ke tugas (misal: #ujian, #kelompok)</p><p>*Agar* pengelompokan lebih fleksibel di luar kategori mata kuliah</p>|**Rendah**|5|Sprint 6|
|<p>**✅ Acceptance Criteria:**</p><p>- Input tag dengan autocomplete dari tag yang sudah ada</p><p>- Filter berdasarkan tag</p><p>- Tag tampil sebagai badge di daftar tugas</p>||||||

## **EP-05 – Productivity & Analytics**
Sub-tugas, recurring tasks, statistik, dan insight produktivitas.

|**ID**|**Judul**|**User Story**|**Prioritas**|**SP**|**Sprint**|
| :-: | :-: | :-: | :-: | :-: | :-: |
|**US-13**|**Sub-tugas (Checklist dalam Task)**|<p>*Sebagai* **Mahasiswa**</p><p>*Saya ingin* memecah tugas besar menjadi langkah-langkah kecil</p><p>*Agar* merasa progres dan lebih mudah mengerjakan tugas kompleks</p>|**Tinggi**|5|Sprint 5|
|<p>**✅ Acceptance Criteria:**</p><p>- Bisa menambah sub-tugas di dalam form edit tugas</p><p>- Sub-tugas bisa dicentang satu per satu</p><p>- Progress bar menampilkan % sub-tugas selesai</p><p>**📌 Catatan:** *Tambah array subtasks ke model Task*</p>||||||
|**US-14**|**Tugas Berulang (Recurring Task)**|<p>*Sebagai* **Mahasiswa**</p><p>*Saya ingin* membuat tugas yang otomatis berulang setiap minggu/bulan</p><p>*Agar* tidak perlu input manual untuk tugas rutin seperti quiz mingguan</p>|**Sedang**|8|Sprint 6|
|<p>**✅ Acceptance Criteria:**</p><p>- Opsi 'Ulangi setiap' di form tugas: tidak/harian/mingguan/bulanan</p><p>- Setelah tugas selesai/lewat deadline, sistem membuat tugas baru otomatis</p><p>- Bisa menghentikan pengulangan kapan saja</p><p>**📌 Catatan:** *Tambah field recurrence ke model Task*</p>||||||
|**US-15**|**Statistik Produktivitas**|<p>*Sebagai* **Mahasiswa**</p><p>*Saya ingin* melihat grafik tugas selesai vs overdue per minggu</p><p>*Agar* evaluasi manajemen waktu dan motivasi diri</p>|**Sedang**|8|Sprint 6|
|<p>**✅ Acceptance Criteria:**</p><p>- Halaman 'Statistik' dengan grafik batang mingguan</p><p>- Menampilkan: total selesai, total overdue, rata-rata waktu penyelesaian</p><p>- Filter rentang waktu: 7 hari, 30 hari, 3 bulan</p><p>**📌 Catatan:** *Gunakan Chart.js*</p>||||||
|**US-16**|**Drag & Drop untuk Urutan Prioritas**|<p>*Sebagai* **Mahasiswa**</p><p>*Saya ingin* menggeser tugas di daftar untuk mengubah urutan</p><p>*Agar* pengaturan prioritas lebih cepat dan intuitif</p>|**Rendah**|5|Sprint 7|
|<p>**✅ Acceptance Criteria:**</p><p>- Daftar tugas bisa di-drag & drop antar urutan</p><p>- Urutan tersimpan di localStorage/backend</p><p>- Hanya aktif pada tampilan 'Urutan Manual' (bukan mode sort otomatis)</p><p>**📌 Catatan:** *Gunakan library SortableJS*</p>||||||

## **EP-06 – UX & Accessibility**
Peningkatan tampilan, dark mode, drag & drop, PWA, dan pengalaman pengguna.

|**ID**|**Judul**|**User Story**|**Prioritas**|**SP**|**Sprint**|
| :-: | :-: | :-: | :-: | :-: | :-: |
|**US-17**|**Mode Gelap (Dark Mode)**|<p>*Sebagai* **Mahasiswa**</p><p>*Saya ingin* mengaktifkan dark mode via toggle</p><p>*Agar* nyaman digunakan di malam hari dan lebih hemat baterai OLED</p>|**Tinggi**|3|Sprint 4|
|<p>**✅ Acceptance Criteria:**</p><p>- Toggle dark/light di navbar</p><p>- Preferensi tersimpan di localStorage</p><p>- Semua komponen mendukung dark mode (CSS variables)</p><p>- Mengikuti preferensi sistem (prefers-color-scheme) sebagai default</p>||||||
|**US-18**|**Progressive Web App (PWA)**|<p>*Sebagai* **Mahasiswa**</p><p>*Saya ingin* menginstall aplikasi di home screen HP</p><p>*Agar* akses cepat seperti aplikasi native, bisa offline (data cache)</p>|**Sedang**|8|Sprint 5|
|<p>**✅ Acceptance Criteria:**</p><p>- manifest.json lengkap (icon, name, theme\_color)</p><p>- Service Worker dengan strategi cache offline</p><p>- Prompt install muncul di mobile Chrome/Safari</p><p>- Offline: tampilkan data cache, beri tahu jika tidak ada koneksi</p>||||||
|**US-19**|**Onboarding & Empty State**|<p>*Sebagai* **Mahasiswa baru**</p><p>*Saya ingin* melihat panduan singkat saat pertama kali membuka aplikasi</p><p>*Agar* langsung paham cara menggunakan tanpa bingung</p>|**Sedang**|3|Sprint 5|
|<p>**✅ Acceptance Criteria:**</p><p>- Empty state ilustratif saat belum ada tugas</p><p>- Tooltip singkat pada fitur utama (one-time)</p><p>- Tombol 'Tambah Tugas Pertama' langsung buka form</p>||||||
|**US-20**|**Aksesibilitas Keyboard & Screen Reader**|<p>*Sebagai* **Semua pengguna**</p><p>*Saya ingin* menggunakan aplikasi sepenuhnya via keyboard</p><p>*Agar* inklusif untuk pengguna dengan kebutuhan khusus</p>|**Rendah**|5|Sprint 7|
|<p>**✅ Acceptance Criteria:**</p><p>- Semua tombol terjangkau via Tab</p><p>- Modal bisa ditutup dengan Escape</p><p>- ARIA labels pada elemen interaktif</p><p>- Focus trap di dalam modal</p>||||||

## **EP-07 – Integrations**
Koneksi ke layanan pihak ketiga (Google Calendar, Email, dsb.).

|**ID**|**Judul**|**User Story**|**Prioritas**|**SP**|**Sprint**|
| :-: | :-: | :-: | :-: | :-: | :-: |
|**US-21**|**Integrasi Google Calendar**|<p>*Sebagai* **Mahasiswa**</p><p>*Saya ingin* menambahkan tugas sebagai event di Google Calendar</p><p>*Agar* pengingat ganda, sinkronisasi dengan jadwal kuliah lain</p>|**Sedang**|13|Sprint 6|
|<p>**✅ Acceptance Criteria:**</p><p>- Tombol 'Tambah ke Google Calendar' di detail tugas</p><p>- OAuth flow untuk otorisasi Google Calendar</p><p>- Event dibuat dengan judul, deskripsi, dan deadline tugas</p><p>**📌 Catatan:** *Perlu Google Cloud project & OAuth credentials*</p>||||||
|**US-22**|**Berbagi Tugas / Kolaborasi Dasar**|<p>*Sebagai* **Mahasiswa**</p><p>*Saya ingin* membagikan daftar tugas ke teman satu kelompok</p><p>*Agar* koordinasi tugas kelompok lebih mudah</p>|**Rendah**|13|Sprint 7|
|<p>**✅ Acceptance Criteria:**</p><p>- Generate link berbagi read-only untuk daftar tugas tertentu</p><p>- Penerima bisa melihat (bukan mengedit) tanpa login</p><p>**📌 Catatan:** *Fitur lanjutan, butuh backend*</p>||||||

# **5. Tampilan Terurut Berdasarkan Prioritas**
Tabel berikut menampilkan semua user story diurutkan berdasarkan prioritas (Critical → Tinggi → Sedang → Rendah) lalu Story Points (terbesar dulu). Gunakan tampilan ini sebagai acuan Sprint Planning.

|**#**|**ID**|**Judul**|**Epic**|**Prioritas**|**SP**|**Sprint**|
| :-: | :-: | :-: | :-: | :-: | :-: | :-: |
|1|**US-01**|Registrasi & Login dengan Email|EP-02|**Critical**|13|Sprint 4|
|2|**US-02**|Migrasi Data ke Backend (REST API)|EP-02|**Critical**|13|Sprint 4|
|3|**US-05**|Push Notification via Service Worker|EP-03|**Tinggi**|8|Sprint 5|
|4|**US-03**|Ekspor & Impor Data JSON|EP-02|**Tinggi**|5|Sprint 4|
|5|**US-09**|Kategori / Mata Kuliah|EP-04|**Tinggi**|5|Sprint 4|
|6|**US-13**|Sub-tugas (Checklist dalam Task)|EP-05|**Tinggi**|5|Sprint 5|
|7|**US-10**|Pencarian Teks Real-time|EP-04|**Tinggi**|3|Sprint 4|
|8|**US-17**|Mode Gelap (Dark Mode)|EP-06|**Tinggi**|3|Sprint 4|
|9|**US-21**|Integrasi Google Calendar|EP-07|**Sedang**|13|Sprint 6|
|10|**US-07**|Notifikasi via Email (H-1)|EP-03|**Sedang**|8|Sprint 6|
|11|**US-11**|Tampilan Kalender Bulanan|EP-04|**Sedang**|8|Sprint 5|
|12|**US-14**|Tugas Berulang (Recurring Task)|EP-05|**Sedang**|8|Sprint 6|
|13|**US-15**|Statistik Produktivitas|EP-05|**Sedang**|8|Sprint 6|
|14|**US-18**|Progressive Web App (PWA)|EP-06|**Sedang**|8|Sprint 5|
|15|**US-06**|Pengingat Kustom (Bisa Pilih Waktu)|EP-03|**Sedang**|5|Sprint 5|
|16|**US-04**|Sesi Persistent (Remember Me)|EP-02|**Sedang**|3|Sprint 5|
|17|**US-19**|Onboarding & Empty State|EP-06|**Sedang**|3|Sprint 5|
|18|**US-22**|Berbagi Tugas / Kolaborasi Dasar|EP-07|**Rendah**|13|Sprint 7|
|19|**US-12**|Tag / Label Fleksibel|EP-04|**Rendah**|5|Sprint 6|
|20|**US-16**|Drag & Drop untuk Urutan Prioritas|EP-05|**Rendah**|5|Sprint 7|
|21|**US-20**|Aksesibilitas Keyboard & Screen Reader|EP-06|**Rendah**|5|Sprint 7|
|22|**US-08**|Log Notifikasi yang Lebih Lengkap|EP-03|**Rendah**|3|Sprint 6|

# **6. Alokasi Sprint (Sprint 4–7)**

|**Sprint**|**Durasi**|**Fokus**|**User Stories**|**Total SP**|**Kapasitas\***|
| :-: | :-: | :-: | :-: | :-: | :-: |
|**Sprint 4**|5 hari|Fondasi Post-MVP|<p>• US-01: Registrasi & Login dengan Email (13 SP)</p><p>• US-02: Migrasi Data ke Backend (REST API) (13 SP)</p><p>• US-03: Ekspor & Impor Data JSON (5 SP)</p><p>• US-09: Kategori / Mata Kuliah (5 SP)</p><p>• US-10: Pencarian Teks Real-time (3 SP)</p><p>• US-17: Mode Gelap (Dark Mode) (3 SP)</p>|**42**|~34 SP|
|**Sprint 5**|5 hari|Pengalaman & Konektivitas|<p>• US-04: Sesi Persistent (Remember Me) (3 SP)</p><p>• US-05: Push Notification via Service Worker (8 SP)</p><p>• US-06: Pengingat Kustom (Bisa Pilih Waktu) (5 SP)</p><p>• US-11: Tampilan Kalender Bulanan (8 SP)</p><p>• US-13: Sub-tugas (Checklist dalam Task) (5 SP)</p><p>• US-18: Progressive Web App (PWA) (8 SP)</p><p>• US-19: Onboarding & Empty State (3 SP)</p>|**40**|~34 SP|
|**Sprint 6**|5 hari|Produktivitas & Integrasi|<p>• US-07: Notifikasi via Email (H-1) (8 SP)</p><p>• US-08: Log Notifikasi yang Lebih Lengkap (3 SP)</p><p>• US-12: Tag / Label Fleksibel (5 SP)</p><p>• US-14: Tugas Berulang (Recurring Task) (8 SP)</p><p>• US-15: Statistik Produktivitas (8 SP)</p><p>• US-21: Integrasi Google Calendar (13 SP)</p>|**45**|~34 SP|
|**Sprint 7**|4 hari|Polish & UX Lanjutan|<p>• US-16: Drag & Drop untuk Urutan Prioritas (5 SP)</p><p>• US-20: Aksesibilitas Keyboard & Screen Reader (5 SP)</p><p>• US-22: Berbagi Tugas / Kolaborasi Dasar (13 SP)</p>|**23**|~34 SP|

*\* Kapasitas sprint ~34 SP adalah estimasi awal untuk tim kecil (2–3 developer). Sesuaikan berdasarkan velocity aktual setelah Sprint 4.*

# **7. Definition of Ready & Definition of Done**
## **7.1 Definition of Ready (DoR)**
User Story siap masuk Sprint jika:

- User Story sudah memiliki acceptance criteria yang jelas dan terukur.
- Story points sudah diestimasi oleh tim.
- Dependencies sudah teridentifikasi (tidak ada blocker).
- Desain UI (wireframe) sudah disetujui untuk fitur yang melibatkan UI baru.
- API contract sudah disepakati untuk fitur yang melibatkan backend.

## **7.2 Definition of Done (DoD)**
User Story dianggap selesai (Done) jika:

- Semua acceptance criteria terpenuhi dan diverifikasi.
- Kode sudah di-review (minimal 1 reviewer).
- Unit test ditulis untuk logika bisnis utama.
- Fitur berjalan di browser target: Chrome, Firefox, Safari (mobile & desktop).
- Dokumentasi teknis (JSDoc atau komentar) diperbarui.
- Tidak ada regresi pada fitur yang sudah ada (manual smoke test).
- Merged ke branch develop dan siap untuk demo Sprint Review.


*Smart Task Manager – Product Backlog v2.0  |  Dokumen ini bersifat living document dan akan diperbarui setiap Sprint Planning.*
Halaman  dari 
