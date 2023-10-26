const mysql = require("mysql2/promise")
const dbConfing = require("./config/dbConfig")

const pool = mysql.createPool(dbConfing);

pool.query("SELECT 1").then(hasil => {
    console.log("APLIKASI KONEKS KE DATABASE")
});
