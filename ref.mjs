import axios from 'axios';
import fs from 'fs';
import path from 'path';

// Mendapatkan path file tokens.json
const tokenFilePath = path.join(path.dirname(new URL(import.meta.url).pathname), 'tokens.json');

async function refreshToken(refreshToken) {
  try {
    const response = await axios.post('https://api.assisterr.ai/auth/refresh', {
      refresh_token: refreshToken
    });
    return response.data.access_token;
  } catch (error) {
    console.error('Error refreshing token:', error.response ? error.response.data : error.message);
    return null;
  }
}

function getStoredTokens() {
  if (fs.existsSync(tokenFilePath)) {
    const tokens = JSON.parse(fs.readFileSync(tokenFilePath, 'utf-8'));
    return tokens;
  }
  return { accounts: [] };
}

function updateTokens(accountId, newAccessToken) {
  let tokens = getStoredTokens();
  tokens.accounts = tokens.accounts.map(account => 
    account.id === accountId ? { ...account, accessToken: newAccessToken } : account
  );
  fs.writeFileSync(tokenFilePath, JSON.stringify(tokens, null, 2));
}

export { refreshToken, getStoredTokens, updateTokens };
