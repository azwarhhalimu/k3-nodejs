const cripto = require("crypto-js");
class Enkripsi {
    key() {
        return "azwar3k3e";
    }
    encrypt(text) {
        let c = cripto.AES.encrypt(text, this.key()).toString();

        return c;
    }
    dencrypt(chipertext) {
        let c = cripto.AES.decrypt(chipertext, this.key());
        const a = (c.toString(cripto.enc.Utf8)).toString();
        return a;
    }

}
module.exports = new Enkripsi;
// const h = new Enkripsi().encrypt("admin");
// console.log(h);
// console.log(new Enkripsi().dencrypt(h));