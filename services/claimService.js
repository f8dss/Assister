const axios = require('axios');
require('dotenv').config({ path: './config/config.env' }); // Mengambil token dari .env
const { loginAndGetAccessToken } = require('./authService');

let accessToken = process.env.ACCESS_TOKEN;

// Fungsi untuk klaim poin
async function claimPoints() {
    const ora = (await import('ora')).default; // Dynamic import untuk 'ora'
    const spinner = ora('Mengklaim poin...').start();

    try {
        const response = await axios({
            method: 'post', // Mengubah metode menjadi POST jika diperlukan
            url: 'https://api.assisterr.ai/incentive/users/me/daily_points/',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        spinner.succeed('Poin berhasil diklaim: ' + response.data.points);
    } catch (error) {
        spinner.fail('Gagal klaim poin');

        if (error.response) {
            // Jika ada response dari server, tampilkan status dan data error
            console.log('Status:', error.response.status);
            console.log('Data Error:', error.response.data);
        } else if (error.request) {
            // Jika tidak ada response dari server, tampilkan request yang menyebabkan error
            console.log('Tidak ada respons dari server:', error.request);
        } else {
            // Jika ada error lain (misal, konfigurasi yang salah)
            console.log('Error:', error.message);
        }

        // Jika token expired, lakukan login ulang
        if (error.response && error.response.status === 401) {
            console.log('Token expired, mencoba login ulang...');
            accessToken = await loginAndGetAccessToken(); // Login ulang dan dapatkan token baru
            await claimPoints(); // Coba ulang klaim setelah login ulang
        }
    }
}

module.exports = { claimPoints };
