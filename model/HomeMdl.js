const pool_db = require("../utils");
const { format, parseISO } = require('date-fns');
const locale = require('date-fns/locale/id');
class HomeMdl {
    async dasbhard() {
        let data = [];
        const [artikel] = await pool_db.query(`
            SELECT * FROM artikel ORDER BY no LIMIT 10
        `, []);
        artikel.map((list, index) => {
            data.push({
                id_artikel: list.id_artikel,
                judul: list.judul,
                tanggal_post: list.tanggal_post,
                post_by: list.post_by
            });
            console.log(list.tanggal_post.toString());
        });
        console.log(data);
        return data;
    }
    async pengertian() {
        let data = [];
        const [pengertian] = await pool_db.query(
            `SELECT * FROM pengertian ORDER BY no DESC LIMIT 10;`,
            [])
        pengertian.map((list, index) => data.push({
            id_pengertian: list.id_pengertian,
            judul: list.judul,
            time_create: list.time_create,
        }))
        return data;
    }
    async peralatan() {
        const data = [];
        const [peralatan] = await pool_db.query(`SELECT * FROM peralatan ORDER BY rand()`, []);
        peralatan.map((list, index) => data.push({
            id_peralatan: list.id_peralatan,
            nama_peralatan: list.nama_peralatan,
        }))
        return data; a
    }
    async video() {
        const [data] = await pool_db.query(`SELECT * FROM video`)
        return data;
    }
    async getSingleVideo(id) {
        const [[data]] = await pool_db.query(`SELECT * FROM video WHERE id_video=?`, [id]);
        return data;
    }
}
module.exports = new HomeMdl;