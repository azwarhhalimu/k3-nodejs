const { randomAngka } = require("../extensi/randomAngka");
const pool_db = require("../utils");
module.exports = class RambuTbl {
    async getAll() {
        const [data] = await pool_db.query("SELECT * FROM  rambu_rambu ORDER BY no DESC")
        return data;
    }
    async delete(id_rambu) {
        const [{ affectedRows }] = await pool_db.execute(
            `DELETE FROM rambu_rambu WHERE id_rambu=?`, [id_rambu]
        );
        if (affectedRows > 0) {
            return {
                id: id_rambu, status: "sukses"
            }
        }
        return {
            id: id_rambu, status: "gagal"
        }
    }
    async getSingle(id_rambu) {
        const [data] = await pool_db.query(`SELECT * FROM rambu_rambu WHERE id_rambu=?`, [id_rambu]);
        if (data.length > 0) {
            return data[0];
        }
        else {
            return "data_kosong";
        }
    }
    async save(form_data) {
        const id = randomAngka(1000000000, 9999999999);
        const [{ affectedRows }] = await pool_db.execute(
            `INSERT INTO rambu_rambu (id_rambu, nama_rambu, deskripsi, warna)
                VALUES
                (?,?,?,?)
            `,
            [id, form_data.nama_rambu, form_data.deskripsi, form_data.warna]);
        if (affectedRows > 0) {
            return {
                id: id, status: "sukses"
            }
        }
        return {
            id: id, status: "gagal"
        }
    }
    async update(id_rambu, form_data) {
        console.log(form_data);
        const [{ affectedRows }] = await pool_db.execute(
            `UPDATE rambu_rambu SET nama_rambu=?, deskripsi=?, warna=? 
                WHERE id_rambu=?
            `, [form_data.nama_rambu, form_data.deskripsi, form_data.warna, id_rambu]);

        if (affectedRows > 0) {
            return {
                id: id_rambu, status: "sukses"
            }
        }
        return {
            id: id_rambu, status: "gagal"
        }
    }
}