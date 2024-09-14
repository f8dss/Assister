import axios from 'axios';
import ora from 'ora';
import { getStoredTokens, refreshToken, updateTokens } from './ref.mjs';

async function claimDailyPoints(account) {
  const { id, accessToken } = account;
  const spinner = ora(`Proses su untuk ${id}...`).start();
  const apiUrl = 'https://api.assisterr.ai/incentive/users/me/daily_points/';

  try {
    const response = await axios.post(apiUrl, {}, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    spinner.succeed(`Oke berhasil untuk ${id}!`);
    console.log('Data klaim untuk akun:', id, response.data);
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Token expired, refresh token
      console.log(`Token expired untuk ${id}, attempting to refresh...`);
      const newAccessToken = await refreshToken(account.refreshToken);
      if (newAccessToken) {
        updateTokens(id, newAccessToken); // Update token in storage
        await claimDailyPoints({ ...account, accessToken: newAccessToken }); // Retry with new token
      }
    } else {
      spinner.fail(`Blok gagal untuk ${id}.`);
      console.error('Kesalahan untuk akun:', id, error.response ? error.response.data : error.message);
    }
  }
}

async function claimForAllAccounts() {
  const accounts = getStoredTokens().accounts;
  for (const account of accounts) {
    await claimDailyPoints(account);
  }
}

// Interval untuk klaim setiap 12 jam
const twelveHoursInMilliseconds = 12 * 60 * 60 * 1000;
claimForAllAccounts();
setInterval(() => {
  console.log('Ngkok manehh...');
  claimForAllAccounts();
}, twelveHoursInMilliseconds);

// Interval untuk refresh token setiap 2 jam
const twoHoursInMilliseconds = 2 * 60 * 60 * 1000;
setInterval(async () => {
  const accounts = getStoredTokens().accounts;
  for (const account of accounts) {
    const newAccessToken = await refreshToken(account.refreshToken);
    if (newAccessToken) {
      updateTokens(account.id, newAccessToken);
    }
  }
}, twoHoursInMilliseconds);
