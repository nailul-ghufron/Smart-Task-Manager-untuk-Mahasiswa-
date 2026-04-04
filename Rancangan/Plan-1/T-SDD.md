# 📐 TDD – Smart Task Manager

| **Dokumen** | Technical Design Document v1.0 |
| --- | --- |
| **Target Platform** | Web (Desktop & Mobile responsive) |
| **Arsitektur** | Layered Architecture (Presentation – Business Logic – Data) |
| **Pendekatan** | Agile (3 Sprint) + Waterfall (struktur awal) |
| **Storage** | LocalStorage (MVP), siap migrasi ke backend REST API |

---

## 1. Teknologi yang Digunakan

| Layer | Teknologi | Alasan |
|-------|-----------|--------|
| **Presentation** | HTML5, CSS3 (Tailwind CSS), Vanilla JavaScript (ES6+) | Ringan, tanpa build tools rumit, cocok untuk pembelajaran & cepat iterasi |
| **Business Logic** | Vanilla JS modules (Services) | Memisahkan logika dari UI, mudah di-test |
| **Data Layer** | LocalStorage API + Repository pattern | Sederhana, persistensi di browser, bisa diganti dengan fetch nanti |
| **Notifikasi** | Browser Notification API + interval checker | Mendukung reminder meskipun tab tidak aktif (perlu izin) |
| **State Management** | Plain JS object + event emitter sederhana | Tidak perlu Redux/Vuex, cukup untuk skala MVP |
| **Date Handling** | `date-fns` (opsional) atau native `Intl.DateTimeFormat` | Menghindari bug timezone, lebih mudah baca sisa waktu |

---

## 2. Struktur Folder (Modular)

```
smart-task-manager/
│
├── index.html              # Halaman utama
├── style.css               # Tailwind / custom CSS
│
├── js/
│   ├── app.js              # Inisialisasi, koordinasi modul
│   ├── models/
│   │   └── Task.js         # Class Task (id, title, desc, deadline, priority, status)
│   ├── repositories/
│   │   └── TaskRepository.js  # CRUD ke localStorage
│   ├── services/
│   │   ├── TaskService.js     # Business logic: validasi, filter, sort
│   │   ├── NotificationService.js  # Izin, kirim notif, cek deadline
│   │   └── ReminderService.js      # Interval checker, trigger notif
│   ├── controllers/
│   │   └── UIController.js  # Render daftar tugas, handle event (tombol, form)
│   └── utils/
│       ├── dateHelper.js    # format tanggal, hitung sisa waktu
│       └── eventBus.js      # simple pub/sub antar modul
│
└── assets/                  # (opsional) icon, gambar
```

---

## 3. Model Data (Task)

```javascript
// models/Task.js
class Task {
  constructor({ id, title, description, deadline, priority, status }) {
    this.id = id || Date.now().toString();   // simple unique ID
    this.title = title;
    this.description = description || "";
    this.deadline = deadline;                 // ISO string "2025-05-20T23:59"
    this.priority = priority;                // "high", "medium", "low"
    this.status = status || "pending";       // "pending" or "completed"
    this.createdAt = new Date().toISOString();
  }
}
```

**Contoh data di localStorage**:
```json
{
  "tasks": [
    {
      "id": "1743612345678",
      "title": "Tugas AI",
      "description": "Buat model NLP",
      "deadline": "2025-05-20T23:59:00.000Z",
      "priority": "high",
      "status": "pending",
      "createdAt": "2025-04-01T10:00:00.000Z"
    }
  ]
}
```

---

## 4. Repository Pattern (Data Layer)

**TaskRepository.js** – bertanggung jawab membaca/menulis ke localStorage.

```javascript
const STORAGE_KEY = "smart_tasks";

class TaskRepository {
  getAll() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }
  save(tasks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }
  add(task) {
    const tasks = this.getAll();
    tasks.push(task);
    this.save(tasks);
  }
  update(id, updatedTask) {
    const tasks = this.getAll();
    const index = tasks.findIndex(t => t.id === id);
    if (index !== -1) tasks[index] = updatedTask;
    this.save(tasks);
  }
  delete(id) {
    const tasks = this.getAll().filter(t => t.id !== id);
    this.save(tasks);
  }
}
```

---

## 5. Business Logic Layer (Services)

### 5.1 TaskService.js
- **Fungsi**:
  - `addTask(taskData)` – validasi deadline tidak kurang dari hari ini.
  - `editTask(id, newData)`
  - `deleteTask(id)`
  - `toggleStatus(id)`
  - `filterTasks(tasks, { priority, status, deadlineRange })`
  - `sortByDeadline(tasks)` – ascending

### 5.2 NotificationService.js
- `requestPermission()` – meminta izin notifikasi browser.
- `sendNotification(title, body)` – menampilkan notifikasi.
- `checkReminders(tasks)` – membandingkan deadline dengan hari ini dan besok, jika belum dikirim, panggil `sendNotification` dan catat log ke `localStorage` key `"notification_log"`.

**Logika reminder**:
- H-1 (deadline - 24 jam) → notifikasi "Besok deadline: {judul}"
- H-0 (deadline <= sekarang) → notifikasi "Hari ini deadline: {judul}"

### 5.3 ReminderService.js
- `startReminderChecker(intervalMinutes = 60)` – setiap interval, ambil semua tugas, filter `status = "pending"`, lalu panggil `NotificationService.checkReminders()`.
- Simpan timestamp terakhir cek untuk menghindari notifikasi ganda.

---

## 6. Presentation Layer (UI)

### 6.1 Komponen Utama (di index.html)

```html
<div class="container">
  <div class="header">
    <h1>📚 Smart Task Manager</h1>
    <button id="newTaskBtn">+ Tugas Baru</button>
  </div>
  
  <div class="filters">
    <select id="filterPriority">
      <option value="all">Semua Prioritas</option>
      <option value="high">Tinggi</option>
      <option value="medium">Sedang</option>
      <option value="low">Rendah</option>
    </select>
    <select id="filterStatus">
      <option value="all">Semua Status</option>
      <option value="pending">Belum Selesai</option>
      <option value="completed">Selesai</option>
    </select>
    <select id="filterDeadline">
      <option value="all">Semua Deadline</option>
      <option value="week">Minggu ini</option>
      <option value="month">Bulan ini</option>
      <option value="overdue">Overdue</option>
    </select>
  </div>
  
  <div id="taskList" class="task-list"></div>
</div>

<!-- Modal form tambah/edit -->
<div id="taskModal" class="modal hidden">...</div>
```

### 6.2 UIController.js
- Render daftar tugas menggunakan `TaskService.filter()` dan `TaskService.sort()`.
- Event listener untuk tombol tambah, edit, hapus, ubah status.
- Setiap perubahan data → panggil `render()`.
- Saat halaman dimuat, panggil `ReminderService.startReminderChecker()`.

**Render row contoh**:
```html
<div class="task-item priority-high">
  <input type="checkbox" data-id="123" ${task.status === 'completed' ? 'checked' : ''}>
  <span class="title">${task.title}</span>
  <span class="deadline">${dateHelper.remainingTime(task.deadline)}</span>
  <span class="priority">${task.priority}</span>
  <button class="editBtn" data-id="123">✏️</button>
  <button class="deleteBtn" data-id="123">🗑️</button>
</div>
```

---

## 7. Notifikasi & Reminder – Detail Teknis

### 7.1 Izin Notifikasi
Pada `app.js` setelah halaman dimuat:
```javascript
if (Notification.permission !== "granted") {
  Notification.requestPermission();
}
```

### 7.2 Cek Deadline
```javascript
// ReminderService.js
function checkAndNotify(tasks) {
  const now = new Date();
  const notifiedIds = getNotifiedIdsFromLog(); // baca dari localStorage

  tasks.forEach(task => {
    if (task.status === "completed") return;
    const deadlineDate = new Date(task.deadline);
    const diffDays = Math.ceil((deadlineDate - now) / (1000 * 60 * 60 * 24));
    
    if ((diffDays === 1 || diffDays === 0) && !notifiedIds.includes(task.id)) {
      NotificationService.sendNotification(
        "Pengingat Tugas",
        `"${task.title}" ${diffDays === 1 ? "besok" : "hari ini"} deadline!`
      );
      addToNotifiedLog(task.id);
    }
  });
}
```

> **Catatan**: Notifikasi hanya muncul jika web masih terbuka. Untuk push notifikasi saat browser tertutup, perlu Service Worker (tambahan di Sprint 3 jika waktu memungkinkan).

---

## 8. Filter & Sorting – Algoritma

### 8.1 Filter berdasarkan prioritas
```javascript
if (priority !== "all") {
  filtered = filtered.filter(t => t.priority === priority);
}
```

### 8.2 Filter deadline range
- **Minggu ini**: deadline antara `startOfWeek(now)` dan `endOfWeek(now)`
- **Bulan ini**: bulan & tahun sama dengan `now`
- **Overdue**: deadline < `now` dan status belum selesai

### 8.3 Sorting
- Default: berdasarkan deadline terdekat (ascending)
- Bisa juga sortir berdasarkan prioritas (high > medium > low)

---

## 9. Alur Data (Sequence) – Membuat Tugas Baru

```
User klik "Tugas Baru"
  → UIController buka modal
User isi form & submit
  → UIController ambil data
  → panggil TaskService.addTask(data)
      → validasi deadline
      → buat instance Task
      → TaskRepository.add(task)
  → eventBus.emit('tasks-updated')
  → UIController.render() refresh daftar
```

---

## 10. Pengujian (Testing Strategy) – Manual & Otomatis

| Tingkat | Metode | Tools |
|---------|--------|-------|
| Unit | Test fungsi validasi deadline, filter, sort | Jest (opsional) atau manual dengan console.assert |
| Integration | Test interaksi antara TaskService dan Repository | Mock localStorage |
| E2E | Skenario utama: buat tugas, tandai selesai, terima notifikasi | Playwright atau manual test plan |

**Test plan manual (untuk Sprint Review)**:
1. Buat tugas dengan deadline besok → pastikan notifikasi muncul saat halaman di-reload.
2. Filter prioritas "Tinggi" → hanya menampilkan tugas dengan priority=high.
3. Edit deadline ke masa lalu → validasi gagal (tidak boleh save).

---

## 11. Deployment & Environment

- **Development**: Live server VS Code atau file:// langsung (karena localStorage tetap bekerja)
- **Production**: Hosting statis (Netlify, Vercel, GitHub Pages) – cukup upload folder

---

## 12. Risiko Teknis & Mitigasi

| Risiko | Mitigasi |
|--------|-----------|
| Timezone berbeda antar pengguna | Simpan deadline dalam UTC, tampilkan dalam lokal pengguna menggunakan `new Date(deadline).toLocaleString()` |
| Notifikasi tidak muncul karena browser blokir | Tampilkan pesan dalam aplikasi: "Izinkan notifikasi untuk pengingat otomatis" |
| Data localStorage penuh (tidak mungkin untuk teks kecil) | Batasi maksimal 500 tugas, beri peringatan jika mencapai batas |
| Bug pada interval reminder (notif berulang) | Gunakan flag `lastNotified` per task yang disimpan di log, reset saat edit deadline |

---

## 13. Rencana Ekstensi (Setelah MVP)

- **Backend API** (Node.js + Express + MongoDB) – mengganti repository dengan fetch.
- **Autentikasi** (Login via email) – setiap user punya task sendiri.
- **Kategori Mata Kuliah** – filter tambahan.
- **Ekspor/Impor** data ke JSON.
