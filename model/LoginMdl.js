const { MD5 } = require("crypto-js");
const Enkripsi = require("../extensi/Enkripsi");
const { randomAngka } = require("../extensi/randomAngka");
const pool_db = require("../utils");

class LoginMdl {

    async login(username, password) {
        const [c] = await pool_db.query(
            ` SELECT * FROM login WHERE username=?`,
            [username]);

        if (c.length == 1) {
            if (password == Enkripsi.dencrypt(c[0]["password"])) {
                //create token
                const sekarang = new Date();
                const duajamkemudian = new Date(sekarang.getTime() + (1 * 60 * 60 * 1000));

                const ctoken = Enkripsi.encrypt((randomAngka(100000, 999999).toString()));
                const token_Format = {
                    username: username,
                    token: ctoken,
                    random: randomAngka(100000, 999999),
                    exp: duajamkemudian,
                }
                const token = (Enkripsi.encrypt(JSON.stringify(token_Format)));
                await pool_db.execute(`UPDATE login SET token=? WHERE username=?`,
                    [ctoken, username]);

                return { token: Enkripsi.encrypt(token), status: "sukses", };
            }
            return { status: "password_tidak_benar" };
        }
        return "login_gagal"
    }
    async auth(username, token) {
        const [[data]] = await pool_db.query("SELECT COUNT(*) FROM login WHERE username=? && token =?",
            [username, token]);
        if (data["'COUNT(*)'"] == 1) {
            return true;
        }
        return false;
    }
}

module.exports = new LoginMdl;