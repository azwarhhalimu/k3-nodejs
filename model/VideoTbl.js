const { randomAngka } = require("../extensi/randomAngka");
const pool_db = require("../utils");
class VideoTbl {
    async saveVideo(formData) {
        console.log("tstong")
        const [{ affectedRows }] = await pool_db.execute(`
            INSERT INTO video (id_video, judul, deskripsi, id_youtube) VALUES 
            (?,?,?,?)
        `, [randomAngka(1000000000, 9999999999), formData.judul, formData.deskripsi, formData.id_youtube]);
        if (affectedRows > 0) {
            return true;
        }
        return false;
    }
    async getVideo() {
        const [data] = await pool_db.query('SELECT *FROM video order by no desc');
        return data;
    }
    async getSingleVideo(id) {
        const [data] = await pool_db.query('SELECT *FROM video WHERE id_video=? order by no desc', [id]);
        if (data.length > 0)
            return data[0];
        return "no_data"
    }
    async deleteVideo(id) {
        const [{ affectedRows }] = await pool_db.execute(`DELETE FROM video WHERE id_video=?`, [id])
        if (affectedRows > 0) {
            return true;
        }
        return false;
    }
}
module.exports = new VideoTbl();