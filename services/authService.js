const axios = require('axios');
require('dotenv').config({ path: './config/config.env' }); // Mengambil data dari config.env
const { updateEnvToken } = require('../helpers/updateEnv'); // Helper untuk update token

const phraseSeed = process.env.PHRASE_SEED;

// Fungsi untuk login ulang dan mendapatkan access token baru
async function loginAndGetAccessToken() {
    try {
        const response = await axios.post('https://api.assisterr.ai/auth/login', {
            phraseSeed: phraseSeed, // Payload otentikasi
        });
        const newAccessToken = response.data.accessToken;
        updateEnvToken(newAccessToken); // Update access token di .env
        return newAccessToken;
    } catch (error) {
        console.error('Gagal login ulang:', error.response ? error.response.data.message : error.message);
        throw error;
    }
}

module.exports = { loginAndGetAccessToken };
