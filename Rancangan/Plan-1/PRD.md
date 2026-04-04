# 📄 PRD – Smart Task Manager (untuk Mahasiswa)

| **Proyek** | Smart Task Manager |
| --- | --- |
| **Versi** | 1.0 |
| **Target Pengguna** | Mahasiswa aktif |
| **Pendekatan Pengembangan** | Hybrid (Waterfall untuk struktur awal + Agile/Sprint untuk eksekusi) |
| **Arsitektur** | Layered Architecture (Presentation, Business Logic, Data) |

---

## 1. Tujuan Produk
Membantu mahasiswa mengelola tugas kuliah secara efektif dengan prioritas, deadline, dan notifikasi, sehingga mengurangi risiko lupa atau mepet deadline.

## 2. Ruang Lingkup
Aplikasi web yang memungkinkan pengguna untuk:
- Membuat, membaca, memperbarui, menghapus tugas (**CRUD**).
- Menetapkan **deadline** (tanggal & waktu).
- Menentukan **prioritas** (Tinggi, Sedang, Rendah).
- Menerima **notifikasi** (dalam aplikasi dan/atau email/browser).
- **Memfilter** tugas berdasarkan status, prioritas, atau rentang deadline.
- **Melihat pengingat** otomatis (reminder) H-1 dan H-0.

---

## 3. Pengguna & Peran

| Role | Deskripsi |
| --- | --- |
| Mahasiswa | Satu-satunya aktor. Dapat mengelola tugas miliknya sendiri. Tidak ada multi-user (fase awal). |

---

## 4. Persyaratan Fungsional

### Sprint 1 – CRUD Tugas
| ID | Fitur | Deskripsi |
|----|-------|------------|
| F-01 | Buat Tugas | Form: judul (wajib), deskripsi (opsional), deadline, prioritas. |
| F-02 | Lihat Daftar Tugas | Tabel/list menampilkan judul, deadline, prioritas, status (Belum/Selesai). |
| F-03 | Edit Tugas | Ubah semua field, termasuk deadline & prioritas. |
| F-04 | Hapus Tugas | Konfirmasi sebelum hapus. |
| F-05 | Tandai Selesai | Checklist untuk mengubah status menjadi "Selesai". |

### Sprint 2 – Deadline & Reminder
| ID | Fitur | Deskripsi |
|----|-------|------------|
| F-06 | Validasi Deadline | Tidak boleh kurang dari tanggal sekarang (kecuali edit). |
| F-07 | Tampilkan Sisa Waktu | “2 hari lagi”, “besok”, “hari ini”. |
| F-08 | Reminder Otomatis | Notifikasi browser (jika izin) atau popup in-app saat halaman dibuka. Pengingat H-1 dan H-0 (pukul 08.00). |
| F-09 | Log Notifikasi | Riwayat notifikasi yang sudah dikirim. |

### Sprint 3 – Filter & Prioritas
| ID | Fitur | Deskripsi |
|----|-------|------------|
| F-10 | Filter Berdasarkan Prioritas | Pilihan: Semua, Tinggi, Sedang, Rendah. |
| F-11 | Filter Berdasarkan Status | Belum Selesai / Selesai. |
| F-12 | Filter Berdasarkan Deadline | Minggu ini, bulan ini, overdue. |
| F-13 | Urutkan | Berdasarkan deadline terdekat atau prioritas. |

---

## 5. Persyaratan Non-Fungsional

| Aspek | Kriteria |
|-------|-----------|
| Kinerja | Halaman utama < 2 detik. |
| Keamanan | Tidak ada autentikasi di MVP, namun data disimpan di localStorage (client-side) atau mock API. Untuk pengembangan lanjut, gunakan JWT. |
| Usabilitas | Responsif (mobile/desktop), aksesibel dengan keyboard. |
| Ketersediaan | 99% uptime jika di‑hosting. |
| Pemeliharaan | Kode modular (layered architecture). |

---

## 6. Arsitektur Sederhana (Layered)

```
┌─────────────────────────────────┐
│      Presentation Layer         │  → HTML/CSS/JS (Vue/React/vanilla)
│   (UI, komponen, event handler)  │
└───────────────┬─────────────────┘
                │
┌───────────────▼─────────────────┐
│      Business Logic Layer       │  → Manajemen state, validasi deadline,
│   (services, use cases)          │    filter, prioritas, notifikasi trigger
└───────────────┬─────────────────┘
                │
┌───────────────▼─────────────────┐
│         Data Layer              │  → Repository pattern (localStorage / IndexedDB
│   (storage, API mock)            │    atau fetch ke backend sederhana)
└─────────────────────────────────┘
```

**Contoh teknologi (ringan untuk pemula):**  
- Frontend: HTML, CSS, JavaScript (Vanilla) + Tailwind/Bootstrap  
- State: Plain JS object atau Vue 3 Composition API  
- Storage: localStorage (untuk MVP)  
- Notifikasi: Notification API + setInterval untuk cek deadline

---

## 7. User Flow Utama

### Flow Membuat Tugas & Mendapat Notifikasi
1. Pengguna masuk ke halaman utama → melihat daftar tugas kosong.
2. Klik tombol **“Tugas Baru”** → muncul modal/form.
3. Isi judul, deskripsi, deadline, prioritas → simpan.
4. Tugas muncul di daftar dengan warna prioritas (merah=tinggi, kuning=sedang, hijau=rendah).
5. Setiap kali halaman dimuat atau setiap 1 jam, sistem memeriksa deadline yang mendekat (H-1 atau H-0) → menampilkan notifikasi browser dan menyimpan log.

### Flow Filter & Prioritas
1. Pada daftar tugas, pilih dropdown **Prioritas** → “Tinggi”.
2. Tabel hanya menampilkan tugas prioritas tinggi.
3. Tambahkan filter “Overdue” → melihat tugas yang lewat deadline.

---

## 8. Batasan & Asumsi MVP
- **Tidak ada backend** → semua data disimpan di localStorage (data hilang jika ganti perangkat/browser).
- **Tidak ada autentikasi** → hanya satu pengguna per browser.
- **Notifikasi** hanya bekerja jika pengguna memberikan izin dan halaman web terbuka (tidak bisa push saat browser tertutup kecuali menggunakan service worker – bisa ditambahkan di Sprint 3+).
- **Deadline** menggunakan zona waktu lokal browser.

---

## 9. Kriteria Penerimaan (Acceptance Criteria) – Contoh untuk Sprint 1

| ID | Kriteria |
|----|-----------|
| AC-01 | Pengguna dapat membuat tugas dengan judul minimal 1 karakter. |
| AC-02 | Tugas yang baru dibuat langsung muncul di daftar tanpa refresh halaman. |
| AC-03 | Pengguna dapat mengedit deadline dan prioritas, lalu perubahannya tersimpan. |
| AC-04 | Pengguna dapat menghapus tugas dan muncul konfirmasi “Yakin hapus?”. |
| AC-05 | Setelah menandai “Selesai”, tugas tidak muncul di filter “Belum Selesai”. |

---

## 10. Rencana Sprint (Hybrid)

| Sprint | Durasi | Fokus | Deliverable |
|--------|--------|-------|--------------|
| Sprint 1 | 5 hari | CRUD + tampilan dasar | Semua fungsi CRUD, UI responsif sederhana, data localStorage. |
| Sprint 2 | 4 hari | Deadline visual + reminder | Hitung mundur, notifikasi browser, log notifikasi. |
| Sprint 3 | 3 hari | Filter & prioritas | Filter kombinasi, sorting, perbaikan bug, polish UI. |

Setiap sprint diakhiri dengan **review** dan **retrospective** (gaya Agile). Dokumentasi tetap dijaga (Waterfall untuk arsitektur awal).

---

## 11. Mockup Sederhana (Deskripsi)

```
+-------------------------------------------------+
|  SMART TASK MANAGER            [+ Tugas Baru]  |
+-------------------------------------------------+
| Filter: [Prioritas ▼] [Status ▼] [Deadline ▼]  |
+-------------------------------------------------+
| ✅ | Tugas AI        | 20 Mei 2025 | Tinggi | ⚠️ |
| ☐ | Makalah Pancasila| Besok       | Sedang |    |
| ☐ | UTS Matematika   | Overdue     | Tinggi | 🔴 |
+-------------------------------------------------+
| Notifikasi: "Tugas AI deadline besok!" (toast)  |
+-------------------------------------------------+
```

---

## 12. Risiko & Mitigasi

| Risiko | Dampak | Mitigasi |
|--------|--------|-----------|
| Notifikasi tidak muncul karena izin ditolak | Pengguna tidak ingat deadline | Tampilkan banner pengingat di dalam aplikasi. |
| Data localStorage hilang | Kehilangan tugas | Sediakan tombol export/import JSON (fitur tambahan). |
| Deadline tidak valid (masa lalu) | Kebingungan | Validasi frontend: tidak boleh pilih tanggal < hari ini. |
