const date = require("moment-timezone");
date.tz.setDefault("Asia/Makassar");

function tanggal() {
    const waktu_sekarang = date();
    return waktu_sekarang.format("YYYY-MM-DD HH:mm:ss")
}

tanggal = tanggal();
module.exports = tanggal;