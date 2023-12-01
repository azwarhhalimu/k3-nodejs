
const { randomAngka } = require("../extensi/randomAngka");
const pool_db = require("../utils")
class PeralatanTbl {
    async getAll() {
        const [data] = await pool_db.query('SELECT * FROM peralatan');
        return data;
    }
    async getSingle(id_peralatan) {
        const [data] = await pool_db.query("SELECT * FROM peralatan WHERE id_peralatan=?", [id_peralatan]);
        if (data.length > 0) {
            return data[0];
        }
        return "data_kosong";
    }
    async delete(id_peralatan) {
        const [{ affectedRows }] = await pool_db.execute(`
            DELETE FROM peralatan WHERE id_peralatan=?
        `, [id_peralatan]);
        if (affectedRows > 0) {
            return "sukses"
        }
        return "gagal"
    }
    async simpan(form_data) {
        const id = randomAngka(1000000009, 9999999999);


        const [{ affectedRows }] = await pool_db.execute(`
            INSERT INTO peralatan (id_peralatan, nama_peralatan, deskripsi)
                VALUES
                (?,?,?)
        `, [id, form_data.nama_peralatan, form_data.deskripsi])

        if (affectedRows > 0) {

            return {
                id: id, status: "sukses"
            }
        }
        return {
            id: id, status: "gagal"
        }
    }

    async update(id_peralatan, form_data) {
        const [{ affectedRows }] = await pool_db.execute(`
            UPDATE peralatan SET nama_peralatan=?, deskripsi=?
                WHERE id_peralatan=?
        `, [form_data.nama_peralatan, form_data.deskripsi, id_peralatan])
        if (affectedRows > 0) {
            return {
                id: id_peralatan, status: "sukses"
            }
        }
        return {
            id: id_peralatan, status: "gagal"
        }
    }
}

module.exports = PeralatanTbl;