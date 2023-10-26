const { randomAngka } = require("../extensi/randomAngka");
const pool_db = require("../utils");

class ArtikelTbl {
    async getAll() {
        const [data] = await pool_db.query("SELECT * FROM artikel ORDER BY no DESC");
        return data;
    }
    async getSingle(id_artikel) {
        const [data] = await pool_db.query("SELECT * FROM artikel WHERE id_artikel=?", [id_artikel]);
        if (data.length > 0) {
            return data[0]
        }
        return "no_data";
    }
    async delete(id_artikel) {
        const [{ affectedRows }] = await pool_db.execute(`
            DELETE FROM artikel WHERE id_artikel=?
        `, [id_artikel]);
        if (affectedRows > 0) {
            return {
                id: id_artikel, status: "sukses_deleted"
            }
        }

        return {
            id: id_artikel, status: "gagal_hapus"
        }

    }
    async update(id_artikel, form_data) {
        const [{ affectedRows }] = await pool_db.execute('UPDATE artikel SET judul=?, post_by=?, isi=?  WHERE id_artikel=?',
            [form_data.judul, form_data.post_by, form_data.isi, id_artikel])

        if (affectedRows > 0) {
            return {
                id: id_artikel, status: "sukses"
            }
        }
        else {
            return {
                id: id_artikel, status: "gagal"
            }
        }
    }
    async simpan(form_data) {
        const id_artikel = randomAngka(1000000000, 9999999999)
        const [{ affectedRows }] = await pool_db.execute(`
        INSERT INTO artikel (id_artikel, judul, post_by, isi) 
            VALUES
            (?, ?,?,?)
        `,
            [id_artikel, form_data.judul, form_data.post_by, form_data.isi])

        if (affectedRows > 0) {
            return {
                id: id_artikel, status: "sukses"
            }
        }
        else {
            return {
                id: id_artikel, status: "gagal"
            }
        }
    }
}

module.exports = ArtikelTbl;