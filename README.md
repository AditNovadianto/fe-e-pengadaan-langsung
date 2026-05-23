# Software Coding Documentation (SCD)

# Frontend — e-Pengadaan Langsung

## 1. Project Title

**Frontend e-Pengadaan Langsung**

Dokumen ini merupakan Software Coding Documentation (SCD) untuk project frontend **e-Pengadaan Langsung**. Dokumentasi ini disusun untuk menjelaskan tujuan aplikasi, teknologi yang digunakan, struktur project, proses instalasi, alur penggunaan, integrasi API dengan backend Laravel, rancangan antarmuka, serta proses pengujian dan deployment frontend.

---

## 2. Overview

Frontend e-Pengadaan Langsung adalah aplikasi antarmuka pengguna berbasis web yang digunakan untuk berinteraksi dengan sistem backend e-Pengadaan Langsung. Aplikasi ini menyediakan halaman login, dashboard pengadaan, tampilan daftar pengadaan, fitur pembuatan paket pengadaan, input penawaran oleh vendor, penetapan kontrak oleh user atau panitia, serta fitur unduh surat kontrak dalam bentuk PDF.

Frontend ini dibangun menggunakan HTML, CSS, dan JavaScript murni tanpa framework frontend seperti React, Vue, atau Angular. Pendekatan ini membuat aplikasi lebih sederhana, ringan, dan mudah dijalankan langsung melalui browser. Komunikasi dengan backend dilakukan menggunakan REST API melalui fungsi `fetch()` JavaScript.

Secara umum, aplikasi frontend memiliki dua jenis pengguna utama, yaitu:

1. **Panitia / User**, yaitu pengguna internal yang dapat login, melihat dashboard, membuat paket pengadaan baru, memilih vendor, dan menetapkan nilai kontrak.
2. **Vendor / Penyedia**, yaitu pengguna penyedia yang dapat login, melihat paket pengadaan yang berkaitan dengannya, serta mengirimkan nilai penawaran.

---

## 3. Project Information

| Item               | Description                                   |
| ------------------ | --------------------------------------------- |
| Nama Project       | Frontend e-Pengadaan Langsung                 |
| Jenis Aplikasi     | Web Frontend                                  |
| Bahasa Pemrograman | HTML, CSS, JavaScript                         |
| Framework          | Tidak menggunakan framework frontend          |
| API Backend        | Laravel REST API                              |
| Arsitektur         | Static Web Application + REST API Integration |
| Repository         | GitHub Repository fe-e-pengadaan-langsung     |
| Halaman Utama      | `index.html`                                  |
| Halaman Dashboard  | `dashboard.html`                              |

---

## 4. Technology Stack

| Technology       | Function                                                                                |
| ---------------- | --------------------------------------------------------------------------------------- |
| HTML5            | Membentuk struktur halaman login dan dashboard                                          |
| CSS3             | Mengatur tampilan, layout, warna, modal, tabel, dan animasi                             |
| JavaScript       | Mengatur interaksi pengguna, login, logout, fetch API, manipulasi DOM, dan generate PDF |
| Font Awesome     | Menampilkan ikon pada tombol, sidebar, dan elemen UI                                    |
| jsPDF            | Membuat dokumen PDF surat kontrak pengadaan                                             |
| Browser          | Menjalankan aplikasi frontend                                                           |
| Laravel REST API | Sumber data dan logic backend untuk autentikasi dan pengadaan                           |

---

## 5. Frontend Project Structure

Struktur project frontend dibuat sederhana dan langsung dapat dijalankan melalui browser. Berikut struktur folder utama:

```text
📦fe-e-pengadaan-langsung
 ┣ 📂.git
 ┃ ┣ 📂gk
 ┃ ┃ ┗ 📜config
 ┃ ┣ 📂hooks
 ┃ ┃ ┣ 📜applypatch-msg.sample
 ┃ ┃ ┣ 📜commit-msg.sample
 ┃ ┃ ┣ 📜fsmonitor-watchman.sample
 ┃ ┃ ┣ 📜post-update.sample
 ┃ ┃ ┣ 📜pre-applypatch.sample
 ┃ ┃ ┣ 📜pre-commit.sample
 ┃ ┃ ┣ 📜pre-merge-commit.sample
 ┃ ┃ ┣ 📜pre-push.sample
 ┃ ┃ ┣ 📜pre-rebase.sample
 ┃ ┃ ┣ 📜pre-receive.sample
 ┃ ┃ ┣ 📜prepare-commit-msg.sample
 ┃ ┃ ┣ 📜push-to-checkout.sample
 ┃ ┃ ┣ 📜sendemail-validate.sample
 ┃ ┃ ┗ 📜update.sample
 ┃ ┣ 📂info
 ┃ ┃ ┗ 📜exclude
 ┃ ┣ 📂logs
 ┃ ┃ ┣ 📂refs
 ┃ ┃ ┃ ┣ 📂heads
 ┃ ┃ ┃ ┃ ┗ 📜main
 ┃ ┃ ┃ ┗ 📂remotes
 ┃ ┃ ┃ ┃ ┗ 📂origin
 ┃ ┃ ┃ ┃ ┃ ┣ 📜HEAD
 ┃ ┃ ┃ ┃ ┃ ┗ 📜main
 ┃ ┃ ┗ 📜HEAD
 ┃ ┣ 📂objects
 ┃ ┃ ┣ 📂0c
 ┃ ┃ ┃ ┗ 📜beeb9f8cceb0808130827d91765128c876b458
 ┃ ┃ ┣ 📂11
 ┃ ┃ ┃ ┗ 📜6cdd66a87ef7bbfebf748aa48724fc9a0fc798
 ┃ ┃ ┣ 📂82
 ┃ ┃ ┃ ┗ 📜464ec4a10fc79662ea811c7f9709db199b06ef
 ┃ ┃ ┣ 📂info
 ┃ ┃ ┗ 📂pack
 ┃ ┃ ┃ ┣ 📜pack-37e6a46a589368cce1652e7823599c7e26ae0b71.idx
 ┃ ┃ ┃ ┣ 📜pack-37e6a46a589368cce1652e7823599c7e26ae0b71.pack
 ┃ ┃ ┃ ┗ 📜pack-37e6a46a589368cce1652e7823599c7e26ae0b71.rev
 ┃ ┣ 📂refs
 ┃ ┃ ┣ 📂heads
 ┃ ┃ ┃ ┗ 📜main
 ┃ ┃ ┣ 📂remotes
 ┃ ┃ ┃ ┗ 📂origin
 ┃ ┃ ┃ ┃ ┣ 📜HEAD
 ┃ ┃ ┃ ┃ ┗ 📜main
 ┃ ┃ ┗ 📂tags
 ┃ ┣ 📜COMMIT_EDITMSG
 ┃ ┣ 📜config
 ┃ ┣ 📜description
 ┃ ┣ 📜FETCH_HEAD
 ┃ ┣ 📜HEAD
 ┃ ┣ 📜index
 ┃ ┗ 📜packed-refs
 ┣ 📂assets
 ┃ ┣ 📂css
 ┃ ┃ ┗ 📜style.css
 ┃ ┗ 📂js
 ┃ ┃ ┣ 📜auth.js
 ┃ ┃ ┗ 📜dashboard.js
 ┣ 📜dashboard.html
 ┣ 📜index.html
 ┗ 📜README.md
```

### 5.1 File `index.html`

File `index.html` merupakan halaman login aplikasi. Halaman ini menampilkan form login dengan pilihan tipe user, yaitu **Panitia / User** dan **Vendor / Penyedia**. Input utama pada halaman ini adalah alamat email dan kata sandi. Setelah user menekan tombol login, proses autentikasi akan ditangani oleh file `assets/js/auth.js`.

### 5.2 File `dashboard.html`

File `dashboard.html` merupakan halaman utama setelah user berhasil login. Halaman ini menampilkan sidebar, topbar informasi user, tabel daftar pengadaan, tombol buat paket untuk user panitia, modal input penawaran untuk vendor, modal input kontrak, serta tombol untuk mengunduh surat kontrak ketika status pengadaan sudah selesai.

### 5.3 Folder `assets/css/`

Folder ini menyimpan file styling utama aplikasi, yaitu `style.css`. File ini mengatur tampilan login page, dashboard layout, sidebar, form, tombol, tabel data, status badge, modal, toast notification, dan animasi.

### 5.4 Folder `assets/js/`

Folder ini menyimpan file JavaScript utama aplikasi:

| File           | Function                                                                                                                           |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `auth.js`      | Mengatur login, penyimpanan token, penyimpanan data user, redirect ke dashboard, dan validasi user yang sudah login                |
| `dashboard.js` | Mengatur dashboard, logout, fetch data pengadaan, fetch vendor, create pengadaan, input penawaran, input kontrak, dan generate PDF |

---

## 6. Getting Started

Bagian ini menjelaskan cara menjalankan project frontend pada local environment.

### 6.1 Prerequisites

Sebelum menjalankan frontend, pastikan beberapa kebutuhan berikut sudah tersedia:

```text
Browser modern, seperti Google Chrome, Microsoft Edge, atau Firefox
Git
Backend Laravel e-Pengadaan Langsung sudah berjalan
Koneksi ke endpoint backend http://127.0.0.1:8000/api
```

Karena project frontend ini berbasis HTML, CSS, dan JavaScript murni, tidak diperlukan instalasi package manager seperti npm atau composer untuk menjalankannya.

### 6.2 Clone Repository

```bash
git clone https://github.com/AditNovadianto/fe-e-pengadaan-langsung.git
cd fe-e-pengadaan-langsung
```

### 6.3 Run Frontend

Frontend dapat dijalankan langsung dengan membuka file berikut pada browser:

```text
index.html
```

Alternatif yang lebih disarankan adalah menjalankan frontend melalui local server agar request dan file static lebih stabil:

```bash
python -m http.server 5500
```

Kemudian buka URL berikut pada browser:

```text
http://localhost:5500
```

---

## 7. Environment Configuration

Frontend menggunakan konfigurasi API URL yang didefinisikan langsung pada file JavaScript.

```javascript
const API_URL = "http://127.0.0.1:8000/api";
```

Konfigurasi tersebut digunakan pada file `auth.js` dan `dashboard.js` sebagai base URL untuk mengakses backend Laravel.

Jika backend dijalankan pada host atau port lain, nilai `API_URL` perlu disesuaikan. Contoh:

```javascript
const API_URL = "http://localhost:8000/api";
```

Untuk environment production, konfigurasi dapat diarahkan ke domain backend production, misalnya:

```javascript
const API_URL = "https://api-domain-production.com/api";
```

---

## 8. User Interface Design

Frontend e-Pengadaan Langsung menggunakan desain modern dengan pendekatan dark theme dan glassmorphism. Desain ini terlihat pada penggunaan warna latar gelap, panel transparan, efek blur, border lembut, dan tombol dengan gradasi warna.

### 8.1 Login Page

Halaman login terdiri dari:

| Component          | Description                                             |
| ------------------ | ------------------------------------------------------- |
| Login Card         | Panel utama untuk form login                            |
| Select Login Type  | Pilihan login sebagai Panitia/User atau Vendor/Penyedia |
| Email Input        | Input alamat email user                                 |
| Password Input     | Input kata sandi user                                   |
| Submit Button      | Tombol untuk mengirim request login                     |
| Toast Notification | Notifikasi login berhasil atau gagal                    |

### 8.2 Dashboard Page

Halaman dashboard terdiri dari:

| Component          | Description                                 |
| ------------------ | ------------------------------------------- |
| Sidebar            | Navigasi utama aplikasi                     |
| Topbar             | Menampilkan nama user dan role login        |
| Data Table         | Menampilkan daftar paket pengadaan          |
| Create Modal       | Modal untuk membuat paket pengadaan baru    |
| Penawaran Modal    | Modal vendor untuk mengirim nilai penawaran |
| Kontrak Modal      | Modal user untuk menetapkan nilai kontrak   |
| Toast Notification | Notifikasi status operasi                   |
| PDF Button         | Tombol untuk mengunduh surat kontrak        |

---

## 9. Page and Feature Documentation

### 9.1 Login Page

Halaman login digunakan untuk mengautentikasi user sebelum masuk ke dashboard. User memilih tipe login terlebih dahulu, kemudian memasukkan email dan password.

#### Input Field

| Field     | Type     | Required | Description                               |
| --------- | -------- | -------- | ----------------------------------------- |
| loginType | select   | Yes      | Menentukan tipe login: user atau penyedia |
| email     | email    | Yes      | Email user atau penyedia                  |
| password  | password | Yes      | Password user atau penyedia               |

#### Login Flow

1. User membuka halaman `index.html`.
2. User memilih tipe login: Panitia/User atau Vendor/Penyedia.
3. User mengisi email dan password.
4. Frontend mengirim request ke endpoint backend sesuai tipe login.
5. Jika login berhasil, frontend menyimpan token, data user, dan tipe user ke `localStorage`.
6. User diarahkan ke halaman `dashboard.html`.
7. Jika login gagal, sistem menampilkan toast error.

### 9.2 Dashboard Page

Dashboard adalah halaman utama setelah user berhasil login. Pada halaman ini user dapat melihat daftar pengadaan terbaru dan melakukan aksi sesuai role yang digunakan.

#### Dashboard Flow

1. Sistem membaca token dari `localStorage`.
2. Jika token tidak ada, user diarahkan kembali ke halaman login.
3. Sistem membaca data user dan tipe user dari `localStorage`.
4. Header dashboard menampilkan nama user dan role user.
5. Sistem mengambil daftar data pengadaan dari backend.
6. Data ditampilkan pada tabel pengadaan.
7. Tombol aksi akan muncul sesuai status pengadaan dan role user.

### 9.3 Create Pengadaan

Fitur create pengadaan hanya tersedia untuk user dengan tipe **Panitia / User**. Form create pengadaan berada pada modal dashboard.

#### Input Field

| Field       | Type   | Required | Description                       |
| ----------- | ------ | -------- | --------------------------------- |
| inputNama   | text   | Yes      | Nama paket pengadaan              |
| inputPagu   | number | Yes      | Pagu anggaran pengadaan           |
| inputVendor | select | Yes      | Vendor atau penyedia yang dipilih |

#### Create Flow

1. User panitia menekan tombol **Buat Paket**.
2. Sistem membuka modal create pengadaan.
3. User mengisi nama paket, pagu anggaran, dan memilih vendor.
4. Frontend mengirim request `POST /pengadaan` ke backend.
5. Jika berhasil, modal ditutup, form dikosongkan, dan tabel pengadaan diperbarui.

### 9.4 Input Penawaran

Fitur input penawaran digunakan oleh user dengan tipe **Vendor / Penyedia**. Fitur ini muncul ketika status pengadaan masih berada pada tahap draft dan pengadaan tersebut berkaitan dengan vendor yang sedang login.

#### Input Field

| Field          | Type   | Required | Description                 |
| -------------- | ------ | -------- | --------------------------- |
| inputPenawaran | number | Yes      | Nilai penawaran dari vendor |

#### Penawaran Flow

1. Vendor membuka dashboard.
2. Sistem menampilkan paket pengadaan yang berkaitan dengan vendor tersebut.
3. Vendor menekan tombol **Kirim Penawaran**.
4. Vendor mengisi nilai penawaran.
5. Frontend mengirim request `PUT /pengadaan/{id}` ke backend.
6. Jika berhasil, data pengadaan diperbarui.

### 9.5 Input Kontrak

Fitur input kontrak digunakan oleh user panitia ketika status pengadaan sudah memiliki penawaran masuk.

#### Input Field

| Field        | Type   | Required | Description         |
| ------------ | ------ | -------- | ------------------- |
| inputKontrak | number | Yes      | Nilai kontrak final |

#### Kontrak Flow

1. User panitia membuka dashboard.
2. Sistem menampilkan pengadaan dengan status penawaran masuk.
3. User menekan tombol **Tetapkan Kontrak**.
4. User mengisi nilai kontrak.
5. Frontend mengirim request `PUT /pengadaan/{id}` ke backend.
6. Jika berhasil, status dan data pengadaan diperbarui.

### 9.6 Generate Surat Kontrak PDF

Fitur generate PDF digunakan untuk membuat surat kontrak pengadaan ketika status pengadaan sudah selesai. File PDF dibuat menggunakan library jsPDF yang dimuat pada halaman `dashboard.html`.

#### PDF Output

PDF yang dihasilkan berisi:

| Data             | Description                            |
| ---------------- | -------------------------------------- |
| Nomor Pengadaan  | ID pengadaan                           |
| Nama Paket       | Nama paket pengadaan                   |
| Pagu Anggaran    | Nilai pagu anggaran                    |
| Nilai Penawaran  | Nilai penawaran vendor                 |
| Nilai Kontrak    | Nilai kontrak final                    |
| Status Pengadaan | Status akhir pengadaan                 |
| Panitia          | Nama user panitia                      |
| Vendor           | Nama perusahaan vendor                 |
| Tanda Tangan     | Area tanda tangan panitia dan penyedia |

---

## 10. API Integration Documentation

Frontend berkomunikasi dengan backend Laravel melalui REST API. Semua request menggunakan base URL:

```text
http://127.0.0.1:8000/api
```

### 10.1 Authentication API

#### Login User

```http
POST /auth/user/login
```

Payload:

```json
{
  "email_user": "panitia@test.com",
  "password_user": "password123"
}
```

#### Login Penyedia

```http
POST /auth/penyedia/login
```

Payload:

```json
{
  "email_penyedia": "vendor@test.com",
  "password_penyedia": "password123"
}
```

#### Logout

```http
POST /auth/logout
```

Header:

```http
Authorization: Bearer {token}
Accept: application/json
```

### 10.2 Pengadaan API

#### Get All Pengadaan

```http
GET /pengadaan
```

Digunakan untuk mengambil seluruh data pengadaan yang akan ditampilkan pada tabel dashboard.

#### Create Pengadaan

```http
POST /pengadaan
```

Payload:

```json
{
  "nama_pengadaan": "Pengadaan Laptop Kantor",
  "pagu_anggaran": "50000000",
  "id_penyedia": 1,
  "id_user": 1
}
```

#### Update Pengadaan

```http
PUT /pengadaan/{id}
```

Payload penawaran:

```json
{
  "nilai_penawaran": "48000000"
}
```

Payload kontrak:

```json
{
  "nilai_kontrak": "47000000"
}
```

### 10.3 Penyedia API

#### Get All Penyedia

```http
GET /penyedia
```

Endpoint ini digunakan untuk mengambil daftar vendor yang akan ditampilkan pada dropdown ketika user panitia membuat paket pengadaan baru.

---

## 11. JavaScript Module Documentation

### 11.1 `auth.js`

File `auth.js` menangani seluruh proses autentikasi pada halaman login.

#### Main Responsibilities

| Functionality          | Description                                             |
| ---------------------- | ------------------------------------------------------- |
| API URL Configuration  | Menentukan base URL backend                             |
| Toast Notification     | Menampilkan pesan login berhasil atau gagal             |
| Login Submit Handler   | Mengirim data login ke backend                          |
| Local Storage Handler  | Menyimpan token, data user, dan tipe user               |
| Redirect Handler       | Mengarahkan user ke dashboard setelah login berhasil    |
| Existing Session Check | Mengarahkan user ke dashboard jika token sudah tersedia |

#### Local Storage Data

| Key        | Description                                      |
| ---------- | ------------------------------------------------ |
| auth_token | Token autentikasi dari backend                   |
| user_data  | Data user atau penyedia dalam format JSON string |
| user_type  | Tipe user, yaitu `user` atau `penyedia`          |

### 11.2 `dashboard.js`

File `dashboard.js` menangani seluruh fungsi utama pada dashboard.

#### Main Responsibilities

| Functionality      | Description                                                 |
| ------------------ | ----------------------------------------------------------- |
| Auth Check         | Memastikan user sudah login sebelum masuk dashboard         |
| User Header        | Menampilkan nama user dan role pada topbar                  |
| Fetch Pengadaan    | Mengambil data pengadaan dari backend                       |
| Filter Vendor Data | Membatasi data vendor agar hanya melihat pengadaan miliknya |
| Fetch Vendor       | Mengambil daftar penyedia untuk dropdown create pengadaan   |
| Create Pengadaan   | Mengirim data paket pengadaan baru ke backend               |
| Submit Penawaran   | Mengirim nilai penawaran vendor ke backend                  |
| Submit Kontrak     | Mengirim nilai kontrak final ke backend                     |
| Logout             | Menghapus data session dan kembali ke login page            |
| Generate PDF       | Membuat surat kontrak PDF menggunakan jsPDF                 |

---

## 12. Authentication and Session Management

Session frontend dikelola menggunakan `localStorage`. Setelah login berhasil, data berikut disimpan:

```javascript
localStorage.setItem("auth_token", data.access_token);
localStorage.setItem("user_data", JSON.stringify(data.data));
localStorage.setItem("user_type", type);
```

Pada halaman dashboard, sistem memeriksa apakah token tersedia. Jika token tidak ditemukan, user akan diarahkan kembali ke halaman login.

```javascript
if (!token) {
  window.location.href = "index.html";
  return;
}
```

Pada saat logout, seluruh data session dihapus dari `localStorage`.

```javascript
localStorage.clear();
window.location.href = "index.html";
```

---

## 13. Role-Based Interface

Frontend menampilkan fitur berdasarkan tipe user yang sedang login.

| Role              | Feature Access                                                                                                                                    |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Panitia / User    | Login, melihat dashboard, melihat semua pengadaan, membuat paket pengadaan, memilih vendor, menetapkan kontrak, unduh surat kontrak               |
| Vendor / Penyedia | Login, melihat dashboard, melihat pengadaan yang berkaitan dengan vendor tersebut, mengirim penawaran, unduh surat kontrak jika pengadaan selesai |

Logika role diterapkan dengan membaca nilai `user_type` dari `localStorage`.

```javascript
const userType = localStorage.getItem("user_type");
```

Jika `userType` bernilai `user`, maka tombol **Buat Paket** ditampilkan. Jika `userType` bernilai `penyedia`, maka data pengadaan difilter berdasarkan `id_penyedia`.

---

## 14. Form Validation

Validasi form pada frontend dilakukan menggunakan kombinasi atribut HTML dan pengecekan JavaScript. Field penting menggunakan atribut `required`, sehingga browser akan menolak submit jika input kosong.

### 14.1 Login Form Validation

| Field     | Validation                |
| --------- | ------------------------- |
| loginType | Required                  |
| email     | Required dan format email |
| password  | Required                  |

### 14.2 Create Pengadaan Validation

| Field          | Validation          |
| -------------- | ------------------- |
| nama_pengadaan | Required            |
| pagu_anggaran  | Required dan number |
| id_penyedia    | Required            |

### 14.3 Penawaran Validation

| Field           | Validation          |
| --------------- | ------------------- |
| nilai_penawaran | Required dan number |

### 14.4 Kontrak Validation

| Field         | Validation          |
| ------------- | ------------------- |
| nilai_kontrak | Required dan number |

---

## 15. Error Handling

Error handling frontend dilakukan melalui toast notification dan fallback message pada tabel dashboard.

### 15.1 Login Error

Jika login gagal karena email atau password salah, frontend akan menampilkan pesan error:

```text
Email atau password salah
```

Jika server backend tidak dapat diakses, frontend akan menampilkan pesan:

```text
Koneksi server gagal
```

### 15.2 Dashboard Data Error

Jika data pengadaan gagal diambil, dashboard akan menampilkan pesan:

```text
Gagal mengambil data. Pastikan server Backend aktif.
```

### 15.3 Submit Form Error

Jika proses create pengadaan, input penawaran, atau input kontrak gagal, frontend akan menampilkan toast error:

```text
Gagal menyimpan data
```

---

## 16. UI Styling Documentation

Styling aplikasi diatur melalui file `assets/css/style.css`. Desain aplikasi menggunakan CSS variable untuk menjaga konsistensi warna dan komponen.

### 16.1 Color Variables

| Variable          | Function                             |
| ----------------- | ------------------------------------ |
| --primary-color   | Warna utama aplikasi                 |
| --primary-hover   | Warna hover tombol utama             |
| --secondary-color | Warna sukses atau notifikasi positif |
| --bg-dark         | Warna background gelap               |
| --bg-darker       | Warna background utama               |
| --bg-card         | Warna panel transparan               |
| --text-main       | Warna teks utama                     |
| --text-muted      | Warna teks sekunder                  |
| --border-color    | Warna border panel                   |
| --glass-blur      | Efek blur pada panel                 |

### 16.2 Main UI Components

| Component        | CSS Class           |
| ---------------- | ------------------- |
| Glass Panel      | `.glass-panel`      |
| Button           | `.btn`              |
| Primary Button   | `.btn-primary`      |
| Secondary Button | `.btn-secondary`    |
| Login Container  | `.login-container`  |
| Login Card       | `.login-card`       |
| Dashboard Layout | `.dashboard-layout` |
| Sidebar          | `.sidebar`          |
| Data Table       | `.data-table`       |
| Status Badge     | `.status-badge`     |
| Modal Overlay    | `.modal-overlay`    |
| Modal Content    | `.modal-content`    |
| Toast            | `.toast`            |

---

## 17. Testing

Pengujian frontend dilakukan untuk memastikan setiap halaman dan fitur dapat berjalan sesuai kebutuhan. Pengujian dilakukan secara manual melalui browser.

### 17.1 Test Environment

| Item      | Description                                             |
| --------- | ------------------------------------------------------- |
| Browser   | Google Chrome / Microsoft Edge / Firefox                |
| Backend   | Laravel REST API running on `http://127.0.0.1:8000/api` |
| Frontend  | Static HTML opened directly or via local server         |
| Data Test | User panitia dan vendor dari backend seeder             |

### 17.2 Manual Test Cases

| Test ID   | Feature          | Test Scenario                                                 | Expected Result                       | Status |
| --------- | ---------------- | ------------------------------------------------------------- | ------------------------------------- | ------ |
| FE-TC-001 | Login User       | Login sebagai Panitia/User dengan email dan password valid    | User berhasil masuk ke dashboard      | PASSED |
| FE-TC-002 | Login Vendor     | Login sebagai Vendor/Penyedia dengan email dan password valid | Vendor berhasil masuk ke dashboard    | PASSED |
| FE-TC-003 | Login Invalid    | Login dengan email atau password salah                        | Toast error muncul                    | PASSED |
| FE-TC-004 | Session Check    | Buka dashboard tanpa token                                    | User diarahkan ke halaman login       | PASSED |
| FE-TC-005 | Dashboard Data   | Buka dashboard setelah login                                  | Data pengadaan tampil pada tabel      | PASSED |
| FE-TC-006 | Create Pengadaan | User membuat paket pengadaan baru                             | Data tersimpan dan tabel diperbarui   | PASSED |
| FE-TC-007 | Input Penawaran  | Vendor mengirim nilai penawaran                               | Nilai penawaran tersimpan             | PASSED |
| FE-TC-008 | Input Kontrak    | User menetapkan nilai kontrak                                 | Nilai kontrak tersimpan               | PASSED |
| FE-TC-009 | Logout           | User menekan tombol keluar                                    | Session terhapus dan kembali ke login | PASSED |
| FE-TC-010 | Generate PDF     | User mengunduh surat kontrak                                  | File PDF berhasil dibuat              | PASSED |

---

## 18. Deployment

Frontend dapat dideploy sebagai static website karena tidak membutuhkan server-side rendering atau build process.

### 18.1 Deployment Options

| Platform       | Description                                                        |
| -------------- | ------------------------------------------------------------------ |
| GitHub Pages   | Cocok untuk hosting static HTML, CSS, dan JavaScript               |
| Netlify        | Cocok untuk deployment static website dengan konfigurasi sederhana |
| Vercel         | Cocok untuk static frontend dan integrasi domain                   |
| Apache / Nginx | Cocok untuk deployment di server pribadi atau VPS                  |

### 18.2 Deployment Steps

1. Pastikan backend production sudah aktif.
2. Ubah `API_URL` pada file JavaScript ke URL backend production.
3. Upload seluruh file frontend ke hosting static.
4. Pastikan file `index.html`, `dashboard.html`, dan folder `assets` ikut terupload.
5. Uji login dan koneksi API dari domain frontend ke backend.

### 18.3 Production Notes

Pada environment production, pastikan backend mengizinkan CORS dari domain frontend. Jika tidak, request API dari frontend akan ditolak oleh browser.

---

## 19. Security Considerations

Beberapa aspek keamanan yang perlu diperhatikan pada frontend:

1. Token autentikasi disimpan pada `localStorage`, sehingga perlu dipastikan tidak ada script berbahaya atau XSS yang dapat membaca token tersebut.
2. Validasi frontend tidak boleh menjadi satu-satunya validasi. Backend tetap harus melakukan validasi penuh terhadap semua request.
3. URL backend production sebaiknya menggunakan HTTPS.
4. Error message sebaiknya tidak menampilkan informasi internal server.
5. File frontend tidak boleh menyimpan kredensial rahasia seperti password database, API key sensitif, atau token permanen.

---

## 20. Contributing

Kontribusi pengembangan frontend dilakukan melalui GitHub. Alur kontribusi yang disarankan:

1. Clone repository frontend.
2. Buat branch baru sesuai fitur atau perbaikan.
3. Lakukan perubahan pada file HTML, CSS, atau JavaScript.
4. Uji perubahan melalui browser.
5. Pastikan integrasi API backend tetap berjalan.
6. Commit perubahan dengan pesan yang jelas.
7. Push branch ke repository.
8. Ajukan pull request atau merge ke branch utama.

---

## 21. Release History

| Version | Description                                                            |
| ------- | ---------------------------------------------------------------------- |
| 0.1     | Initial frontend setup                                                 |
| 0.2     | Penambahan halaman login                                               |
| 0.3     | Penambahan halaman dashboard                                           |
| 0.4     | Penambahan integrasi API autentikasi dan pengadaan                     |
| 0.5     | Penambahan fitur modal pengadaan, penawaran, kontrak, dan generate PDF |

---

## 22. Authors

| Name            | Role      |
| --------------- | --------- |
| Adit Novadianto | Developer |

---

## 23. Conclusion

Frontend e-Pengadaan Langsung merupakan aplikasi web sederhana yang dibangun menggunakan HTML, CSS, dan JavaScript murni. Aplikasi ini menyediakan antarmuka utama untuk proses login, dashboard pengadaan, pembuatan paket pengadaan, input penawaran vendor, penetapan kontrak, dan pembuatan surat kontrak dalam format PDF.

Dengan struktur project yang sederhana, aplikasi frontend ini mudah dijalankan, mudah dipahami, dan dapat dikembangkan lebih lanjut sesuai kebutuhan sistem e-Pengadaan Langsung. Dokumentasi ini dapat digunakan sebagai referensi teknis bagi developer, tester, maupun pihak lain yang ingin memahami struktur frontend, alur penggunaan, integrasi API, serta proses deployment aplikasi.
