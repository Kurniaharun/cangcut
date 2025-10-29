# 🚀 Deploy ke Heroku - CapCut Maker

Panduan lengkap untuk deploy aplikasi CapCut Maker ke Heroku.

## 📋 Prasyarat

1. **Akun Heroku** - [Daftar gratis di sini](https://signup.heroku.com/)
2. **Heroku CLI** - [Download dan install](https://devcenter.heroku.com/articles/heroku-cli)
3. **Git** - Untuk deploy via Git

## 🎯 Metode Deployment

### Metode 1: Deploy via Heroku CLI (Recommended)

#### 1. Login ke Heroku

```bash
heroku login
```

Akan membuka browser untuk login.

#### 2. Clone atau masuk ke directory project

```bash
cd capcut-bot-main
```

#### 3. Inisialisasi Git (jika belum)

```bash
git init
git add .
git commit -m "Initial commit"
```

#### 4. Buat aplikasi Heroku

```bash
# Buat app dengan nama random
heroku create

# Atau dengan nama spesifik
heroku create your-app-name
```

#### 5. Tambahkan Buildpack untuk Puppeteer

```bash
# Clear buildpacks (jika ada)
heroku buildpacks:clear

# Buildpack untuk Chrome/Chromium (official Heroku)
heroku buildpacks:add --index 1 https://github.com/heroku/heroku-buildpack-google-chrome

# Buildpack Node.js
heroku buildpacks:add --index 2 heroku/nodejs
```

#### 6. Set Environment Variables

```bash
heroku config:set PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
heroku config:set PUPPETEER_SKIP_DOWNLOAD=true
heroku config:set NODE_ENV=production
```

#### 7. Deploy!

```bash
git push heroku master
# Atau jika branch Anda adalah main:
git push heroku main
```

#### 8. Buka aplikasi

```bash
heroku open
```

### Metode 2: Deploy via GitHub (Automatic)

#### 1. Push ke GitHub

```bash
# Inisialisasi Git
git init
git add .
git commit -m "Initial commit"

# Tambahkan remote GitHub
git remote add origin https://github.com/username/repo-name.git
git push -u origin main
```

#### 2. Connect ke Heroku Dashboard

1. Buka [Heroku Dashboard](https://dashboard.heroku.com/)
2. Klik **"New"** → **"Create new app"**
3. Masukkan nama app
4. Pilih region (US atau Europe)
5. Klik **"Create app"**

#### 3. Setup Buildpacks

Di tab **Settings**:
1. Scroll ke **Buildpacks**
2. Klik **"Add buildpack"**
3. Tambahkan (urutan penting!):
   - `https://github.com/heroku/heroku-buildpack-google-chrome`
   - `heroku/nodejs`

#### 4. Setup Config Vars

Di tab **Settings** → **Config Vars**:
```
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD = true
PUPPETEER_SKIP_DOWNLOAD = true
NODE_ENV = production
```

#### 5. Connect GitHub

Di tab **Deploy**:
1. Pilih **GitHub** sebagai deployment method
2. Connect akun GitHub
3. Pilih repository
4. Enable **Automatic Deploys** (optional)
5. Klik **Deploy Branch**

#### 6. Tunggu deployment selesai

Lihat log di dashboard untuk memastikan deploy berhasil.

### Metode 3: Deploy Button (One-Click)

Tambahkan button ini ke README:

```markdown
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)
```

User tinggal klik button dan deploy otomatis!

## ✅ Verifikasi Deployment

Setelah deploy:

```bash
# Cek status
heroku ps

# Lihat logs
heroku logs --tail

# Open app
heroku open
```

Atau buka di browser:
```
https://your-app-name.herokuapp.com
```

## 🔧 Troubleshooting

### Error: Application Error

Cek logs:
```bash
heroku logs --tail
```

### Error: Build failed

**Pastikan buildpack sudah ditambahkan dengan urutan yang benar:**
```bash
heroku buildpacks
```

Harus menampilkan:
1. `https://github.com/heroku/heroku-buildpack-google-chrome`
2. `heroku/nodejs`

**Jika salah, clear dan tambah ulang:**
```bash
heroku buildpacks:clear
heroku buildpacks:add https://github.com/heroku/heroku-buildpack-google-chrome
heroku buildpacks:add heroku/nodejs
```

### Error: Browser launch failed / Chrome not found

**Cek environment variables:**
```bash
heroku config
```

Pastikan ada:
- `PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true`
- `PUPPETEER_SKIP_DOWNLOAD=true`
- `NODE_ENV=production`

**Set jika belum ada:**
```bash
heroku config:set PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
heroku config:set PUPPETEER_SKIP_DOWNLOAD=true
heroku config:set NODE_ENV=production
```

**Restart app:**
```bash
heroku restart
```

### Error: Memory issues (R14)

Heroku free tier memiliki limit 512MB RAM. Puppeteer cukup memory-intensive.

**Upgrade ke Hobby dyno:**
```bash
heroku dyno:type hobby
```

Atau optimize memory di `main.js`:
```javascript
args: [
    '--disable-dev-shm-usage',
    '--single-process', // Tambahkan ini
    '--no-zygote' // Dan ini
]
```

### App tidur setelah 30 menit (Free tier)

Aplikasi di free tier akan sleep setelah 30 menit tidak ada aktivitas.

**Solusi:**
1. Upgrade ke Hobby dyno ($7/bulan)
2. Gunakan ping service seperti [UptimeRobot](https://uptimerobot.com/)

## 📊 Monitoring

### Lihat logs real-time

```bash
heroku logs --tail
```

### Restart aplikasi

```bash
heroku restart
```

### Scaling

```bash
# Scale up
heroku ps:scale web=1

# Scale down
heroku ps:scale web=0
```

## 💰 Biaya

### Free Tier
- ✅ 550-1000 dyno hours/bulan (gratis)
- ⚠️ Sleep setelah 30 menit inaktif
- ⚠️ 512MB RAM
- ⚠️ Restart setiap 24 jam

### Hobby ($7/bulan)
- ✅ Always on (tidak sleep)
- ✅ 512MB RAM
- ✅ Tidak restart otomatis

### Standard ($25-$50/bulan)
- ✅ 1GB-2.5GB RAM
- ✅ Horizontal scaling
- ✅ Metrics dashboard

## 🔐 Environment Variables (Optional)

Jika ingin menambahkan config tambahan:

```bash
# Custom port (opsional, Heroku sudah set otomatis)
heroku config:set PORT=3000

# Custom password default
heroku config:set DEFAULT_PASSWORD=YourPassword123

# Debug mode
heroku config:set DEBUG=true
```

Update `main.js` untuk menggunakan env var:
```javascript
const DEFAULT_PASSWORD = process.env.DEFAULT_PASSWORD || 'Masokbre123@';
```

## 📝 Update Aplikasi

Setelah ada perubahan code:

```bash
# Commit changes
git add .
git commit -m "Update features"

# Push ke Heroku
git push heroku main

# Atau via GitHub (jika auto-deploy enabled)
git push origin main
```

## 🌐 Custom Domain (Opsional)

Gunakan domain sendiri:

```bash
# Tambahkan domain
heroku domains:add www.yourdomain.com

# Lihat DNS target
heroku domains
```

Kemudian atur DNS CNAME di provider domain Anda.

## 🎉 Deploy Berhasil!

URL aplikasi Anda:
```
https://your-app-name.herokuapp.com
```

## 📚 Resources

- [Heroku Node.js Guide](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Puppeteer on Heroku](https://github.com/jontewks/puppeteer-heroku-buildpack)
- [Heroku CLI Commands](https://devcenter.heroku.com/articles/heroku-cli-commands)
- [Heroku Pricing](https://www.heroku.com/pricing)

## 💡 Tips

1. **Gunakan Hobby dyno** untuk production ($7/bulan worth it)
2. **Enable auto-deploy** dari GitHub untuk kemudahan update
3. **Setup monitoring** dengan UptimeRobot
4. **Backup accounts.txt** secara berkala (download manual)
5. **Check logs** regularly untuk troubleshooting

---

Butuh bantuan? Buka issue di GitHub atau hubungi admin@countryssh.com

