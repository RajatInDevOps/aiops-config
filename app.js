const express = require("express");
const { execSync } = require("child_process");

let config;

try {
    config = require("./config/config");
} catch (err) {
    console.error("ERROR: CONFIG_LOAD_FAILED");
    console.error("ERROR_MESSAGE:", err.message);
    process.exit(1);
}

const { fetchUsers } = require("./services/apiService");

const app = express();

// 🔥 Log Git info (VERY IMPORTANT FOR DEMO)
function logGitInfo() {
    try {
        const current = execSync("git rev-parse --short HEAD").toString().trim();
        const previous = execSync("git rev-parse --short HEAD~1").toString().trim();

        console.log("INFO: CURRENT_COMMIT:", current);
        console.log("INFO: PREVIOUS_COMMIT:", previous);

    } catch (err) {
        console.log("INFO: Git info not available");
    }
}

// Call once at startup
logGitInfo();

app.get("/", async (req, res) => {
    try {
        const users = await fetchUsers();

        console.log("INFO: REQUEST_SUCCESS");
        res.send(`Users fetched: ${users.length}`);

    } catch (err) {
        console.error("ERROR: APPLICATION_FAILURE");
        console.error("ERROR_REASON:", err.message);

        res.status(500).send("Application failed");
    }
});

app.listen(config.PORT, () => {
    console.log(`INFO: App running on port ${config.PORT}`);
});
