"use strict";

const mysql = require("mysql");

// connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ukl_laundry",
});

module.exports = db;