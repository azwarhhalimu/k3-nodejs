const { randomAngka } = require("../extensi/randomAngka");
const pool_db = require("../utils");
class TipsTbl {
    async getAll() {
        const [query] = await pool_db.query("SELECT * FROM tips ORDER BY no DESC")
        return query;
    }
    async getSingleTips(id_tips) {
        const [data] = await pool_db.query(
            `SELECT * FROM tips WHERE id_tips=?`, [id_tips])
        if (data.length > 0) {
            return data[0];
        }
        return "data_kosong"
    }
    async delete(id_tips) {
        const [{ affectedRows }] = await pool_db.execute(
            `DELETE FROM tips WHERE id_tips=?`,
            [id_tips]);
        if (affectedRows > 0) {
            return "sukses"
        }
        return "gagal";
    }
    async save(form_data) {
        const id = randomAngka(1000000000, 9999999999
        )
        const [{ affectedRows }] = await pool_db.execute(
            `INSERT INTO tips (id_tips, judul, deskripsi) VALUES (?,?,?)`,
            [id, form_data.judul, form_data.deskripsi]);
        if (affectedRows > 0) {
            return {
                id: id, status: "sukses",
            }
        }
        return {
            id: id, status: "gagal",
        }
    }
    async update(id, form_data) {
        const [{ affectedRows }] = await pool_db.execute(
            `UPDATE tps SET judul=?, deskripsi=?
                WHERE id_tips=?
            `,
            [form_data.judul, form_data.deskripsi, id])
        if (affectedRows > 0) {
            return {
                id: id, status: "sukses"
            }
        }
        return {
            id: id, status: "gagal"
        }
    }
}

module.exports = TipsTbl;