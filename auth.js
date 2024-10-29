// auth.js
const axios = require('axios');
const config = require('./config');

async function refreshToken() {
    try {
        console.log("Refresh"); 
        const response = await axios.post(config.API_REFRESH_URL, {
            refresh_token: config.REFRESH_TOKEN,
        });
        config.ACCESS_TOKEN = response.data.access_token;
        config.REFRESH_TOKEN = response.data.refresh_token;
        console.log("Tokens refreshed successfully."); 
    } catch (error) {
        console.error("Error during token refresh:", error.response ? error.response.data : error.message);
    }
}

module.exports = { refreshToken };
