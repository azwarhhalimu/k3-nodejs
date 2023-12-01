const { randomAngka } = require("../extensi/randomAngka");
const pool_db = require("../utils");

class SlideShowTbl {
    async getAll() {
        const [data] = await pool_db.query(
            `  SELECT * FROM slide_show ORDER BY no DESC`
        );
        return data;
    }
    async save(form_data) {
        const id = randomAngka(1000000, 9999999);
        const [{ affectedRows }] = await pool_db.execute(
            `INSERT INTO slide_show (id_slide_show, deskripsi) 
                VALUES (?,?)
            `, [id, form_data.deskripsi]);
        if (affectedRows > 0) {
            return {
                id: id, status: "sukses"
            }
        }
        return {
            id: id, status: "gagal"
        }
    }
    async delete(id_slide_show) {
        const [{ affectedRows }] = await pool_db.execute(
            `DELETE FROM slide_show WHERE id_slide_show=?`, [id_slide_show]);
        if (affectedRows > 0) {
            return "sukses"

        }
        return "gagal"
    }
}

module.exports = new SlideShowTbl();