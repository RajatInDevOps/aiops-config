const axios = require("axios");
const config = require("../config/config");

async function fetchUsers() {
    try {
        console.log("INFO: Calling API:", config.API.BASE_URL);

        const response = await axios.get(
            `${config.API.BASE_URL}/users`,
            { timeout: config.API.TIMEOUT }
        );

        console.log("INFO: API success");
        return response.data;

    } catch (err) {
        console.error("ERROR: API_CALL_FAILED");
        console.error("ERROR_MESSAGE:", err.message);
        console.error("ERROR_TYPE:", err.code || "UNKNOWN");
        console.error("CONFIG:", JSON.stringify(config.API));

        throw err;
    }
}

module.exports = { fetchUsers };
