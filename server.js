import express from 'express';
import { createCapCutAccount, DEFAULT_PASSWORD } from './main.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Store OTP resolver untuk setiap session
const otpResolvers = new Map();

// API endpoint untuk membuat akun
app.post('/api/create-account', async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email harus diisi' });
    }

    const sessionId = Date.now().toString();
    
    // Set up SSE (Server-Sent Events) untuk real-time updates
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const sendProgress = (message) => {
        res.write(`data: ${JSON.stringify({ type: 'progress', message })}\n\n`);
    };

    const requestOtp = () => {
        return new Promise((resolve) => {
            otpResolvers.set(sessionId, resolve);
            res.write(`data: ${JSON.stringify({ type: 'otp_request', sessionId })}\n\n`);
        });
    };

    try {
        const account = await createCapCutAccount(
            email,
            password || DEFAULT_PASSWORD,
            requestOtp,
            sendProgress
        );

        res.write(`data: ${JSON.stringify({ type: 'success', account })}\n\n`);
        res.end();
    } catch (error) {
        res.write(`data: ${JSON.stringify({ type: 'error', message: error.message })}\n\n`);
        res.end();
    } finally {
        otpResolvers.delete(sessionId);
    }
});

// API endpoint untuk submit OTP
app.post('/api/submit-otp', (req, res) => {
    const { sessionId, otp } = req.body;

    const resolver = otpResolvers.get(sessionId);
    if (resolver) {
        resolver(otp);
        res.json({ success: true });
    } else {
        res.status(400).json({ error: 'Session tidak ditemukan' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`\n🎬 CAPCUT MAKER - Web Interface`);
    console.log(`🌐 Server berjalan di: http://localhost:${PORT}`);
    console.log(`📝 Buka browser dan akses URL di atas\n`);
});

