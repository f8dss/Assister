const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '../config/config.env');

// Fungsi untuk memperbarui access token di file .env
function updateEnvToken(newToken) {
    let envData = fs.readFileSync(envPath, 'utf8');
    envData = envData.replace(/ACCESS_TOKEN=.*/g, `ACCESS_TOKEN=${newToken}`);
    fs.writeFileSync(envPath, envData);
    console.log('ACCESS_TOKEN berhasil diperbarui di config.env');
}

module.exports = { updateEnvToken };
