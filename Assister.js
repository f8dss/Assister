const axios = require('axios');
const { accessTokens } = require('./akun');


async function claimDailyPoints(accessToken) {
    const ora = await import('ora');
    const spinner = ora.default('Proses su...').start();

    const apiUrl = 'https://api.assisterr.ai/incentive/users/me/daily_points/';

    try {
        
        const response = await axios.post(apiUrl, {}, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        
        spinner.succeed('Oke berhasil!');
        console.log('Data klaim untuk token:', accessToken, response.data);
    } catch (error) {
        
        spinner.fail('Blok gagal.');
        console.error('Kesalahan untuk token:', accessToken, error.response ? error.response.data : error.message);
    }
}


async function claimForAllAccounts() {
    for (const accessToken of accessTokens) {
        await claimDailyPoints(accessToken); 
    }
}


const twelveHoursInMilliseconds = 12 * 60 * 60 * 1000;

claimForAllAccounts();

setInterval(() => {
    console.log('Ngkok manehh...');
    claimForAllAccounts(); 
}, twelveHoursInMilliseconds);
