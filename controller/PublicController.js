const ArtikelTbl = require("../model/ArtikelTbl");
const HomeMdl = require("../model/HomeMdl");
const { PengertianTbl } = require("../model/PengertianTbl");
const PeralatanTbl = require("../model/PeralatanTbl");
const RambuTbl = require("../model/RambuTbl");
const SlideShowTbl = require("../model/SlideShowTbl");
const TipsTbl = require("../model/TipsTbl");

class PublicController {
    async getSingleArtikel(req, res) {
        const { id } = req.params;
        const data = await new ArtikelTbl().getSingle(id);
        const artikel = await new ArtikelTbl().getAll();
        res.json({ data: data, artikel: artikel });
    }
    async getPeralatanSingle(req, res) {
        const { id } = req.params;
        const data = await new PeralatanTbl().getSingle(id);
        res.json({
            data: data
        })
    }

    async getSinglePengertian(req, res) {
        const { id } = req.params;
        const data = await new PengertianTbl().getSingle(id);
        res.json({ data: data });
    }
    async getRambu(req, res) {
        const data = await new RambuTbl().getAll();
        res.json({ data: data })
    }
    async lihatRambu(req, res) {
        const { id } = req.params;
        const lihat = await new RambuTbl().getSingle(id)

        res.json({
            data: lihat,
        });
    }
    async getSlideShow(req, res) {
        const data = await SlideShowTbl.getAll();
        res.json({ data: data })
    }
    async getTips(req, res) {
        const data = await new TipsTbl().getAll();
        res.json({ data: data })
    }
    async getSingleTips(req, res) {
        const { id } = req.params;
        const data = await new TipsTbl().getSingleTips(id);
        res.json({
            data: data,
        })
    }
    async getHome(req, res) {
        const artikel = await HomeMdl.dasbhard();
        const pengertian = await HomeMdl.pengertian();
        const peralatan = await HomeMdl.peralatan();

        res.send({
            artikel: artikel,
            pengertian: pengertian,
            peralatan: peralatan,
        });
    }
    async getVideo(req, res) {
        const data = await HomeMdl.video();
        res.json({
            data: data,
        })
    }
    async getVideoSingle(req, res) {

        const data = await HomeMdl.getSingleVideo(req.params.id);
        res.json({
            data: data,
        })
    }
}

module.exports = new PublicController();