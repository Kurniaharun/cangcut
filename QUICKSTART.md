# 🚀 Quick Start Guide - CapCut Maker

## Windows

```bash
# 1. Install dependencies
npm install

# 2. Start server
npm start

# 3. Open browser
# http://localhost:3000
```

## Linux/Ubuntu

### Metode 1: Auto Install (Recommended)

```bash
# Run install script
sudo bash install-ubuntu.sh

# Start server
npm start

# Open browser
# http://localhost:3000
```

### Metode 2: Manual Install

```bash
# 1. Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 2. Install Puppeteer dependencies
sudo apt-get install -y \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libgbm1 \
    libglib2.0-0 \
    libgtk-3-0 \
    libnss3 \
    libxss1 \
    xdg-utils

# 3. Install NPM dependencies
npm install

# 4. Start server
npm start

# Open browser: http://localhost:3000
```

## VPS/Server (No Desktop)

```bash
# Install dependencies
sudo bash install-ubuntu.sh

# Start server (keep running)
npm start

# Or run in background with PM2
npm install -g pm2
pm2 start server.js --name capcut-maker
pm2 save
pm2 startup
```

Akses dari komputer lain:
```
http://YOUR_SERVER_IP:3000
```

## Docker (Optional)

```bash
# Build image
docker build -t capcut-maker .

# Run container
docker run -d -p 3000:3000 capcut-maker
```

## Penggunaan

1. **Buka browser** → `http://localhost:3000`
2. **Masukkan email** → Email yang ingin didaftarkan
3. **Masukkan password** → Kosongkan untuk default `Masokbre123@`
4. **Klik Generate** → Tunggu proses
5. **Input OTP** → Popup akan muncul, masukkan OTP dari email
6. **Selesai!** → Akun tersimpan di `accounts.txt`

## Troubleshooting

### Port 3000 sudah digunakan?

Edit `server.js`:
```javascript
const PORT = 3001; // Ganti port
```

### Error: Browser tidak bisa jalan?

**Linux/Ubuntu:**
```bash
# Install ulang dependencies
sudo apt-get install -y chromium-browser chromium-codecs-ffmpeg
```

**Windows:**
Pastikan Chromium terinstall otomatis saat `npm install`

### Mau lihat browser saat proses? (Debug mode)

Edit `main.js` line 15:
```javascript
headless: false, // Ubah dari true ke false
```

## Akses Remote (VPS)

Jika jalan di VPS dan ingin akses dari komputer lain:

1. **Pastikan port 3000 terbuka:**
```bash
sudo ufw allow 3000
```

2. **Akses dari browser:**
```
http://IP_SERVER:3000
```

3. **Gunakan ngrok (alternatif):**
```bash
# Install ngrok
npm install -g ngrok

# Expose port
ngrok http 3000

# Akses via URL ngrok
```

## Production Deployment

### Dengan PM2 (Recommended)

```bash
# Install PM2
npm install -g pm2

# Start
pm2 start server.js --name capcut-maker

# Auto restart on server reboot
pm2 startup
pm2 save

# Monitor
pm2 monit

# Logs
pm2 logs capcut-maker
```

### Dengan systemd

Buat file `/etc/systemd/system/capcut-maker.service`:

```ini
[Unit]
Description=CapCut Maker Service
After=network.target

[Service]
Type=simple
User=yourusername
WorkingDirectory=/path/to/capcut-bot-main
ExecStart=/usr/bin/node server.js
Restart=always

[Install]
WantedBy=multi-user.target
```

Jalankan:
```bash
sudo systemctl enable capcut-maker
sudo systemctl start capcut-maker
sudo systemctl status capcut-maker
```

## Tips

- 💡 Default password: `Masokbre123@`
- 💡 Akun tersimpan di `accounts.txt`
- 💡 Screenshot error otomatis tersimpan jika ada error
- 💡 Bisa jalan 24/7 di VPS dengan PM2
- 💡 Web interface bisa diakses dari mana saja

---

Butuh bantuan? Lihat [README.md](README.md) atau [CHANGELOG.md](CHANGELOG.md)

