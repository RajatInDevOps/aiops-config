const axios = require("axios");
const config = require("../config/config");

async function fetchUsers() {
    try {
        console.log("📡 Calling API:", config.API.BASE_URL);

        const response = await axios.get(
            `${config.API.BASE_URL}/users`,
            { timeout: config.API.TIMEOUT }
        );

        return response.data;

    } catch (err) {
        console.error("ERROR: API call failed");
        console.error("ERROR_MESSAGE:", err.message);
        console.error("CONFIG:", JSON.stringify(config.API));

        throw err;
    }
}

module.exports = { fetchUsers };
