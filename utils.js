const mysql = require("mysql2/promise");
const dbConfing = require("./config/dbConfig");


const pool_db = mysql.createPool(dbConfing);
module.exports = pool_db;