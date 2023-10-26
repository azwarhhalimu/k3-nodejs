const express = require("express");
const multer = require("multer");
const { randomAngka } = require("../extensi/randomAngka");

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "upload-file/");
    },
    filename: (req, file, callback) => {
        callback(null, "tmp_" + randomAngka(100000, 999999) + ".jpg")
    }
});
const uploadFotoPengertian = multer({ storage: storage });
module.exports = uploadFotoPengertian