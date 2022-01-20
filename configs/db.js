const slonik = require("slonik");

const db = slonik.createPool(process.env.DB_URL);

module.exports = db;
