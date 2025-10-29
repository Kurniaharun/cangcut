import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import randomUserAgent from 'user-agents';
import fs from 'fs';

// Gunakan stealth mode agar tidak terdeteksi sebagai bot
puppeteer.use(StealthPlugin());

// Default password
const DEFAULT_PASSWORD = 'Masokbre123@';

// Fungsi untuk membuat akun CapCut
const createCapCutAccount = async (email, password, onOtpRequest, onProgress) => {
    const browser = await puppeteer.launch({ 
        headless: true, // Headless mode (tanpa tampilan browser)
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || null,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--disable-gpu',
            '--window-size=1920,1080'
        ]
    });
    const page = await browser.newPage();

    // Gunakan User-Agent random
    await page.setUserAgent(new randomUserAgent().toString());

    // Atur viewport secara acak
    await page.setViewport({
        width: Math.floor(Math.random() * (1920 - 1280) + 1280),
        height: Math.floor(Math.random() * (1080 - 720) + 720),
        deviceScaleFactor: 1,
        hasTouch: false,
        isMobile: false
    });

    onProgress('🚀 Memulai proses pembuatan akun...');

    // Gunakan password yang diberikan atau default
    password = password || DEFAULT_PASSWORD;
    
    onProgress(`📧 Email yang digunakan: ${email}`);

    // Mulai proses pendaftaran di CapCut
    onProgress('🌐 Membuka halaman signup CapCut...');
    try {
        await page.goto('https://www.capcut.com/id-id/signup', { waitUntil: 'networkidle2', timeout: 60000 });
        onProgress('✅ Halaman signup dibuka!');
    } catch (error) {
        onProgress('❌ Gagal membuka halaman signup!');
        throw error;
    }

    onProgress('✏️ Mengisi email...');
    try {
        // Isi email
        await page.type('input[name="signUsername"]', email, { delay: 100 });

        // Klik tombol lanjut
        await page.waitForSelector('.lv_sign_in_panel_wide-primary-button', { visible: true, timeout: 10000 });
        await page.click('.lv_sign_in_panel_wide-primary-button');

        onProgress('✅ Berhasil mengisi email!');
    } catch (error) {
        onProgress('❌ Gagal mengisi email!');
        throw error;
    }

    // Isi password
    onProgress('🔐 Mengisi password...');
    try {
        await page.waitForSelector('input[type="password"]', { visible: true, timeout: 15000 });
        await page.type('input[type="password"]', password, { delay: 100 });

        // Klik tombol daftar
        await page.waitForSelector('.lv_sign_in_panel_wide-sign-in-button', { visible: true, timeout: 15000 });
        await page.click('.lv_sign_in_panel_wide-sign-in-button');
        onProgress('✅ Password berhasil diisi!');
        
        // Tunggu sedikit setelah klik button untuk memastikan navigasi selesai
        await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
        onProgress('❌ Gagal dalam proses pendaftaran!');
        throw error;
    }

    // Tunggu hingga input tanggal lahir muncul
    onProgress('📅 Menunggu halaman tanggal lahir...');
    try {
        // Coba beberapa selector yang mungkin
        await Promise.race([
            page.waitForSelector('.gate_birthday-picker-input', { visible: true, timeout: 30000 }),
            page.waitForSelector('input[placeholder*="year" i]', { visible: true, timeout: 30000 }),
            page.waitForSelector('input[type="text"]', { visible: true, timeout: 30000 })
        ]);
        onProgress('✅ Halaman tanggal lahir dimuat!');
        
        // Tunggu sedikit untuk memastikan semua elemen loaded
        await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
        onProgress('❌ Gagal memuat halaman tanggal lahir!');
        // Save screenshot untuk debugging
        try {
            await page.screenshot({ path: 'error-birthday-page.png', fullPage: true });
            onProgress('📸 Screenshot error disimpan ke error-birthday-page.png');
        } catch (e) {
            // Ignore screenshot error
        }
        throw error;
    }

    // Fungsi untuk mendapatkan angka acak dalam rentang tertentu
    const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    // Tahun acak antara 1990 - 2005
    const randomYear = getRandomInt(1990, 2005);

    // Daftar bulan dan jumlah hari
    const months = [
        { name: "Januari", days: 31 },
        { name: "Februari", days: 28 },
        { name: "Maret", days: 31 },
        { name: "April", days: 30 },
        { name: "Mei", days: 31 },
        { name: "Juni", days: 30 },
        { name: "Juli", days: 31 },
        { name: "Agustus", days: 31 },
        { name: "September", days: 30 },
        { name: "Oktober", days: 31 },
        { name: "November", days: 30 },
        { name: "Desember", days: 31 }
    ];

    // Pilih bulan acak
    const randomMonthIndex = getRandomInt(0, months.length - 1);
    const randomMonth = months[randomMonthIndex].name;

    // Pilih hari acak sesuai bulan
    const randomDay = getRandomInt(1, months[randomMonthIndex].days);

    // Isi tahun lahir dengan nilai acak
    onProgress('🎂 Mengisi tanggal lahir...');
    try {
        // Coba ketik tahun dengan beberapa cara
        try {
            await page.type('.gate_birthday-picker-input', String(randomYear), { delay: 100 });
        } catch (e) {
            // Jika gagal, coba selector alternatif
            const yearInput = await page.$('input[type="text"]');
            if (yearInput) {
                await yearInput.type(String(randomYear), { delay: 100 });
            }
        }
        
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Pilih dropdown bulan
        onProgress('📅 Memilih bulan...');
        await page.click('.gate_birthday-picker-selector:nth-of-type(1)');
        await new Promise(resolve => setTimeout(resolve, 1000));
        await page.waitForSelector('.lv-select-popup li', { visible: true, timeout: 10000 });

        // Pilih bulan acak dari dropdown
        await page.evaluate((randomMonth) => {
            let items = document.querySelectorAll('.lv-select-popup li');
            items.forEach(item => {
                if (item.innerText.trim() === randomMonth) {
                    item.click();
                }
            });
        }, randomMonth);
        
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Pilih dropdown hari
        onProgress('📅 Memilih hari...');
        await page.click('.gate_birthday-picker-selector:nth-of-type(2)');
        await new Promise(resolve => setTimeout(resolve, 1000));
        await page.waitForSelector('.lv-select-popup li', { visible: true, timeout: 10000 });

        // Pilih hari acak dari dropdown
        await page.evaluate((randomDay) => {
            let items = document.querySelectorAll('.lv-select-popup li');
            items.forEach(item => {
                if (item.innerText.trim() === String(randomDay)) {
                    item.click();
                }
            });
        }, randomDay);

        const birthDate = `${randomDay} ${randomMonth} ${randomYear}`;
        onProgress(`📆 Tanggal lahir: ${birthDate}`);
        
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Klik tombol "Berikutnya"
        onProgress('➡️ Melanjutkan ke step berikutnya...');
        await page.waitForSelector('.lv_sign_in_panel_wide-birthday-next', { visible: true, timeout: 10000 });
        await page.click('.lv_sign_in_panel_wide-birthday-next');
        
        // Tunggu setelah klik untuk memastikan navigasi selesai
        await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
        onProgress('❌ Gagal mengisi tanggal lahir!');
        throw error;
    }

    // Tunggu input OTP dari user melalui web interface
    onProgress('⏳ Menunggu kode OTP...');
    const otpCode = await onOtpRequest();
    onProgress(`📩 Kode OTP diterima: ${otpCode}`);

    // Masukkan kode OTP
    onProgress('🔑 Memasukkan kode OTP...');
    try {
        // Coba beberapa selector untuk input OTP
        await Promise.race([
            page.waitForSelector('input.lv-input', { visible: true, timeout: 20000 }),
            page.waitForSelector('input[type="text"]', { visible: true, timeout: 20000 }),
            page.waitForSelector('input[placeholder*="code" i]', { visible: true, timeout: 20000 })
        ]);
        
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Coba ketik OTP
        try {
            await page.type('input.lv-input', otpCode, { delay: 100 });
        } catch (e) {
            // Jika gagal, coba selector lain
            const otpInput = await page.$('input[type="text"]');
            if (otpInput) {
                await otpInput.type(otpCode, { delay: 100 });
            }
        }
        
        onProgress('✅ Kode OTP berhasil dimasukkan!');
        
        // Tunggu verifikasi selesai
        await new Promise(resolve => setTimeout(resolve, 3000));
    } catch (error) {
        onProgress('❌ Gagal memasukkan kode OTP!');
        throw error;
    }

    const birthDate = `${randomDay} ${randomMonth} ${randomYear}`;
    
    // Simpan ke file accounts.txt
    const accountData = `Email: ${email}\nPassword: ${password}\nTanggal Lahir: ${birthDate}\n----------------------\n`;
    fs.appendFileSync('accounts.txt', accountData, 'utf8');

    onProgress('💾 Akun berhasil disimpan!');

    // Tunggu beberapa detik sebelum menutup
    await new Promise(resolve => setTimeout(resolve, 3000));
    await browser.close();

    onProgress('🎉 Akun berhasil dibuat!');

    return { email, password, birthDate };
};

// Export untuk digunakan oleh server
export { createCapCutAccount, DEFAULT_PASSWORD };