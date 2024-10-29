// claim.js
const axios = require('axios');
const config = require('./config');

async function claimPoints() {
    try {
        console.log("otw"); 
        const response = await axios.post(config.API_CLAIM_URL, {}, {
            headers: {
                Authorization: `Bearer ${config.ACCESS_TOKEN}`,
            },
        });
        console.log("sukses", response.data); 
    } catch (error) {
        console.error("Error", error.response ? error.response.data : error.message);
    }
}

module.exports = { claimPoints };
