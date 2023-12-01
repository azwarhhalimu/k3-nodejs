const { randomAngka } = require("../extensi/randomAngka");
const pool_db = require("../utils");

class PengertianTbl {
    async getAll() {
        const [query] = await pool_db.query("SELECT * FROM pengertian ORDER BY no DESC")
        console.log(query);
        return query;
    }
    async save(formData) {
        const id = randomAngka(1000000000, 9999999999)
        const [{ affectedRows }] = await pool_db.execute(`
            INSERT INTO pengertian (id_pengertian, judul, isi)
            VALUES
            (?,?,?)
        `, [
            id, formData.judul, formData.isi
        ])
        if (affectedRows > 0) {
            return { status: "sukses", id: id }
        }
        return { status: "gagal", id: id }
    }
    async getSingle(id_pengertian) {
        const [data] = await pool_db.query("SELECT * FROM pengertian WHERE id_pengertian=?", [id_pengertian]);
        if (data.length > 0) {
            return data[0]
        }
        return "data_empty"
    }
    async update(id_pengertian, formData) {
        const [{ affectedRows }] = await pool_db.execute(`
            UPDATE pengertian SET judul=?, isi=? 
                WHERE id_pengertian=?
        `, [

            formData.judul, formData.isi, id_pengertian
        ])
        if (affectedRows > 0) {
            return { status: "sukses", id: id_pengertian }
        }
        return { status: "gagal", id: id_pengertian }
    }
    async delete(id_pengertian) {
        const [{ affectedRows }] = await pool_db.execute(
            `
        DELETE FROM pengertian WHERE id_pengertian =?
            `, [id_pengertian]
        )
        if (affectedRows > 0) {
            return "sukses"
        }
        return "gagal"
    }
}
module.exports = { PengertianTbl }