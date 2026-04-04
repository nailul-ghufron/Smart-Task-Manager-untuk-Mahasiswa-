Smart Task Manager  |  TDD v2.0

**📐 TECHNICAL DESIGN DOCUMENT**

Smart Task Manager – Post-MVP Enhancement

Versi 2.0  |  April 2026

|**Atribut**|**Keterangan**|
| :-: | :-: |
|**Dokumen**|Technical Design Document v2.0|
|**Versi Sebelumnya**|TDD v1.0 (MVP – Sprint 1–3)|
|**Target Platform**|Web (Desktop & Mobile responsive) + PWA|
|**Arsitektur**|Layered Architecture (Presentation – Business Logic – Data) + REST API Backend|
|**Pendekatan**|Agile Sprint 4–7 (Post-MVP)|
|**Storage**|MongoDB (cloud) + LocalStorage (PWA cache fallback)|
|**Autentikasi**|JWT (JSON Web Token)|
|**Dibuat**|April 2026|

# **1. Ringkasan Perubahan dari TDD v1.0**
TDD v2.0 ini merupakan ekstensi komprehensif dari TDD v1.0 (MVP). Perubahan utama:

- Backend Layer baru: Node.js + Express REST API menggantikan localStorage sebagai sumber data utama.
- Autentikasi JWT: setiap request ke API memerlukan token yang valid.
- Model Task diperluas: 8 field baru (userId, course, tags, subtasks, recurrence, reminder, order, updatedAt).
- Service Worker & Push Notification: notifikasi andal meski browser tertutup.
- Struktur folder diperbarui: ditambahkan folder backend/, models/mongoose/, middleware/, dan routes/.
- Strategi testing diperluas: unit test dengan Jest, integration test dengan Supertest, dan E2E dengan Playwright.
- Deployment strategy: dua service terpisah — frontend (Vercel/Netlify) dan backend (Railway/Render).

# **2. Teknologi yang Digunakan**

|**Layer**|**Teknologi**|**Versi / Paket npm**|**Alasan**|
| :-: | :-: | :-: | :-: |
|**Presentation**|HTML5, CSS3 (Tailwind CSS v3)|CDN|Ringan, utility-first, dark mode ready|
|**Presentation**|Vanilla JavaScript ES6+ (modules)|Native|Tanpa build tool, iterasi cepat|
|**PWA**|Service Worker API|Native browser|Push notif + offline cache|
|**PWA**|Web App Manifest|manifest.json|Install di homescreen|
|**Business Logic**|Vanilla JS Modules (Services)|Native|Separation of concerns, mudah di-test|
|**Backend Runtime**|Node.js|v20 LTS|JS full-stack, ekosistem npm luas|
|**Backend Framework**|Express.js|^4.18|Minimal, fleksibel, banyak middleware|
|**Database**|MongoDB + Mongoose|^8.x|Schema fleksibel, relasi userId→tasks|
|**Autentikasi**|jsonwebtoken|^9.x|JWT stateless, aman untuk SPA|
|**Password Hashing**|bcryptjs|^2.4|Hashing aman, tidak perlu native addon|
|**Email Notif**|Nodemailer|^6.x|Server-side email, andal untuk cron|
|**Cron Job**|node-cron|^3.x|Jadwalkan email notifikasi setiap hari|
|**Grafik**|Chart.js|^4.x|Ringan, mudah konfigurasi, Canvas-based|
|**Drag & Drop**|SortableJS|^1.15|Touch-friendly, mendukung animasi|
|**Kalender**|FullCalendar (opsional)|^6.x|Tampilan kalender bulanan kaya fitur|
|**Date Handling**|date-fns|^3.x|Immutable, tree-shakeable, timezone aman|
|**Testing Unit**|Jest|^29.x|Standard de-facto JS unit testing|
|**Testing API**|Supertest|^6.x|HTTP assertion untuk Express routes|
|**Testing E2E**|Playwright|^1.x|Cross-browser E2E automation|
|**Process Manager**|PM2|^5.x|Auto-restart, cluster mode untuk backend|

# **3. Struktur Folder v2.0 (Full-Stack)**
Proyek dibagi menjadi dua sub-folder utama: frontend/ (statis, deployable ke CDN) dan backend/ (Node.js server).

## **3.1 Frontend**

|<p>smart-task-manager/</p><p>├── frontend/</p><p>│   ├── index.html                 # Shell halaman utama (auth-guard)</p><p>│   ├── login.html                 # Halaman login & register</p><p>│   ├── style.css                  # Tailwind CSS custom</p><p>│   ├── manifest.json              # PWA manifest</p><p>│   ├── sw.js                      # Service Worker (push notif + cache)</p><p>│   │</p><p>│   └── js/</p><p>│       ├── app.js                 # Entry point: init modul, auth check</p><p>│       ├── models/</p><p>│       │   └── Task.js            # Class Task (client-side, mapping API response)</p><p>│       ├── repositories/</p><p>│       │   └── TaskRepository.js  # Fetch ke /api/tasks (bukan localStorage)</p><p>│       ├── services/</p><p>│       │   ├── TaskService.js     # Business logic: validasi, filter, sort</p><p>│       │   ├── AuthService.js     # Login, register, logout, token management</p><p>│       │   ├── NotificationService.js  # Request izin, kirim browser notif</p><p>│       │   ├── ReminderService.js      # Cek deadline, trigger Service Worker</p><p>│       │   └── StatsService.js         # Hitung statistik produktivitas</p><p>│       ├── controllers/</p><p>│       │   ├── UIController.js    # Render tugas, handle events</p><p>│       │   ├── AuthController.js  # Render form login/register, handle submit</p><p>│       │   └── StatsController.js # Render grafik Chart.js</p><p>│       └── utils/</p><p>│           ├── dateHelper.js      # Format tanggal, hitung sisa waktu</p><p>│           ├── eventBus.js        # Simple pub/sub antar modul</p><p>│           └── api.js             # Wrapper fetch: base URL, headers, JWT inject</p>|
| :- |

## **3.2 Backend**

|<p>smart-task-manager/</p><p>└── backend/</p><p>`    `├── server.js                  # Entry point Express app</p><p>`    `├── .env                       # Environment variables (tidak di-commit)</p><p>`    `├── package.json</p><p>`    `│</p><p>`    `├── config/</p><p>`    `│   └── db.js                  # Koneksi MongoDB via Mongoose</p><p>`    `│</p><p>`    `├── models/</p><p>`    `│   ├── User.js                # Mongoose schema: User</p><p>`    `│   └── Task.js                # Mongoose schema: Task (diperluas v2.0)</p><p>`    `│</p><p>`    `├── routes/</p><p>`    `│   ├── auth.js                # POST /api/auth/register, /api/auth/login</p><p>`    `│   └── tasks.js               # CRUD /api/tasks, /api/tasks/:id</p><p>`    `│</p><p>`    `├── middleware/</p><p>`    `│   ├── auth.js                # Verify JWT middleware</p><p>`    `│   └── errorHandler.js        # Global error handler</p><p>`    `│</p><p>`    `├── services/</p><p>`    `│   └── emailService.js        # Nodemailer: kirim email reminder</p><p>`    `│</p><p>`    `└── jobs/</p><p>`        `└── reminderJob.js         # node-cron: scan pending tasks setiap hari 07.30</p>|
| :- |

# **4. Model Data v2.0**
## **4.1 Mongoose Schema – Task**
Field yang ditambahkan di v2.0 ditandai dengan komentar // NEW.

|<p>// backend/models/Task.js</p><p>const mongoose = require('mongoose');</p><p></p><p>const subtaskSchema = new mongoose.Schema({</p><p>`  `id:        { type: String, default: () => new mongoose.Types.ObjectId().toString() },</p><p>`  `title:     { type: String, required: true },</p><p>`  `completed: { type: Boolean, default: false },</p><p>});</p><p></p><p>const taskSchema = new mongoose.Schema({</p><p>`  `userId:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // NEW</p><p>`  `title:       { type: String, required: true, trim: true, minlength: 1 },</p><p>`  `description: { type: String, default: '' },</p><p>`  `deadline:    { type: Date, required: true },</p><p>`  `priority:    { type: String, enum: ['high', 'medium', 'low'], default: 'medium' },</p><p>`  `status:      { type: String, enum: ['pending', 'completed'], default: 'pending' },</p><p>`  `course:      { type: String, default: '' },                // NEW – Mata Kuliah</p><p>`  `tags:        [{ type: String }],                           // NEW – Tag bebas</p><p>`  `subtasks:    [subtaskSchema],                              // NEW – Checklist</p><p>`  `recurrence:  {                                             // NEW – Tugas berulang</p><p>`    `type:     { type: String, enum: ['none','daily','weekly','monthly'], default: 'none' },</p><p>`    `nextDate: { type: Date },</p><p>`  `},</p><p>`  `reminder: {                                                // NEW – Pengingat kustom</p><p>`    `offsetDays: { type: Number, default: 1 },</p><p>`    `time:       { type: String, default: '08:00' },</p><p>`    `notified:   { type: Boolean, default: false },</p><p>`  `},</p><p>`  `order:       { type: Number, default: 0 },                 // NEW – Drag & drop order</p><p>}, { timestamps: true });  // createdAt & updatedAt auto-managed</p><p></p><p>module.exports = mongoose.model('Task', taskSchema);</p>|
| :- |

## **4.2 Mongoose Schema – User**

|<p>// backend/models/User.js</p><p>const mongoose = require('mongoose');</p><p>const bcrypt   = require('bcryptjs');</p><p></p><p>const userSchema = new mongoose.Schema({</p><p>`  `email:        { type: String, required: true, unique: true, lowercase: true, trim: true },</p><p>`  `passwordHash: { type: String, required: true },</p><p>`  `name:         { type: String, default: '' },</p><p>`  `preferences: {</p><p>`    `darkMode:         { type: Boolean, default: false },</p><p>`    `emailNotif:       { type: Boolean, default: true },</p><p>`    `reminderDefault:  { type: Number, default: 1 },   // hari sebelum deadline</p><p>`  `},</p><p>}, { timestamps: true });</p><p></p><p>// Hash password sebelum simpan</p><p>userSchema.pre('save', async function (next) {</p><p>`  `if (!this.isModified('passwordHash')) return next();</p><p>`  `this.passwordHash = await bcrypt.hash(this.passwordHash, 12);</p><p>`  `next();</p><p>});</p><p></p><p>userSchema.methods.comparePassword = function (plain) {</p><p>`  `return bcrypt.compare(plain, this.passwordHash);</p><p>};</p><p></p><p>module.exports = mongoose.model('User', userSchema);</p>|
| :- |

## **4.3 Contoh Dokumen MongoDB**

|<p>{</p><p>`  `"\_id": "664a1b2c3d4e5f6789abcdef",</p><p>`  `"userId": "664a0000000000000000cafe",</p><p>`  `"title": "Tugas AI – Buat Model NLP",</p><p>`  `"description": "Implementasi sentiment analysis dengan BERT",</p><p>`  `"deadline": "2026-05-20T16:00:00.000Z",</p><p>`  `"priority": "high",</p><p>`  `"status": "pending",</p><p>`  `"course": "Kecerdasan Buatan",</p><p>`  `"tags": ["#ujian", "#kelompok"],</p><p>`  `"subtasks": [</p><p>`    `{ "id": "sub1", "title": "Kumpulkan dataset", "completed": true },</p><p>`    `{ "id": "sub2", "title": "Training model", "completed": false }</p><p>`  `],</p><p>`  `"recurrence": { "type": "none", "nextDate": null },</p><p>`  `"reminder": { "offsetDays": 2, "time": "18:00", "notified": false },</p><p>`  `"order": 3,</p><p>`  `"createdAt": "2026-04-01T10:00:00.000Z",</p><p>`  `"updatedAt": "2026-04-15T08:30:00.000Z"</p><p>}</p>|
| :- |

# **5. REST API Design**
Semua endpoint yang memerlukan autentikasi harus menyertakan header: Authorization: Bearer <JWT\_TOKEN>

## **5.1 Auth Endpoints**

|**Method**|**Endpoint**|**Body / Params**|**Response**|
| :-: | :-: | :-: | :-: |
|**POST**|/api/auth/register|{ email, password, name }|201: { user, token } | 400: validation error | 409: email exists|
|**POST**|/api/auth/login|{ email, password }|200: { user, token } | 401: invalid credentials|
|**GET**|/api/auth/me|Header: Authorization|200: { user } | 401: unauthorized|
|**PATCH**|/api/auth/preferences|{ darkMode?, emailNotif?, reminderDefault? }|200: { preferences }|

## **5.2 Task Endpoints (semua memerlukan JWT)**

|**Method**|**Endpoint**|**Query / Body**|**Response**|
| :-: | :-: | :-: | :-: |
|**GET**|/api/tasks|?status=&priority=&course=&search=&sort=|200: { tasks: [...] }|
|**POST**|/api/tasks|{ title, deadline, priority, course?, tags?, subtasks?, recurrence?, reminder? }|201: { task }|
|**GET**|/api/tasks/:id|–|200: { task } | 404: not found|
|**PUT**|/api/tasks/:id|Semua field task (partial update ok)|200: { task }|
|**DELETE**|/api/tasks/:id|–|200: { message: 'deleted' }|
|**PATCH**|/api/tasks/:id/status|{ status: 'completed' | 'pending' }|200: { task }|
|**PATCH**|/api/tasks/:id/order|{ order: number }|200: { task }|
|**POST**|/api/tasks/import|{ tasks: [...] }  (JSON import)|201: { imported: N }|
|**GET**|/api/tasks/export|–|200: JSON file download|
|**GET**|/api/tasks/stats|?range=7|30|90|200: { completed, overdue, avgDays, weekly: [...] }|
|**POST**|/api/tasks/:id/share|–|200: { shareUrl }|
|**GET**|/api/shared/:token|–  (no auth required)|200: { tasks: [...] }  (read-only)|

# **6. Business Logic Layer – Services**
## **6.1 AuthService.js (Frontend)**
Mengelola siklus autentikasi di sisi klien:

- register(email, password, name) – POST ke /api/auth/register, simpan token.
- login(email, password, remember) – POST ke /api/auth/login, simpan token ke sessionStorage atau localStorage.
- logout() – Hapus token, redirect ke login.html.
- getToken() – Ambil token dari storage yang sesuai.
- isLoggedIn() – Cek apakah token valid (ada & belum expired berdasarkan exp claim).
- getMe() – GET /api/auth/me untuk mendapatkan data user aktif.

|<p>// utils/api.js – Wrapper fetch dengan JWT inject otomatis</p><p>const BASE = import.meta?.env?.VITE\_API\_URL || 'https://api.smarttask.app';</p><p></p><p>export async function apiFetch(path, options = {}) {</p><p>`  `const token = AuthService.getToken();</p><p>`  `const headers = { 'Content-Type': 'application/json', ...options.headers };</p><p>`  `if (token) headers['Authorization'] = `Bearer ${token}`;</p><p>`  `const res = await fetch(`${BASE}${path}`, { ...options, headers });</p><p>`  `if (res.status === 401) { AuthService.logout(); return; }</p><p>`  `if (!res.ok) throw await res.json();</p><p>`  `return res.json();</p><p>}</p>|
| :- |

## **6.2 TaskService.js (Frontend)**
- addTask(data) – Validasi: deadline >= hari ini. POST via apiFetch.
- editTask(id, data) – Validasi: deadline tidak boleh masa lalu kecuali recurring. PUT via apiFetch.
- deleteTask(id) – Konfirmasi, DELETE via apiFetch.
- toggleStatus(id) – PATCH /api/tasks/:id/status. Jika completed & recurrence aktif, trigger createRecurringNext().
- createRecurringNext(task) – Hitung nextDate berdasarkan recurrence.type, POST task baru.
- filterTasks(tasks, { priority, status, course, search, deadlineRange }) – Filter client-side dari cache.
- sortTasks(tasks, by) – 'deadline' (asc) | 'priority' | 'manual' (by order field).
- updateOrder(ids) – PATCH /api/tasks/:id/order untuk setiap item setelah drag & drop.

## **6.3 NotificationService.js (Frontend)**
- requestPermission() – Meminta izin notifikasi browser. Tampilkan banner jika ditolak.
- sendNotification(title, body, icon) – Tampilkan browser notification.
- scheduleViaServiceWorker(task) – Kirim pesan ke Service Worker untuk jadwalkan reminder.
- checkReminders(tasks) – Bandingkan deadline vs sekarang. Trigger notif untuk H-0 dan H-reminder.offsetDays.

## **6.4 StatsService.js (Frontend)**
- fetchStats(range) – GET /api/tasks/stats?range=7|30|90.
- buildWeeklyChart(data) – Format data untuk Chart.js BarChart (completed vs overdue per minggu).
- calcAvgCompletionDays(tasks) – Rata-rata (completedAt - createdAt) dalam hari.

## **6.5 Backend Services**
### **emailService.js**

|<p>// backend/services/emailService.js</p><p>const nodemailer = require('nodemailer');</p><p></p><p>const transporter = nodemailer.createTransport({</p><p>`  `host: process.env.SMTP\_HOST,</p><p>`  `port: 587,</p><p>`  `auth: { user: process.env.SMTP\_USER, pass: process.env.SMTP\_PASS },</p><p>});</p><p></p><p>async function sendReminderEmail(user, task) {</p><p>`  `await transporter.sendMail({</p><p>`    `from: `'Smart Task Manager' <${process.env.SMTP\_USER}>`,</p><p>`    `to: user.email,</p><p>`    `subject: `⏰ Reminder: '${task.title}' deadline besok`,</p><p>`    `html: `</p><p>`      `<h2>Pengingat Tugas</h2></p><p>`      `<p>Tugas <strong>${task.title}</strong></p></p><p>`      `<p>Deadline: <strong>${new Date(task.deadline).toLocaleString('id-ID')}</strong></p></p><p>`      `<p>Mata Kuliah: ${task.course || '-'}</p></p><p>`      `<a href='${process.env.APP\_URL}'>Buka Aplikasi</a></p><p>`    ``,</p><p>`  `});</p><p>}</p><p></p><p>module.exports = { sendReminderEmail };</p>|
| :- |

### **reminderJob.js (Cron)**

|<p>// backend/jobs/reminderJob.js</p><p>const cron = require('node-cron');</p><p>const Task = require('../models/Task');</p><p>const User = require('../models/User');</p><p>const { sendReminderEmail } = require('../services/emailService');</p><p></p><p>// Jalankan setiap hari pukul 07.30</p><p>cron.schedule('30 7 \* \* \*', async () => {</p><p>`  `const now = new Date();</p><p>`  `const tasks = await Task.find({</p><p>`    `status: 'pending',</p><p>`    `'reminder.notified': false,</p><p>`  `}).populate('userId');</p><p></p><p>`  `for (const task of tasks) {</p><p>`    `const diffDays = Math.ceil((new Date(task.deadline) - now) / 86400000);</p><p>`    `if (diffDays === task.reminder.offsetDays && task.userId.preferences.emailNotif) {</p><p>`      `await sendReminderEmail(task.userId, task);</p><p>`      `task.reminder.notified = true;</p><p>`      `await task.save();</p><p>`    `}</p><p>`  `}</p><p>});</p>|
| :- |

# **7. Service Worker & PWA**
## **7.1 Strategi Cache (sw.js)**
Service Worker menggunakan strategi Cache First untuk aset statis dan Network First untuk API calls:

|<p>// frontend/sw.js</p><p>const CACHE\_NAME = 'smarttask-v2';</p><p>const STATIC\_ASSETS = ['/', '/index.html', '/style.css', '/js/app.js', '/manifest.json'];</p><p></p><p>// Install: pre-cache aset statis</p><p>self.addEventListener('install', e => {</p><p>`  `e.waitUntil(caches.open(CACHE\_NAME).then(c => c.addAll(STATIC\_ASSETS)));</p><p>});</p><p></p><p>// Fetch: Cache First untuk static, Network First untuk /api/</p><p>self.addEventListener('fetch', e => {</p><p>`  `if (e.request.url.includes('/api/')) {</p><p>`    `e.respondWith(</p><p>`      `fetch(e.request).catch(() => caches.match(e.request))</p><p>`    `);</p><p>`  `} else {</p><p>`    `e.respondWith(</p><p>`      `caches.match(e.request).then(r => r || fetch(e.request))</p><p>`    `);</p><p>`  `}</p><p>});</p><p></p><p>// Push: Tampilkan notifikasi saat menerima push message</p><p>self.addEventListener('push', e => {</p><p>`  `const data = e.data?.json() || { title: 'Smart Task Manager', body: 'Ada pengingat tugas!' };</p><p>`  `e.waitUntil(self.registration.showNotification(data.title, {</p><p>`    `body: data.body,</p><p>`    `icon: '/assets/icon-192.png',</p><p>`    `badge: '/assets/badge-72.png',</p><p>`    `data: { url: data.url || '/' },</p><p>`  `}));</p><p>});</p><p></p><p>// Notification click: fokus atau buka tab aplikasi</p><p>self.addEventListener('notificationclick', e => {</p><p>`  `e.notification.close();</p><p>`  `e.waitUntil(clients.openWindow(e.notification.data.url));</p><p>});</p>|
| :- |

## **7.2 manifest.json**

|<p>{</p><p>`  `"name": "Smart Task Manager",</p><p>`  `"short\_name": "SmartTask",</p><p>`  `"description": "Manajemen tugas cerdas untuk mahasiswa",</p><p>`  `"start\_url": "/",</p><p>`  `"display": "standalone",</p><p>`  `"background\_color": "#1E3A5F",</p><p>`  `"theme\_color": "#2563EB",</p><p>`  `"icons": [</p><p>`    `{ "src": "/assets/icon-192.png", "sizes": "192x192", "type": "image/png" },</p><p>`    `{ "src": "/assets/icon-512.png", "sizes": "512x512", "type": "image/png" }</p><p>`  `]</p><p>}</p>|
| :- |

# **8. Autentikasi JWT – Detail Teknis**
## **8.1 Alur Autentikasi**

|**Langkah**|**Deskripsi**|
| :-: | :-: |
|**1. Client POST /api/auth/login**|Server validasi email & password dengan bcrypt.compare()|
|**2. Server generate JWT**|jwt.sign({ userId, email }, SECRET, { expiresIn: '1d' | '30d' })|
|**3. Client simpan token**|sessionStorage (default) atau localStorage (jika 'Ingat saya' dicentang)|
|**4. Setiap request berikutnya**|Header: Authorization: Bearer <token>|
|**5. Backend middleware verify**|jwt.verify(token, SECRET) → tambahkan req.user ke request|
|**6. Token expired / tidak valid**|Middleware return 401 → Client auto-redirect ke login.html|
|**7. Logout**|Client hapus token dari storage, redirect ke login.html|

## **8.2 Middleware Auth (Backend)**

|<p>// backend/middleware/auth.js</p><p>const jwt = require('jsonwebtoken');</p><p></p><p>module.exports = function authMiddleware(req, res, next) {</p><p>`  `const authHeader = req.headers['authorization'];</p><p>`  `const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;</p><p>`  `if (!token) return res.status(401).json({ error: 'Token tidak ditemukan' });</p><p>`  `try {</p><p>`    `req.user = jwt.verify(token, process.env.JWT\_SECRET);</p><p>`    `next();</p><p>`  `} catch {</p><p>`    `return res.status(401).json({ error: 'Token tidak valid atau sudah expired' });</p><p>`  `}</p><p>};</p>|
| :- |

# **9. Filter, Sort & Algoritma Kunci**
## **9.1 Filter Kombinasi (Backend Query)**

|<p>// backend/routes/tasks.js – GET /api/tasks</p><p>router.get('/', auth, async (req, res) => {</p><p>`  `const { status, priority, course, search, sort, tag } = req.query;</p><p>`  `const query = { userId: req.user.userId };</p><p></p><p>`  `if (status)   query.status = status;</p><p>`  `if (priority) query.priority = priority;</p><p>`  `if (course)   query.course = course;</p><p>`  `if (tag)      query.tags = tag;          // array contains</p><p>`  `if (search)   query.$or = [</p><p>`    `{ title: { $regex: search, $options: 'i' } },</p><p>`    `{ description: { $regex: search, $options: 'i' } },</p><p>`  `];</p><p></p><p>`  `const sortMap = { deadline: { deadline: 1 }, priority: { priority: -1 }, manual: { order: 1 } };</p><p>`  `const tasks = await Task.find(query).sort(sortMap[sort] || { deadline: 1 });</p><p>`  `res.json({ tasks });</p><p>});</p>|
| :- |

## **9.2 Pencarian Real-time (Frontend)**

|<p>// controllers/UIController.js – debounce search</p><p>let searchTimer;</p><p>searchInput.addEventListener('input', e => {</p><p>`  `clearTimeout(searchTimer);</p><p>`  `searchTimer = setTimeout(async () => {</p><p>`    `const q = e.target.value.trim();</p><p>`    `const tasks = await TaskService.fetchTasks({ search: q });</p><p>`    `UIController.renderList(tasks);</p><p>`  `}, 300);  // debounce 300ms</p><p>});</p>|
| :- |

## **9.3 Algoritma Recurring Task**

|<p>// services/TaskService.js – createRecurringNext</p><p>async function createRecurringNext(task) {</p><p>`  `if (task.recurrence.type === 'none') return;</p><p>`  `const base = new Date(task.deadline);</p><p>`  `const next = new Date(base);</p><p>`  `if (task.recurrence.type === 'daily')   next.setDate(base.getDate() + 1);</p><p>`  `if (task.recurrence.type === 'weekly')  next.setDate(base.getDate() + 7);</p><p>`  `if (task.recurrence.type === 'monthly') next.setMonth(base.getMonth() + 1);</p><p>`  `await apiFetch('/api/tasks', {</p><p>`    `method: 'POST',</p><p>`    `body: JSON.stringify({</p><p>      ...task,</p><p>`      `id: undefined,</p><p>`      `deadline: next.toISOString(),</p><p>`      `status: 'pending',</p><p>`      `'reminder.notified': false,</p><p>`    `})</p><p>`  `});</p><p>}</p>|
| :- |

## **9.4 Statistik Produktivitas**

|<p>// backend/routes/tasks.js – GET /api/tasks/stats</p><p>router.get('/stats', auth, async (req, res) => {</p><p>`  `const range = parseInt(req.query.range) || 30;</p><p>`  `const since = new Date(Date.now() - range \* 86400000);</p><p>`  `const tasks = await Task.find({ userId: req.user.userId, createdAt: { $gte: since } });</p><p></p><p>`  `const completed = tasks.filter(t => t.status === 'completed').length;</p><p>`  `const overdue   = tasks.filter(t => t.status === 'pending' && new Date(t.deadline) < new Date()).length;</p><p>`  `const avgDays   = tasks</p><p>    .filter(t => t.status === 'completed')</p><p>    .reduce((sum, t) => sum + (t.updatedAt - t.createdAt) / 86400000, 0) / (completed || 1);</p><p></p><p>`  `// Group by week for chart</p><p>`  `const weekly = groupByWeek(tasks);</p><p>`  `res.json({ completed, overdue, avgDays: Math.round(avgDays), weekly });</p><p>});</p>|
| :- |

# **10. Presentation Layer – UI**
## **10.1 Halaman & Komponen Utama**

|**Halaman / Komponen**|**File**|**Deskripsi**|
| :-: | :-: | :-: |
|**Login & Register**|login.html|Form auth, redirect ke index.html setelah sukses|
|**Dashboard Utama**|index.html|Daftar tugas, filter, search bar, toggle view (list/kalender)|
|**Modal Tambah/Edit**|UIController.js|Form task dengan semua field v2.0 (course, tags, subtasks, reminder)|
|**Tampilan Kalender**|CalendarController.js|FullCalendar atau custom month grid dengan dot prioritas|
|**Halaman Statistik**|StatsController.js|Chart.js bar chart, ringkasan numerik, filter range|
|**Log Notifikasi**|UIController.js (drawer)|Daftar riwayat notifikasi, aksi hapus per item / semua|
|**Onboarding / Empty**|UIController.js|Ilustrasi SVG, tooltip one-time, CTA tambah tugas pertama|
|**Pengaturan Profil**|ProfileController.js|Preferensi user: dark mode, email notif, remember me|

## **10.2 Dark Mode – Implementasi CSS Variables**

|<p>/\* style.css \*/</p><p>:root {</p><p>`  `--bg:       #ffffff;</p><p>`  `--bg-card:  #f8fafc;</p><p>`  `--text:     #1e293b;</p><p>`  `--text-sub: #64748b;</p><p>`  `--border:   #e2e8f0;</p><p>`  `--primary:  #2563eb;</p><p>}</p><p></p><p>[data-theme='dark'] {</p><p>`  `--bg:       #0f172a;</p><p>`  `--bg-card:  #1e293b;</p><p>`  `--text:     #f1f5f9;</p><p>`  `--text-sub: #94a3b8;</p><p>`  `--border:   #334155;</p><p>`  `--primary:  #60a5fa;</p><p>}</p><p></p><p>/\* Toggle handler di app.js \*/</p><p>const saved = localStorage.getItem('theme') ||</p><p>`  `(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');</p><p>document.documentElement.dataset.theme = saved;</p><p>themeToggle.addEventListener('click', () => {</p><p>`  `const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';</p><p>`  `document.documentElement.dataset.theme = next;</p><p>`  `localStorage.setItem('theme', next);</p><p>});</p>|
| :- |

## **10.3 Drag & Drop (SortableJS)**

|<p>// controllers/UIController.js – inisialisasi SortableJS</p><p>import Sortable from 'sortablejs';</p><p></p><p>function initDragDrop(listEl) {</p><p>`  `Sortable.create(listEl, {</p><p>`    `animation: 150,</p><p>`    `handle: '.drag-handle',</p><p>`    `ghostClass: 'sortable-ghost',</p><p>`    `onEnd: async (evt) => {</p><p>`      `const ids = [...listEl.querySelectorAll('[data-id]')].map(el => el.dataset.id);</p><p>`      `// Update order di backend</p><p>`      `await Promise.all(ids.map((id, i) =></p><p>`        `apiFetch(`/api/tasks/${id}/order`, { method: 'PATCH', body: JSON.stringify({ order: i }) })</p><p>`      `));</p><p>`    `},</p><p>`  `});</p><p>}</p>|
| :- |

# **11. Alur Data (Sequence) – Skenario Utama**
## **11.1 Membuat Tugas Baru (v2.0 – dengan Backend)**

|<p>User klik '+ Tugas Baru'</p><p>`  `→ UIController buka modal form</p><p>User isi form & submit</p><p>`  `→ UIController ambil data form</p><p>`  `→ TaskService.addTask(data)</p><p>`      `→ Validasi: deadline >= hari ini</p><p>`      `→ apiFetch('POST /api/tasks', body)</p><p>`          `→ Backend: auth middleware verify JWT</p><p>`          `→ TaskRoute handler: tambahkan userId dari req.user</p><p>`          `→ Task.create({ ...data, userId }) → MongoDB simpan</p><p>`          `→ Response: 201 { task }</p><p>`      `→ ReminderService.scheduleViaServiceWorker(task)</p><p>`          `→ postMessage ke sw.js untuk jadwalkan notif</p><p>`  `→ eventBus.emit('tasks-updated')</p><p>`  `→ UIController.render() refresh daftar dari cache + task baru</p>|
| :- |

## **11.2 Login (v2.0 – JWT Flow)**

|<p>User isi form login & submit</p><p>`  `→ AuthController.handleLogin(email, password, remember)</p><p>`  `→ AuthService.login(email, password, remember)</p><p>`      `→ apiFetch('POST /api/auth/login', { email, password })</p><p>`          `→ Backend: cari user by email</p><p>`          `→ bcrypt.compare(password, user.passwordHash)</p><p>`          `→ jwt.sign({ userId, email }, SECRET, { expiresIn })</p><p>`          `→ Response: 200 { token, user }</p><p>`      `→ Jika remember: localStorage.setItem('token', token)</p><p>`      `→ Jika tidak: sessionStorage.setItem('token', token)</p><p>`  `→ redirect ke index.html</p><p>`  `→ app.js: AuthService.isLoggedIn() → true → load dashboard</p>|
| :- |

# **12. Strategi Pengujian (Testing)**

|**Tingkat**|**Metode & Tools**|**Coverage Target**|**Contoh Skenario**|
| :-: | :-: | :-: | :-: |
|**Unit (Frontend)**|Jest + jsdom|> 70% business logic|TaskService.filterTasks(), validasi deadline, sortTasks()|
|**Unit (Backend)**|Jest + Mongoose mock|> 70% routes & services|Auth register/login, CRUD task, stats calculation|
|**Integration (API)**|Supertest + MongoDB test DB|Semua endpoint|POST /api/tasks returns 201 dengan field lengkap|
|**E2E**|Playwright – Chrome, Firefox, Safari|Skenario utama|Buat tugas → filter → tandai selesai → cek statistik|
|**PWA / Offline**|Playwright + service worker intercept|Cache & fallback|Matikan jaringan → pastikan data cache muncul|
|**Manual / Smoke**|Checklist per Sprint Review|Semua fitur sprint|Dark mode, notif, drag & drop, kalender|

## **12.1 Contoh Unit Test – TaskService**

|<p>// \_\_tests\_\_/TaskService.test.js</p><p>import { filterTasks, sortTasks } from '../js/services/TaskService.js';</p><p></p><p>const mockTasks = [</p><p>`  `{ id: '1', title: 'A', priority: 'high',   status: 'pending',   deadline: '2026-05-01', course: 'AI' },</p><p>`  `{ id: '2', title: 'B', priority: 'low',    status: 'completed', deadline: '2026-04-15', course: 'BD' },</p><p>`  `{ id: '3', title: 'C', priority: 'medium', status: 'pending',   deadline: '2026-03-01', course: 'AI' },</p><p>];</p><p></p><p>test('filter by priority high returns 1 task', () => {</p><p>`  `const result = filterTasks(mockTasks, { priority: 'high' });</p><p>`  `expect(result).toHaveLength(1);</p><p>`  `expect(result[0].id).toBe('1');</p><p>});</p><p></p><p>test('filter by course AI returns 2 tasks', () => {</p><p>`  `const result = filterTasks(mockTasks, { course: 'AI' });</p><p>`  `expect(result).toHaveLength(2);</p><p>});</p><p></p><p>test('sortByDeadline returns ascending order', () => {</p><p>`  `const sorted = sortTasks(mockTasks, 'deadline');</p><p>`  `expect(sorted[0].id).toBe('3'); // 2026-03-01 paling awal</p><p>});</p>|
| :- |

# **13. Deployment & Environment**
## **13.1 Arsitektur Deployment**

|**Service**|**Platform**|**URL Pattern**|**Notes**|
| :-: | :-: | :-: | :-: |
|**Frontend (static)**|Vercel / Netlify|https://smarttask.vercel.app|Auto-deploy dari branch main GitHub|
|**Backend (Node.js)**|Railway / Render|https://api.smarttask.app|Dockerfile atau buildpack Node.js|
|**Database**|MongoDB Atlas (Free M0)|mongodb+srv://...|IP whitelist: backend server IP|
|**Email SMTP**|Gmail SMTP / Mailtrap (dev)|–|Env var: SMTP\_HOST, SMTP\_USER, SMTP\_PASS|
|**Monitoring**|UptimeRobot (gratis)|–|Ping endpoint /health setiap 5 menit|

## **13.2 Environment Variables (.env)**

|<p># backend/.env  (JANGAN di-commit ke Git – tambahkan ke .gitignore)</p><p></p><p># Server</p><p>PORT=3000</p><p>NODE\_ENV=production</p><p></p><p># Database</p><p>MONGO\_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/smarttask</p><p></p><p># Autentikasi</p><p>JWT\_SECRET=ganti\_dengan\_random\_string\_panjang\_dan\_aman</p><p>JWT\_EXPIRES\_IN=1d</p><p>JWT\_REMEMBER\_EXPIRES\_IN=30d</p><p></p><p># Email</p><p>SMTP\_HOST=smtp.gmail.com</p><p>SMTP\_USER=noreply@smarttask.app</p><p>SMTP\_PASS=app\_specific\_password</p><p></p><p># App</p><p>APP\_URL=https://smarttask.vercel.app</p><p></p><p># Google Calendar (Sprint 6)</p><p>GOOGLE\_CLIENT\_ID=your\_google\_client\_id</p><p>GOOGLE\_CLIENT\_SECRET=your\_google\_client\_secret</p>|
| :- |

# **14. Risiko Teknis & Mitigasi**

|**Risiko**|**Dampak**|**Mitigasi Teknis**|
| :-: | :-: | :-: |
|JWT token expired saat user aktif|**Sedang**|Implementasi axios interceptor / fetch wrapper yang cek 401 dan redirect ke login. Opsional: refresh token endpoint.|
|MongoDB connection drop di production|**Tinggi**|Mongoose auto-reconnect. Tambahkan health check endpoint GET /health. UptimeRobot alert jika down.|
|Service Worker cache stale (data lama)|**Sedang**|Versi cache CACHE\_NAME: 'smarttask-v2'. Update versi saat deploy → SW install ulang.|
|Push notification blokir oleh browser/OS|**Sedang**|Fallback ke email notifikasi. Banner in-app: 'Aktifkan notifikasi untuk pengingat otomatis'.|
|Cron job email tidak jalan saat server restart|**Sedang**|PM2 dengan auto-restart. Atau gunakan Railway Cron (managed).|
|CORS error saat frontend mengakses backend|**Tinggi**|Konfigurasi cors() di Express: origin: process.env.APP\_URL. Untuk dev: origin: 'http://localhost:5500'.|
|Timezone inconsistency antar pengguna|**Sedang**|Simpan deadline dalam UTC di DB. Konversi ke timezone lokal browser saat render menggunakan Intl.DateTimeFormat.|
|Drag & drop urutan tidak tersimpan jika offline|**Rendah**|Queue operasi PATCH /order ke IndexedDB saat offline. Sync saat online kembali.|
|Google OAuth callback URL mismatch|**Sedang**|Daftarkan URL redirect yang tepat di Google Cloud Console untuk setiap environment (dev/prod).|
|Data migration localStorage lama ke backend|**Tinggi**|One-time migration script: baca dari localStorage → POST batch ke /api/tasks/import → hapus localStorage setelah sukses.|

# **15. Rencana Ekstensi Teknis (Post-v2.0)**
- GraphQL API – Ganti REST dengan GraphQL untuk query yang lebih fleksibel dan efisien (terutama saat fitur kolaborasi ditambahkan).
- Redis Cache – Cache hasil query MongoDB yang sering diakses (daftar tugas, statistik) untuk performa API yang lebih baik.
- WebSocket (Socket.io) – Real-time sync untuk fitur kolaborasi: ketika anggota kelompok mengupdate tugas, semua anggota melihat perubahan langsung.
- Containerisasi (Docker + Docker Compose) – Bungkus frontend + backend + MongoDB dalam satu docker-compose untuk kemudahan onboarding developer baru.
- CI/CD Pipeline (GitHub Actions) – Otomatisasi: lint → unit test → integration test → deploy ke Railway/Vercel saat push ke main.
- AI Prioritization Service – Microservice Python (FastAPI) yang menerima daftar tugas dan merekomendasikan urutan prioritas berdasarkan ML model.


*Smart Task Manager – TDD v2.0  |  Dokumen ini bersifat living document dan akan diperbarui setiap Sprint Planning.*
Halaman  dari 
