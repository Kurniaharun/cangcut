# 🔧 Heroku Chrome Error - Fix Guide

## ❌ Error yang Terjadi

```
Error: Could not find Chrome (ver. 134.0.6998.35).
This can occur if either
1. you did not perform an installation before running the script
2. your cache path is incorrectly configured
```

## ✅ Solusi Lengkap

### Step 1: Clear Buildpacks yang Lama

```bash
# Login ke Heroku
heroku login

# Masuk ke app directory (atau gunakan --app APP_NAME)
cd your-app-directory

# Clear semua buildpack
heroku buildpacks:clear

# Atau dengan app name:
heroku buildpacks:clear --app your-app-name
```

### Step 2: Tambah Buildpack yang Benar

```bash
# 1. Google Chrome buildpack (OFFICIAL dari Heroku)
heroku buildpacks:add --index 1 https://github.com/heroku/heroku-buildpack-google-chrome

# 2. Node.js buildpack
heroku buildpacks:add --index 2 heroku/nodejs
```

### Step 3: Set Environment Variables

```bash
# Skip download Chromium (karena sudah ada dari buildpack)
heroku config:set PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
heroku config:set PUPPETEER_SKIP_DOWNLOAD=true

# Production mode
heroku config:set NODE_ENV=production
```

### Step 4: Verify Configuration

```bash
# Cek buildpacks
heroku buildpacks

# Harus menampilkan:
# 1. https://github.com/heroku/heroku-buildpack-google-chrome
# 2. heroku/nodejs
```

```bash
# Cek environment variables
heroku config

# Harus ada:
# PUPPETEER_SKIP_CHROMIUM_DOWNLOAD: true
# PUPPETEER_SKIP_DOWNLOAD: true
# NODE_ENV: production
```

### Step 5: Redeploy

```bash
# Commit changes (jika ada perubahan code)
git add .
git commit -m "Fix Heroku Chrome configuration"

# Push ke Heroku
git push heroku main
# atau
git push heroku master
```

### Step 6: Restart App

```bash
heroku restart
```

### Step 7: Check Logs

```bash
heroku logs --tail
```

## 🔍 Verifikasi

Setelah deploy, buka aplikasi:
```bash
heroku open
```

Coba buat akun dan lihat apakah masih error.

## 🎯 Alternative Buildpacks

Jika buildpack di atas tidak work, coba alternative:

### Option 1: Puppeteer Heroku Buildpack
```bash
heroku buildpacks:clear
heroku buildpacks:add --index 1 https://github.com/jontewks/puppeteer-heroku-buildpack
heroku buildpacks:add --index 2 heroku/nodejs
```

### Option 2: Chrome Binary Buildpack
```bash
heroku buildpacks:clear
heroku buildpacks:add --index 1 https://github.com/heroku/heroku-buildpack-apt
heroku buildpacks:add --index 2 heroku/nodejs
```

Kemudian buat file `Aptfile`:
```
google-chrome-stable
```

## 🐛 Troubleshooting Lanjutan

### Error: Buildpack tidak bisa ditambahkan

**Solusi:** Login ulang
```bash
heroku logout
heroku login
heroku buildpacks:add ...
```

### Error: Heroku CLI not found

**Solusi:** Install Heroku CLI
- Windows: https://devcenter.heroku.com/articles/heroku-cli#windows
- Linux: `curl https://cli-assets.heroku.com/install.sh | sh`
- Mac: `brew tap heroku/brew && brew install heroku`

### Error: Permission denied

**Solusi:** Pastikan Anda owner/collaborator app
```bash
heroku apps:info --app your-app-name
```

### Error: Git push rejected

**Solusi:** Force push (hati-hati!)
```bash
git push heroku main --force
```

### Error: Memory exceeded (R14)

**Solusi:** Upgrade dyno atau optimize
```bash
# Upgrade ke Hobby ($7/month)
heroku dyno:type hobby

# Atau optimize args di main.js
args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--single-process',      // Tambahkan
    '--no-zygote'           // Tambahkan
]
```

## 📊 Quick Check Commands

```bash
# 1. Cek buildpacks
heroku buildpacks --app your-app-name

# 2. Cek config
heroku config --app your-app-name

# 3. Cek logs
heroku logs --tail --app your-app-name

# 4. Cek dyno status
heroku ps --app your-app-name

# 5. Restart app
heroku restart --app your-app-name
```

## 📝 Manual Setup via Dashboard

Jika CLI tidak work:

1. **Buka Heroku Dashboard**: https://dashboard.heroku.com
2. **Pilih App Anda**
3. **Tab Settings**
4. **Buildpacks Section:**
   - Remove semua buildpack yang ada
   - Add: `https://github.com/heroku/heroku-buildpack-google-chrome`
   - Add: `heroku/nodejs`
5. **Config Vars Section:**
   - Add: `PUPPETEER_SKIP_CHROMIUM_DOWNLOAD` = `true`
   - Add: `PUPPETEER_SKIP_DOWNLOAD` = `true`
   - Add: `NODE_ENV` = `production`
6. **Tab Deploy**
7. **Manual Deploy** → Deploy Branch

## 💡 Prevention Tips

1. **Jangan pernah** commit `node_modules/`
2. **Selalu** set environment variables sebelum deploy
3. **Test lokal** dulu sebelum deploy
4. **Monitor logs** setelah deploy
5. **Backup** accounts.txt secara berkala

## 🆘 Still Not Working?

Jika masih error setelah semua langkah:

1. **Hapus dan buat app baru:**
```bash
heroku apps:destroy your-app-name
heroku create new-app-name
# Ulangi setup dari awal
```

2. **Gunakan Deploy Button:**
   - Klik "Deploy to Heroku" di README
   - Konfigurasi otomatis

3. **Contact Support:**
   - Email: admin@countryssh.com
   - GitHub Issues: [Create Issue]

## ✅ Success Checklist

- [ ] Buildpacks correct (Google Chrome + Node.js)
- [ ] Environment variables set (3 vars)
- [ ] Code sudah di-push ke Heroku
- [ ] App restarted
- [ ] Logs tidak ada error
- [ ] App bisa diakses
- [ ] Test create account works

---

**Last Updated:** 2025-01-30
**Works with:** Puppeteer v23.x, Heroku Stack-22

