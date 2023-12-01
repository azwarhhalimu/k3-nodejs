const pool_db = require("../utils");
class DashboardModel {
    async get() {
        const [[data]] = await pool_db.query(
            `SELECT COUNT(*)FROM pengertian`
        );
        const [[slide_show]] = await pool_db.query(
            `SELECT COUNT(*)FROM slide_show`
        );
        const [[peralatan]] = await pool_db.query(
            `SELECT COUNT(*)FROM peralatan`
        );
        const [[tips]] = await pool_db.query(
            `SELECT COUNT(*)FROM tips`
        );

        return {
            pengertian: data["COUNT(*)"],
            slide_show: slide_show["COUNT(*)"],
            peralatan: peralatan["COUNT(*)"],
            tips: tips["COUNT(*)"],
        }

    }
}
module.exports = new DashboardModel;