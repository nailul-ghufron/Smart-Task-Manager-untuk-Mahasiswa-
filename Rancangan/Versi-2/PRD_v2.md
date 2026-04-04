Smart Task Manager  |  PRD v2.0

**📄 PRODUCT REQUIREMENTS DOCUMENT**

Smart Task Manager – Untuk Mahasiswa

Versi 2.0  |  Post-MVP Enhancement  |  April 2026

|**Atribut**|**Keterangan**|
| :-: | :-: |
|**Proyek**|Smart Task Manager|
|**Versi**|2\.0 (Post-MVP Enhancement)|
|**Versi Sebelumnya**|1\.0 (MVP – Sprint 1–3)|
|**Target Pengguna**|Mahasiswa aktif|
|**Pendekatan Pengembangan**|Hybrid (Waterfall untuk arsitektur + Agile/Sprint untuk eksekusi)|
|**Arsitektur**|Layered Architecture (Presentation – Business Logic – Data)|
|**Sprint Direncanakan**|Sprint 4–7 (Post-MVP)|
|**Dibuat**|April 2026|

# **1. Tujuan Produk**
Smart Task Manager adalah aplikasi web manajemen tugas yang dirancang khusus untuk mahasiswa aktif. Setelah berhasil menyelesaikan MVP (Sprint 1–3) dengan fitur CRUD, deadline, dan notifikasi dasar, versi 2.0 ini bertujuan untuk:

- Memigrasikan data dari localStorage ke backend cloud (Node.js + MongoDB) agar data aman dan dapat diakses lintas perangkat.
- Meningkatkan keandalan notifikasi dengan Service Worker, notifikasi email, dan pengingat kustom.
- Menambahkan fitur organisasi tugas (kategori mata kuliah, tag, pencarian) untuk meningkatkan produktivitas.
- Menyediakan insight produktivitas melalui statistik dan tampilan kalender.
- Meningkatkan pengalaman pengguna (dark mode, PWA, onboarding) agar terasa seperti aplikasi native.
- Membuka jalur integrasi dengan layanan pihak ketiga (Google Calendar).

# **2. Status MVP & Perubahan di v2.0**
Berikut ringkasan fitur yang sudah selesai di MVP (v1.0) dan tambahan yang menjadi target v2.0:

|**Fitur / Area**|**Status v1.0 (MVP)**|**Target v2.0**|**Epic**|
| :-: | :-: | :-: | :-: |
|CRUD Tugas (buat, baca, edit, hapus)|**✅ Selesai**|Tidak berubah (baseline)|EP-01|
|Prioritas (Tinggi/Sedang/Rendah)|**✅ Selesai**|Tidak berubah|EP-01|
|Filter & Sorting|**✅ Selesai**|Ditingkatkan (kategori, tag)|EP-04|
|Notifikasi browser (H-1 & H-0)|**✅ Selesai**|Diperluas: Service Worker, kustom, email|EP-03|
|Penyimpanan data|**⚠️ localStorage**|Migrasi ke MongoDB + REST API|EP-02|
|Autentikasi pengguna|**❌ Belum ada**|Login/Register + JWT|EP-02|
|Kategori / Mata Kuliah|**❌ Belum ada**|Dropdown + filter|EP-04|
|Pencarian teks|**❌ Belum ada**|Real-time search dengan debounce|EP-04|
|Sub-tugas / Checklist|**❌ Belum ada**|Nested checklist + progress bar|EP-05|
|Statistik Produktivitas|**❌ Belum ada**|Grafik Chart.js, filter 7/30/90 hari|EP-05|
|Dark Mode|**❌ Belum ada**|Toggle + CSS variables|EP-06|
|PWA (install di homescreen)|**❌ Belum ada**|manifest.json + Service Worker cache|EP-06|
|Integrasi Google Calendar|**❌ Belum ada**|OAuth + tambah event otomatis|EP-07|

# **3. Ruang Lingkup v2.0**
## **3.1 Dalam Ruang Lingkup (In Scope)**

|**Area**|**Detail**|
| :-: | :-: |
|**Backend & Auth**|Node.js + Express REST API, MongoDB, autentikasi JWT|
|**Notifikasi Lanjutan**|Service Worker push notifications, pengingat kustom, notifikasi email H-1|
|**Organisasi Tugas**|Kategori mata kuliah, tag label fleksibel, pencarian real-time, tampilan kalender|
|**Produktivitas**|Sub-tugas (checklist), recurring task, statistik grafik mingguan/bulanan|
|**UX & Aksesibilitas**|Dark mode, PWA, onboarding/empty state, aksesibilitas keyboard & screen reader|
|**Integrasi**|Google Calendar API, ekspor/impor JSON, berbagi tugas (read-only link)|

## **3.2 Di Luar Ruang Lingkup (Out of Scope)**
- Aplikasi mobile native (Android/iOS) — cukup PWA responsive.
- Admin dashboard untuk pengelolaan multi-tenant.
- Integrasi LMS kampus (misalnya SIAK, Moodle) — rencanakan untuk v3.0.
- Fitur pembayaran atau monetisasi.
- AI/ML recommendation engine untuk task prioritization.

# **4. Pengguna & Peran**

|**Role**|**Deskripsi**|**Hak Akses**|
| :-: | :-: | :-: |
|**Mahasiswa (Pengguna Utama)**|Mahasiswa aktif yang mengelola tugas kuliah pribadi.|CRUD tugas, notifikasi, statistik, ekspor, integrasi kalender|
|Tamu (Penerima Share)|Pengguna yang menerima link berbagi dari mahasiswa.|Lihat daftar tugas (read-only), tanpa login|

*Catatan: Pada MVP v1.0, aplikasi hanya mendukung satu pengguna per browser (tanpa autentikasi). Di v2.0, setiap pengguna memiliki akun dan data yang terpisah di cloud.*

# **5. Persyaratan Fungsional**
Persyaratan fungsional diorganisir per Epic sesuai Product Backlog v2.0. Sprint 1–3 (MVP) dianggap selesai dan menjadi baseline.

## **EP-01 – Core Task Management (MVP Baseline)**

|**ID**|**Fitur**|**Deskripsi**|**Sprint**|
| :-: | :-: | :-: | :-: |
|F-01|**Buat Tugas**|Form: judul (wajib), deskripsi (opsional), deadline, prioritas.|Sprint 1 ✅|
|F-02|**Lihat Daftar Tugas**|List menampilkan judul, deadline, prioritas, status (Belum/Selesai).|Sprint 1 ✅|
|F-03|**Edit Tugas**|Ubah semua field, termasuk deadline & prioritas.|Sprint 1 ✅|
|F-04|**Hapus Tugas**|Konfirmasi sebelum hapus.|Sprint 1 ✅|
|F-05|**Tandai Selesai**|Checklist untuk mengubah status menjadi 'Selesai'.|Sprint 1 ✅|
|F-06|**Validasi Deadline**|Tidak boleh kurang dari tanggal sekarang (kecuali edit).|Sprint 2 ✅|
|F-07|**Tampilkan Sisa Waktu**|'2 hari lagi', 'besok', 'hari ini'.|Sprint 2 ✅|
|F-08|**Reminder Otomatis (H-1/H-0)**|Notifikasi browser pada H-1 dan H-0 jika izin diberikan.|Sprint 2 ✅|
|F-09|**Log Notifikasi Dasar**|Riwayat notifikasi di localStorage.|Sprint 2 ✅|
|F-10|**Filter Prioritas**|Pilihan: Semua, Tinggi, Sedang, Rendah.|Sprint 3 ✅|
|F-11|**Filter Status**|Belum Selesai / Selesai.|Sprint 3 ✅|
|F-12|**Filter Deadline**|Minggu ini, bulan ini, overdue.|Sprint 3 ✅|
|F-13|**Sortir**|Berdasarkan deadline terdekat atau prioritas.|Sprint 3 ✅|

## **EP-02 – User & Data Persistence**

|**ID**|**Fitur**|**Deskripsi**|**Sprint**|
| :-: | :-: | :-: | :-: |
|F-14|**Registrasi & Login**|Form registrasi + login dengan email & password. JWT token. Logout bersih.|Sprint 4|
|F-15|**Migrasi ke Backend**|REST API Node.js + Express + MongoDB. Ganti TaskRepository.js dari localStorage ke fetch.|Sprint 4|
|F-16|**Ekspor & Impor JSON**|Unduh semua tugas ke JSON. Upload file JSON untuk memuat kembali.|Sprint 4|
|F-17|**Sesi Persistent**|Checkbox 'Ingat saya'. Token di localStorage. Kedaluwarsa 30 hari.|Sprint 5|

## **EP-03 – Smart Notifications**

|**ID**|**Fitur**|**Deskripsi**|**Sprint**|
| :-: | :-: | :-: | :-: |
|F-18|**Push Notification via Service Worker**|Notifikasi H-1 & H-0 meski browser ditutup. FCM atau Web Push Protocol.|Sprint 5|
|F-19|**Pengingat Kustom**|Pilih waktu pengingat: preset (H-1, H-3, H-7) atau kustom jam. Tersimpan di model Task.|Sprint 5|
|F-20|**Notifikasi via Email**|Email H-1 pukul 08.00 ke email terdaftar. Konten: judul, deadline, link. Opsi opt-out.|Sprint 6|
|F-21|**Log Notifikasi Lengkap**|Halaman riwayat notifikasi: tanggal, jenis (browser/email), judul tugas. Bisa dihapus.|Sprint 6|

## **EP-04 – Organization & Discovery**

|**ID**|**Fitur**|**Deskripsi**|**Sprint**|
| :-: | :-: | :-: | :-: |
|F-22|**Kategori / Mata Kuliah**|Field course di form tugas. Dropdown + tambah baru. Filter & kelola kategori.|Sprint 4|
|F-23|**Pencarian Real-time**|Search box dengan debounce 300ms. Mencari di judul + deskripsi. Tampilkan 'Tidak ditemukan'.|Sprint 4|
|F-24|**Tampilan Kalender Bulanan**|Toggle list/kalender. Titik warna berdasarkan prioritas. Klik tanggal lihat detail.|Sprint 5|
|F-25|**Tag / Label Fleksibel**|Input tag bebas dengan autocomplete. Filter berdasarkan tag. Badge di daftar tugas.|Sprint 6|

## **EP-05 – Productivity & Analytics**

|**ID**|**Fitur**|**Deskripsi**|**Sprint**|
| :-: | :-: | :-: | :-: |
|F-26|**Sub-tugas (Checklist)**|Tambah sub-tugas di form edit. Centang per item. Progress bar % selesai.|Sprint 5|
|F-27|**Tugas Berulang**|Opsi ulang: harian/mingguan/bulanan. Auto-buat tugas baru setelah selesai/overdue. Bisa dihentikan.|Sprint 6|
|F-28|**Statistik Produktivitas**|Grafik batang Chart.js: selesai vs overdue. Filter 7/30/90 hari. Rata-rata waktu penyelesaian.|Sprint 6|
|F-29|**Drag & Drop Urutan**|Drag tugas di daftar untuk ubah urutan manual. SortableJS. Tersimpan di backend.|Sprint 7|

## **EP-06 – UX & Accessibility**

|**ID**|**Fitur**|**Deskripsi**|**Sprint**|
| :-: | :-: | :-: | :-: |
|F-30|**Dark Mode**|Toggle dark/light di navbar. CSS variables. Ikuti prefers-color-scheme sebagai default.|Sprint 4|
|F-31|**Progressive Web App (PWA)**|manifest.json lengkap. Service Worker cache. Prompt install di mobile. Mode offline.|Sprint 5|
|F-32|**Onboarding & Empty State**|Ilustrasi empty state saat tugas kosong. Tooltip one-time fitur utama. CTA 'Tambah Tugas Pertama'.|Sprint 5|
|F-33|**Aksesibilitas Keyboard & Screen Reader**|Tab navigation, Escape untuk tutup modal, ARIA labels, focus trap dalam modal.|Sprint 7|

## **EP-07 – Integrations**

|**ID**|**Fitur**|**Deskripsi**|**Sprint**|
| :-: | :-: | :-: | :-: |
|F-34|**Integrasi Google Calendar**|Tombol 'Tambah ke Google Calendar' di detail tugas. OAuth flow. Buat event dengan judul, deskripsi, deadline.|Sprint 6|
|F-35|**Berbagi Tugas (Kolaborasi Dasar)**|Generate link read-only. Penerima lihat daftar tanpa login. Butuh backend.|Sprint 7|

# **6. Persyaratan Non-Fungsional**

|**Aspek**|**Kriteria v1.0 (MVP)**|**Kriteria v2.0**|
| :-: | :-: | :-: |
|**Kinerja**|Halaman utama < 2 detik|API response < 300ms (P95). Halaman utama < 1.5 detik dengan lazy loading.|
|Keamanan|Tidak ada autentikasi. Data di localStorage.|JWT dengan expiry. HTTPS wajib. Input sanitization. Rate limiting pada API auth.|
|Usabilitas|Responsif (mobile/desktop). Keyboard accessible.|WCAG 2.1 AA. Dark mode. Onboarding flow. Skor Lighthouse UX > 90.|
|Ketersediaan|99% uptime jika di-hosting statis.|99\.5% uptime. Backend di-hosting dengan auto-restart (PM2 atau Docker).|
|Skalabilitas|Single user per browser. localStorage.|Multi-user. MongoDB siap scale. Backend stateless dengan JWT.|
|Pemeliharaan|Kode modular (layered architecture).|Modular + komentar JSDoc. Coverage unit test > 70% untuk business logic.|
|Offline Support|Tidak ada.|PWA Service Worker cache aset + data terakhir. Banner offline jika koneksi terputus.|
|Browser Support|Chrome, Firefox, Safari.|Chrome 90+, Firefox 90+, Safari 14+, Edge 90+. Mobile Chrome & Safari.|

# **7. Arsitektur Sistem v2.0**
## **7.1 Gambaran Umum**
Arsitektur v2.0 mengembangkan Layered Architecture MVP dengan menambahkan backend layer dan cloud storage. Frontend tetap berbasis Vanilla JS namun kini berkomunikasi dengan REST API.

|<p>**PRESENTATION LAYER**</p><p>HTML5 + CSS3 (Tailwind) + Vanilla JS ES6+</p><p>UIController.js  |  Dark Mode  |  PWA Shell  |  Service Worker</p>|||
| :-: | :- | :- |
|<p>**BUSINESS LOGIC LAYER**</p><p>TaskService  |  NotificationService  |  ReminderService  |  AuthService  |  StatsService</p>|||
|<p>**REST API Layer**</p><p>Node.js + Express</p><p>/api/tasks  /api/auth</p>|<p>**Data Layer**</p><p>MongoDB + Mongoose</p><p>TaskRepository (fetch)</p>|<p>**External APIs**</p><p>Google Calendar API</p><p>EmailJS / Nodemailer</p>|

## **7.2 Stack Teknologi**

|**Layer**|**Teknologi**|**Alasan Pemilihan**|
| :-: | :-: | :-: |
|**Frontend**|HTML5, CSS3, Tailwind, Vanilla JS ES6+|Ringan, tanpa build tool rumit, cocok iterasi cepat.|
|PWA|Service Worker, manifest.json|Install di homescreen, offline support, push notifikasi.|
|Backend|Node.js + Express.js|JavaScript full-stack, ekosistem npm luas, cepat prototipe.|
|Database|MongoDB + Mongoose|Skema fleksibel cocok untuk tugas yang atributnya bisa bertambah.|
|Auth|JWT (jsonwebtoken)|Stateless, mudah diimplementasi, aman untuk SPA.|
|Email|EmailJS atau Nodemailer + cron|EmailJS untuk frontend-only, Nodemailer lebih andal untuk server-side.|
|Grafik|Chart.js|Ringan, mudah konfigurasi, cocok untuk dashboard sederhana.|
|Drag & Drop|SortableJS|Library khusus D&D yang ringan, mendukung touch device.|
|Kalender|FullCalendar atau Custom|FullCalendar kaya fitur; custom jika ingin lebih ringan.|
|Deployment|Vercel/Netlify (FE) + Railway/Render (BE)|Gratis tier tersedia, CI/CD otomatis dari GitHub.|

# **8. Model Data v2.0**
Model Task di v2.0 diperluas dari MVP untuk mendukung fitur baru. Perubahan dari v1.0 ditandai dengan 🆕.

|**Field**|**Tipe**|**Wajib**|**Deskripsi**|**Versi**|
| :-: | :-: | :-: | :-: | :-: |
|**id**|String|✅|UUID atau MongoDB ObjectId|v1.0|
|**title**|String|✅|Judul tugas, min 1 karakter|v1.0|
|**description**|String|❌|Deskripsi opsional|v1.0|
|**deadline**|ISO Date|✅|Deadline dalam UTC, tampil di timezone lokal|v1.0|
|**priority**|Enum|✅|'high' | 'medium' | 'low'|v1.0|
|**status**|Enum|✅|'pending' | 'completed'|v1.0|
|**createdAt**|ISO Date|✅|Timestamp dibuat, auto-generated|v1.0|
|**userId**|ObjectId|✅|Referensi ke koleksi User (FK)|**🆕 v2.0**|
|**course**|String|❌|Nama mata kuliah / kategori|**🆕 v2.0**|
|**tags**|String[]|❌|Array tag bebas, misal ['#ujian', '#kelompok']|**🆕 v2.0**|
|**subtasks**|Object[]|❌|[{id, title, completed}] — checklist dalam task|**🆕 v2.0**|
|**recurrence**|Object|❌|{type: 'weekly'|'monthly'|'daily'|null, nextDate}|**🆕 v2.0**|
|**reminder**|Object|❌|{offsetDays: 1, time: '08:00', notified: false}|**🆕 v2.0**|
|**order**|Number|❌|Urutan manual untuk drag & drop|**🆕 v2.0**|
|**updatedAt**|ISO Date|✅|Timestamp terakhir diupdate, auto-managed|**🆕 v2.0**|

# **9. User Flow Utama**
## **9.1 Flow Registrasi & Login (Baru di v2.0)**
1. Pengguna buka aplikasi → jika belum login, redirect ke halaman Login.
1. Klik 'Daftar' → isi email & password → sistem validasi → akun dibuat di MongoDB.
1. Login dengan email & password → backend validasi → return JWT token.
1. Token disimpan di sessionStorage (atau localStorage jika 'Ingat saya' dicentang).
1. Redirect ke dashboard tugas dengan data tugas milik user tersebut.

## **9.2 Flow Membuat Tugas & Mendapat Notifikasi**
1. Pengguna login → dashboard menampilkan daftar tugas dari backend.
1. Klik '+ Tugas Baru' → modal/form terbuka.
1. Isi judul, deskripsi, deadline, prioritas, mata kuliah, dan atur pengingat kustom.
1. Simpan → TaskService validasi deadline → POST /api/tasks → MongoDB tersimpan.
1. Tugas muncul di daftar. Service Worker menjadwalkan push notification.
1. Pada H-1 pukul 08.00, email otomatis terkirim (jika backend aktif) + push notif muncul.

## **9.3 Flow Filter, Pencarian & Kalender**
1. Di daftar tugas, ketik kata kunci di search box → real-time filter (debounce 300ms).
1. Pilih filter mata kuliah dari dropdown → daftar difilter.
1. Toggle ke tampilan kalender → tugas tampil sebagai titik/warna per tanggal.
1. Klik tanggal tertentu → lihat detail semua tugas di hari itu.

## **9.4 Flow Ekspor & Berbagi (Baru di v2.0)**
1. Klik 'Ekspor JSON' → file diunduh berisi semua tugas user.
1. Klik 'Berbagi' pada daftar tugas → sistem generate unique read-only link.
1. Kirim link ke teman → teman buka link tanpa login → lihat daftar (read-only).


# **10. Acceptance Criteria – Sprint 4 (Prioritas Utama)**
Sprint 4 adalah sprint pertama post-MVP. Berikut kriteria penerimaan untuk fitur-fitur Critical dan Tinggi yang harus selesai.

|**ID**|**Fitur**|**Kriteria Penerimaan**|
| :-: | :-: | :-: |
|**AC-14**|**Registrasi**|Pengguna dapat daftar dengan email valid. Email duplikat ditolak dengan pesan jelas.|
|**AC-15**|**Login / Logout**|Login berhasil mengembalikan JWT. Logout menghapus token. Akses tanpa token di-redirect ke login.|
|**AC-16**|**Migrasi Backend**|Semua operasi CRUD tersimpan ke MongoDB, bukan localStorage. Data muncul di perangkat berbeda setelah login.|
|**AC-17**|**Ekspor JSON**|Klik Export → file JSON terunduh berisi semua tugas user dalam format valid.|
|**AC-18**|**Impor JSON**|Upload file JSON → tugas diimpor dan muncul di daftar. Format tidak valid menampilkan pesan error.|
|**AC-19**|**Kategori / Mata Kuliah**|Tugas bisa diberi kategori. Filter by kategori hanya tampilkan tugas kategori tersebut. Bisa tambah kategori baru.|
|**AC-20**|**Pencarian Real-time**|Ketik di search box → daftar berfilter dalam < 350ms. Ketik di judul atau deskripsi keduanya ketemu.|
|**AC-21**|**Dark Mode**|Toggle dark/light berhasil mengubah tema seluruh halaman. Preferensi tersimpan di localStorage. Mengikuti sistem saat pertama buka.|

# **11. Rencana Sprint Post-MVP (Sprint 4–7)**

|**Sprint**|**Durasi**|**Fokus**|**Deliverable Utama**|
| :-: | :-: | :-: | :-: |
|**Sprint 4**|5 hari|Fondasi Post-MVP|<p>• Auth (Register/Login/Logout)</p><p>• REST API + MongoDB migration</p><p>• Export/Import JSON</p><p>• Kategori Mata Kuliah</p><p>• Pencarian Real-time</p><p>• Dark Mode</p>|
|**Sprint 5**|5 hari|Pengalaman & Konektivitas|<p>• Remember Me session</p><p>• Push Notification via Service Worker</p><p>• Pengingat Kustom</p><p>• Tampilan Kalender Bulanan</p><p>• Sub-tugas (Checklist)</p><p>• PWA + Onboarding</p>|
|**Sprint 6**|5 hari|Produktivitas & Integrasi|<p>• Notifikasi Email (H-1)</p><p>• Log Notifikasi Lengkap</p><p>• Tag / Label Fleksibel</p><p>• Recurring Task</p><p>• Statistik Produktivitas (Chart.js)</p><p>• Integrasi Google Calendar</p>|
|**Sprint 7**|4 hari|Polish & UX Lanjutan|<p>• Drag & Drop Urutan Prioritas (SortableJS)</p><p>• Aksesibilitas Keyboard & Screen Reader</p><p>• Berbagi Tugas / Kolaborasi Dasar</p><p>• Bug fixes, polish UI, release v2.0</p>|

📌 *Kapasitas sprint ~34 SP untuk tim kecil 2–3 developer. Velocity aktual akan dikalibrasi setelah Sprint 4 selesai.*

# **12. Batasan & Asumsi v2.0**
## **12.1 Batasan Teknis**
- Backend hanya dihosting di lingkungan Node.js — tidak mendukung serverless function murni (karena cron job notifikasi email).
- Push notification via Service Worker memerlukan HTTPS (tidak bisa di localhost tanpa flag).
- Integrasi Google Calendar memerlukan Google Cloud project aktif dengan OAuth 2.0 credentials.
- Recurring task di-generate secara server-side; jika server mati > 24 jam, task bisa terlewat.
- Drag & drop hanya aktif di mode 'Urutan Manual'; mode sorting otomatis (by deadline/priority) menonaktifkan D&D.

## **12.2 Asumsi**
- Pengguna memiliki akses internet stabil untuk operasi CRUD (PWA cache hanya untuk baca data terakhir).
- Email notifikasi menggunakan alamat yang sama dengan login — satu email per akun.
- Tim pengembang terdiri dari 2–3 developer dengan kapasitas ~34 SP per sprint.
- Deployment backend dilakukan di platform cloud dengan uptime > 99% (Railway, Render, atau VPS).
- Google OAuth consent screen sudah dikonfigurasi di Google Cloud Console sebelum Sprint 6 dimulai.

# **13. Risiko & Mitigasi**

|**Risiko**|**Dampak**|**Mitigasi**|
| :-: | :-: | :-: |
|Migrasi data localStorage ke backend gagal di tengah jalan|**Tinggi**|Buat one-time migration script dengan dry-run mode. Simpan backup JSON sebelum migrasi.|
|Service Worker push notification diblokir browser / OS user|**Sedang**|Fallback ke notifikasi email (H-1). Tampilkan banner in-app jika notif ditolak.|
|JWT token expired saat user sedang aktif|**Sedang**|Implementasi refresh token atau perlihatkan modal 'Sesi habis, login ulang'.|
|Google OAuth flow gagal karena konfigurasi scope salah|**Sedang**|Test OAuth di staging environment. Dokumentasikan setup Google Cloud project.|
|Kapasitas sprint melebihi velocity tim (terlalu banyak 13-SP items)|**Tinggi**|Pecah US-01 dan US-02 menjadi task lebih kecil. Lakukan story splitting sebelum Sprint 4.|
|Cron job email terhenti karena server restart|**Rendah**|Gunakan PM2 cluster mode dengan auto-restart. Atau gunakan managed cron (Railway Cron).|
|Fitur drag & drop tidak berfungsi di touch device|**Rendah**|SortableJS mendukung touch natively. Test di iOS Safari dan Android Chrome.|

# **14. Rencana Ekstensi Post-v2.0 (v3.0+)**
Fitur-fitur berikut berada di luar ruang lingkup v2.0 namun direncanakan untuk iterasi berikutnya:

- Integrasi LMS kampus (Moodle / SIAK) untuk import tugas otomatis dari portal akademik.
- AI Task Prioritization — saran prioritas otomatis berdasarkan pola penyelesaian tugas pengguna.
- Kolaborasi Penuh — anggota kelompok bisa edit dan assign tugas bersama (bukan hanya read-only).
- Notifikasi WhatsApp via Twilio atau WhatsApp Business API — alternatif untuk pengguna yang jarang buka email.
- Gamifikasi (streak, badge, leaderboard) — motivasi mahasiswa menyelesaikan tugas tepat waktu.
- Tema & Kustomisasi UI — pilih warna aksen, font, dan layout sesuai preferensi.


*Smart Task Manager – PRD v2.0  |  Dokumen ini bersifat living document dan akan diperbarui setiap Sprint Planning.*
Halaman  dari 
