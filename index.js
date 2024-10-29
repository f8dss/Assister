// index.js
const { refreshToken } = require('./auth');
const { claimPoints } = require('./claim');
const config = require('./config');

async function runBot() {
    console.log("otw...."); 
    await claimPoints(); 
    
    setInterval(async () => {
        console.log("otw claim"); 
        await claimPoints();
        await refreshToken(); 
    }, 12 * 60 * 60 * 1000); 
}

runBot().catch((error) => {
    console.error("Error running bot:", error.message);
});
