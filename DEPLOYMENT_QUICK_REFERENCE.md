# 📋 Deployment Quick Reference

## 🚀 Heroku (Cloud - Recommended untuk Beginner)

### One-Click Deploy
```
Klik: Deploy to Heroku button di README.md
```

### CLI Deploy (5 menit)
```bash
# 1. Login
heroku login

# 2. Auto deploy
bash deploy-heroku.sh

# 3. Done!
heroku open
```

**Biaya:** 
- Free tier: $0 (sleep setelah 30 menit)
- Hobby: $7/bulan (always on)

**Dokumentasi:** [DEPLOY_HEROKU.md](DEPLOY_HEROKU.md)

---

## 🖥️ VPS/Server Linux (Full Control)

### Quick Setup
```bash
# 1. Auto install
sudo bash install-ubuntu.sh

# 2. Start
npm start

# 3. Done!
# Akses: http://YOUR_IP:3000
```

### PM2 (Production)
```bash
# Install PM2
npm install -g pm2

# Start & auto-restart
pm2 start server.js --name capcut-maker
pm2 startup
pm2 save

# Monitor
pm2 monit
```

**Biaya:** $3-10/bulan (VPS)

**Dokumentasi:** [QUICKSTART.md](QUICKSTART.md)

---

## 💻 Windows Lokal (Development)

```bash
# 1. Install
npm install

# 2. Start
npm start

# 3. Open browser
# http://localhost:3000
```

**Biaya:** Free

---

## 🐳 Docker (Advanced)

### Dockerfile
```dockerfile
FROM node:18-alpine

RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .

EXPOSE 3000
CMD ["node", "server.js"]
```

### Deploy
```bash
# Build
docker build -t capcut-maker .

# Run
docker run -d -p 3000:3000 capcut-maker
```

---

## 🔄 Update Setelah Deploy

### Heroku
```bash
git add .
git commit -m "Update"
git push heroku main
```

### VPS dengan PM2
```bash
git pull
pm2 restart capcut-maker
```

### Docker
```bash
docker stop capcut-maker
docker rm capcut-maker
docker build -t capcut-maker .
docker run -d -p 3000:3000 capcut-maker
```

---

## ⚙️ Environment Variables

### Required untuk Heroku
```bash
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
PUPPETEER_EXECUTABLE_PATH=/app/.apt/usr/bin/google-chrome-stable
```

### Optional untuk Semua Platform
```bash
PORT=3000                          # Custom port
DEFAULT_PASSWORD=YourPassword123   # Custom default password
NODE_ENV=production                # Production mode
```

---

## 🛠️ Troubleshooting

| Error | Platform | Solusi |
|-------|----------|--------|
| Port sudah digunakan | Semua | Ganti PORT di environment variable |
| Browser launch failed | Heroku | Cek buildpack & env vars |
| Memory exceeded | Heroku | Upgrade ke Hobby dyno |
| App tidur | Heroku Free | Upgrade atau gunakan UptimeRobot |
| Permission denied | Linux | Jalankan dengan sudo |
| Chromium not found | Docker | Install chromium di Dockerfile |

---

## 📊 Perbandingan Platform

| Feature | Heroku Free | Heroku Hobby | VPS | Lokal |
|---------|-------------|--------------|-----|-------|
| Biaya | $0 | $7/bulan | $3-10/bulan | $0 |
| Setup | ⭐⭐⭐ Easy | ⭐⭐⭐ Easy | ⭐⭐ Medium | ⭐⭐⭐ Easy |
| Always On | ❌ No | ✅ Yes | ✅ Yes | Manual |
| RAM | 512MB | 512MB | 1GB+ | Unlimited |
| Custom Domain | ✅ Yes | ✅ Yes | ✅ Yes | ❌ No |
| SSL | ✅ Auto | ✅ Auto | Manual | N/A |

---

## 🎯 Rekomendasi

### Untuk Testing
→ **Windows Lokal** atau **Heroku Free**

### Untuk Production (Personal)
→ **Heroku Hobby** ($7/bulan)

### Untuk Production (Bisnis)
→ **VPS dengan PM2** (kontrol penuh)

### Untuk Scale
→ **Docker + Kubernetes** (advanced)

---

## 📞 Support

- 📧 Email: admin@countryssh.com
- 📚 Docs: README.md, DEPLOY_HEROKU.md, QUICKSTART.md
- 🐛 Issues: GitHub Issues

---

**Quick Links:**
- [README.md](README.md) - Overview
- [DEPLOY_HEROKU.md](DEPLOY_HEROKU.md) - Heroku Detail
- [QUICKSTART.md](QUICKSTART.md) - VPS/Local Setup
- [CHANGELOG.md](CHANGELOG.md) - Version History

