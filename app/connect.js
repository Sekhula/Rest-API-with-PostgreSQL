const { Client } = require('pg');

const client = new Client({
    host: "localhost",
    user: "admin",
    port: "6000",
    password: "1234",
    database: "shopping"
});

client.on("connect", () => {
    console.log("Database connected");
})

client.on("end", () => {
    console.log("Database connection end");
})

module.exports = client;