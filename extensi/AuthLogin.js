const LoginMdl = require("../model/LoginMdl");
const Enkripsi = require("./Enkripsi");
const date = require("moment-timezone").tz.setDefault("Asia/Makssar");


class AuthLogin {
    async check(req, res, next) {
        const c = req.headers.authorization
        if (typeof c == "undefined") {
            res.status(200).send({ status: "503", message: "Anda tidak menggunakan protokol yang sah" })
        }
        else {
            let clear = c.replace("Bearer ", "");
            clear = Enkripsi.dencrypt(clear);
            const { username, token, exp } = JSON.parse(clear);
            var tanggal_sekarang = new Date(date());
            var tanggal_token = new Date(exp);

            var selisih = Math.floor((tanggal_sekarang - tanggal_token) / 1000);
            selisih = (parseInt(selisih));

            if (selisih > 100) {
                res.json({
                    status: "not_authorization",
                    message: "Token Exp"
                })
            }
            else {
                const login = LoginMdl.auth(username, token);
                if (login) {
                    next();
                }
                else {
                    res.status(200).json({
                        status: "not_authorization",
                        message: "Token tidak valid"
                    })
                }
            }
        }
    }
}
module.exports = new AuthLogin;