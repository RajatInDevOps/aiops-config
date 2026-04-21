const express = require("express");
const config = require("./config/config");
const { fetchUsers } = require("./services/apiService");

const app = express();

app.get("/", async (req, res) => {
    try {
        const users = await fetchUsers();
        res.send(`✅ Users fetched: ${users.length}`);
    } catch (err) {
        console.error("ERROR: Application failure due to config issue");
        res.status(500).send("Application failed due to config issue");
    }
});

app.listen(config.PORT, () => {
    console.log(`App running on port ${config.PORT}`);
});
