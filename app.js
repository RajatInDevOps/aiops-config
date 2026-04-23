const express = require("express");

let config;

try {
    config = require("./config/config");
} catch (err) {
    console.error("ERROR: Config loading failed:", err.message);
    process.exit(1);
}

const { fetchUsers } = require("./services/apiService");

const app = express();

app.get("/", async (req, res) => {
    try {
        const users = await fetchUsers();
        res.send(`✅ Users fetched: ${users.length}`);
    } catch (err) {
        console.error("ERROR: Application failure", err.message);
        res.status(500).send("Application failed");
    }
});

app.listen(config.PORT, () => {
    console.log(`App running on port ${config.PORT}`);
});
