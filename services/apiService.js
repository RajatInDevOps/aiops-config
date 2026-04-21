const axios = require("axios");
const config = require("../config/config");

async function fetchUsers() {
    try {
        const response = await axios.get(
            `${config.API.BASE_URL}/users`,
            { timeout: config.API.TIMEOUT }
        );
        return response.data;
    } catch (err) {
        console.error("ERROR: API call failed", err.message);
        throw err;
    }
}

module.exports = { fetchUsers };
