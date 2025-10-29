# Changelog - CapCut Maker

## Update Terbaru - Heroku Chrome Fix

### 🔧 Critical Fix untuk Heroku
- **Fix Chrome not found error** di Heroku
- **Update buildpack** ke official Heroku Google Chrome buildpack
- **Downgrade Puppeteer** ke v23.0.0 (lebih stabil di Heroku)
- **Auto-detect Chrome path** dengan multiple fallback
- **.npmrc** untuk skip Chromium download
- **HEROKU_FIX.md** - Panduan troubleshooting lengkap

### 🔄 Configuration Changes
- Buildpack: `heroku/heroku-buildpack-google-chrome` (official)
- Puppeteer: v23.0.0 (dari v24.4.0)
- skipDownload: true di package.json
- findChrome() function dengan multiple paths
- Additional Chrome args untuk stability

### 📖 New Documentation
- HEROKU_FIX.md - Step-by-step fix guide
- Updated DEPLOY_HEROKU.md dengan buildpack baru
- Updated deploy-heroku.sh script
- Alternative buildpacks documented

---

## Update Sebelumnya - Heroku Deployment Support

### ☁️ Heroku Deployment
- **One-click deploy** dengan Deploy to Heroku button
- **app.json** untuk konfigurasi Heroku otomatis
- **Procfile** untuk web dyno configuration
- **Buildpack** support untuk Puppeteer/Chromium
- **Environment variables** untuk production
- **Deploy script** otomatis (`deploy-heroku.sh`)
- **Dokumentasi lengkap** deployment di `DEPLOY_HEROKU.md`

### 🔧 Configuration Updates
- PORT dari environment variable (support Heroku)
- PUPPETEER_EXECUTABLE_PATH untuk custom Chromium path
- Engine requirements di package.json
- .slugignore untuk optimize slug size
- .gitignore untuk keamanan

### 📖 Dokumentasi
- DEPLOY_HEROKU.md - Panduan deployment lengkap
- Quick deploy script untuk Heroku CLI
- Deploy button di README.md
- Troubleshooting guide

---

## Update Sebelumnya - Headless Mode & Linux Support

### 🐧 Support Linux/Ubuntu
- Menambahkan args Chromium yang kompatibel dengan Linux
- Script instalasi otomatis untuk Ubuntu (`install-ubuntu.sh`)
- Dokumentasi lengkap instalasi dependencies
- Testing di environment headless Linux

### 👻 Headless Mode (Production Ready)
- Kembali ke headless mode untuk production
- Tidak ada tampilan browser (berjalan di background)
- Optimized untuk VPS/Server Linux
- Args tambahan:
  - `--disable-dev-shm-usage` (shared memory issue di Docker/VPS)
  - `--disable-accelerated-2d-canvas` (GPU rendering)
  - `--disable-gpu` (GPU acceleration)
  - `--window-size=1920,1080` (consistent viewport)

### 📖 Dokumentasi
- README.md lengkap dengan panduan Windows & Linux
- Install script untuk Ubuntu
- Troubleshooting guide
- Struktur file yang jelas

---

## Update Sebelumnya - Error Handling & Debugging

### 🔧 Perbaikan yang Dilakukan:

#### 1. **Timeout yang Lebih Panjang**
- Meningkatkan timeout dari 10 detik menjadi 30 detik untuk halaman tanggal lahir
- Menambah timeout untuk semua selector penting menjadi 15-20 detik

#### 2. **Multiple Selector Fallback**
- Menggunakan `Promise.race()` dengan beberapa selector alternatif
- Jika selector utama gagal, akan mencoba selector cadangan
- Selector untuk tanggal lahir: `.gate_birthday-picker-input`, `input[placeholder*="year"]`, `input[type="text"]`

#### 3. **Delay Strategis**
- Menambahkan delay 2 detik setelah klik button signup
- Menambahkan delay 1 detik setelah setiap aksi penting
- Delay 1 detik antar pemilihan bulan dan hari
- Delay 3 detik setelah input OTP untuk verifikasi

#### 4. **Browser Mode: Non-Headless**
- Browser sekarang muncul secara visual (`headless: false`)
- Anda bisa melihat proses pembuatan akun secara real-time
- Memudahkan debugging dan melihat error

#### 5. **Screenshot Error**
- Otomatis menyimpan screenshot jika terjadi error
- File: `error-birthday-page.png`
- Membantu identifikasi masalah selector atau tampilan

#### 6. **Progress Message yang Lebih Detail**
- Menambahkan pesan progress untuk setiap step
- `📅 Memilih bulan...`
- `📅 Memilih hari...`
- `➡️ Melanjutkan ke step berikutnya...`

### 📋 Cara Penggunaan:

```bash
# Install dependencies
npm install

# Jalankan server
npm start

# Buka browser
http://localhost:3000
```

### 🐛 Troubleshooting:

**Jika masih error pada halaman tanggal lahir:**
1. Pastikan koneksi internet stabil
2. Cek file screenshot `error-birthday-page.png` untuk melihat tampilan saat error
3. Perhatikan browser yang muncul - lihat apa yang terjadi
4. Selector mungkin berubah - update selector di `main.js`

**Jika timeout terlalu cepat:**
- Edit `main.js` dan tambah timeout di baris 87 (saat ini 30000ms = 30 detik)

**Jika ingin kembali ke headless mode:**
- Edit `main.js` baris 15: ubah `headless: false` menjadi `headless: true`

### 🔍 Debugging Tips:

1. **Lihat Browser**: Sekarang browser muncul, perhatikan proses yang terjadi
2. **Cek Console**: Lihat terminal untuk progress messages
3. **Screenshot**: Jika error, cek file `error-birthday-page.png`
4. **Selector Inspector**: Buka DevTools di browser untuk cek selector yang benar

### 📝 Catatan:

- Browser akan tetap terbuka selama proses (tidak auto-close saat error)
- Delay yang lebih panjang membuat proses sedikit lebih lambat tapi lebih stabil
- Screenshot hanya dibuat saat terjadi error pada halaman tanggal lahir

