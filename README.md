# 🎬 CapCut Maker - Web Interface

Bot otomatis untuk membuat akun CapCut dengan tampilan web interface yang modern dan mudah digunakan.

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## ✨ Fitur

- 🌐 **Web Interface Modern** - Tampilan yang keren dan user-friendly
- 📧 **Input Email Manual** - Masukkan email Anda sendiri
- 🔐 **Password Customizable** - Default: `Masokbre123@` atau custom
- 🔑 **OTP Manual Input** - Input OTP melalui popup modal
- 📊 **Progress Real-time** - Lihat progress pembuatan akun secara live
- 💾 **Auto Save** - Akun tersimpan otomatis ke `accounts.txt`
- 🛡️ **Stealth Mode** - Puppeteer Extra dengan plugin anti-deteksi
- 🔄 **Multiple Fallback** - Selector cadangan jika selector utama gagal
- 🐧 **Cross Platform** - Support Windows & Linux/Ubuntu

## 🚀 Deployment

### Deploy ke Heroku (One-Click)

Klik button di atas atau ikuti panduan lengkap: [DEPLOY_HEROKU.md](DEPLOY_HEROKU.md)

**⚠️ Chrome Error di Heroku?** → [HEROKU_FIX.md](HEROKU_FIX.md)

### Deploy ke VPS/Server

Lihat panduan: [QUICKSTART.md](QUICKSTART.md)

## 📦 Instalasi Lokal

### Requirements
- Node.js (versi 14 atau lebih baru)
- npm atau yarn

### Windows

```bash
# Clone atau download repository
git clone <repo-url>
cd capcut-bot-main

# Install dependencies
npm install

# Jalankan server
npm start
```

### Linux/Ubuntu

```bash
# Install Node.js (jika belum terinstall)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install dependencies yang diperlukan untuk Puppeteer
sudo apt-get update
sudo apt-get install -y \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libc6 \
    libcairo2 \
    libcups2 \
    libdbus-1-3 \
    libexpat1 \
    libfontconfig1 \
    libgbm1 \
    libgcc1 \
    libglib2.0-0 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libstdc++6 \
    libx11-6 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxi6 \
    libxrandr2 \
    libxrender1 \
    libxss1 \
    libxtst6 \
    lsb-release \
    wget \
    xdg-utils

# Clone atau download repository
git clone <repo-url>
cd capcut-bot-main

# Install dependencies
npm install

# Jalankan server
npm start
```

## 📖 Cara Penggunaan

1. **Start Server**
   ```bash
   npm start
   ```

2. **Buka Browser**
   - Akses: `http://localhost:3000`

3. **Isi Form**
   - **Email**: Masukkan email yang ingin didaftarkan
   - **Password**: Kosongkan untuk default `Masokbre123@` atau isi custom password

4. **Klik Generate**
   - Proses akan dimulai
   - Lihat progress secara real-time di layar

5. **Input OTP**
   - Popup modal akan muncul otomatis
   - Cek email Anda untuk mendapatkan kode OTP
   - Masukkan OTP 6 digit
   - Klik "Submit OTP"

6. **Selesai!**
   - Akun berhasil dibuat
   - Informasi akun ditampilkan di layar
   - Tersimpan otomatis di `accounts.txt`

## 📁 Struktur File

```
capcut-bot-main/
├── server.js              # Express server (backend)
├── main.js                # Logic pembuatan akun CapCut
├── package.json           # Dependencies
├── accounts.txt           # Akun yang berhasil dibuat (auto-generated)
├── CHANGELOG.md           # Dokumentasi perubahan
├── README.md              # Dokumentasi ini
└── public/
    └── index.html         # Web interface (frontend)
```

## 🔧 Konfigurasi

### Port Server
Default port: `3000`

Ubah di `server.js`:
```javascript
const PORT = 3000; // Ganti sesuai kebutuhan
```

### Default Password
Default password: `Masokbre123@`

Ubah di `main.js`:
```javascript
const DEFAULT_PASSWORD = 'Masokbre123@'; // Ganti sesuai kebutuhan
```

### Headless Mode
Default: `headless: true` (tanpa tampilan browser)

Untuk debugging, ubah di `main.js`:
```javascript
headless: false, // Browser akan muncul
```

## 🐛 Troubleshooting

### Error: EADDRINUSE (Port sudah digunakan)
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux
sudo lsof -i :3000
sudo kill -9 <PID>
```

### Error: Browser tidak bisa dijalankan di Linux
Pastikan semua dependencies Puppeteer sudah terinstall:
```bash
sudo apt-get install -y gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
```

### Error: Timeout pada halaman tertentu
- Cek koneksi internet
- Timeout sudah ditingkatkan ke 30 detik
- Lihat file `error-birthday-page.png` jika ada
- Selector website mungkin berubah

### Error: OTP tidak bisa diinput
- Pastikan OTP 6 digit
- Coba lagi dengan OTP baru
- Cek browser console untuk error detail

## 🔒 Keamanan

- ⚠️ Jangan share file `accounts.txt` ke publik
- ⚠️ Gunakan email yang valid dan Anda miliki
- ⚠️ Password default sebaiknya diganti untuk keamanan
- ⚠️ Bot ini untuk keperluan edukatif

## 📝 Changelog

### Latest Version
- ✅ Web interface dengan tampilan modern
- ✅ Input email & password manual
- ✅ Input OTP via popup modal
- ✅ Progress tracking real-time
- ✅ Multiple selector fallback
- ✅ Support Linux/Ubuntu
- ✅ Headless mode optimization
- ✅ Error handling & screenshot

Lihat [CHANGELOG.md](CHANGELOG.md) untuk detail lengkap.

## 🤝 Contributing

Pull requests are welcome! Untuk perubahan besar, silakan buka issue terlebih dahulu.

## 📜 License

[MIT License](LICENSE)

## 👨‍💻 Author

**Nanda Gunawan**
- Email: admin@countryssh.com
- Website: https://countryssh.com

---

⭐ Jika project ini membantu, berikan star di GitHub!
