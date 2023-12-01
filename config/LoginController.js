const { json } = require("body-parser");
const Enkripsi = require("../extensi/Enkripsi");
const LoginMdl = require("../model/LoginMdl");
const pool_db = require("../utils");
const express = require("express");
const tanggal = require("./Date");
const app = express();
class LoginController {
    async login(req, res) {
        const { username, password } = req.body;

        const _password = Enkripsi.encrypt(password);
        const do_login = await LoginMdl.login(username, password);
        if (do_login.status == "sukses") {
            res.json({
                status: "login_sukses",
                data: do_login.token,
                login_date: tanggal,
            })
        }
        else {
            res.json({
                status: "login_gagal"
            })
        }

    }
}

module.exports = new LoginController;