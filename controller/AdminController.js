
const { PengertianTbl } = require("../model/PengertianTbl")
const ArtikelTbl = require("../model/ArtikelTbl");

const Jimp = require("jimp");
const fs = require("fs");
const PeralatanTbl = require("../model/PeralatanTbl");
const TipsTbl = require("../model/TipsTbl");
const RambuTbl = require("../model/RambuTbl");
const SlideShowTbl = require("../model/SlideShowTbl");
class AdminController {
    async getPengertian(req, res) {
        const data = await new PengertianTbl().getAll();
        res.json({ data: data });
    }
    async savePengertian(req, res) {
        const formData = req.body;
        const tmp_name = req.file.path;

        const { status, id } = await new PengertianTbl().save(formData);
        if (status == "sukses") {
            const output = "assets/pengertian/" + id + ".jpg";
            try {
                const image = await Jimp.read(tmp_name);
                image.crop(parseInt(formData.x), parseInt(formData.y), parseInt(formData.width), parseInt(formData.height));
                await image.writeAsync(output);
                console.log('Gambar berhasil dipotong!');
                fs.unlink(tmp_name, (err) => {
                    if (!err) {
                        console.log("sukses");
                    }
                })
            } catch (error) {
                console.error('Kesalahan dalam memotong gambar:', error);
            }
            res.json({ status: "sukses" })
        }
        else {
            res.json({ status: "gagal" })
        }
    }
    async deletePengertian(req, res) {

        const { id } = req.params;
        const _hapus = await new PengertianTbl().delete(id)
        const file = "assets/pengertian/" + id + ".jpg";
        if (_hapus == "sukses") {
            const c = fs.existsSync(file);
            if (c) {
                fs.unlink(file, (err) => {
                    if (!err) {
                        console.log("berhasil di hapus")
                    }
                })
            }
            res.json({ status: "deleted" })
        }
        else {
            res.json({ status: "gagal_deleted" })
        }
    }

    async artikel(req, res) {
        const data = await new ArtikelTbl().getAll();
        res.json({ data: data });
    }
    async save_artikel(req, res) {
        const form_data = req.body;
        const tmp_name = req.file.path;
        console.log(tmp_name);
        const save = await new ArtikelTbl().simpan(form_data);
        if (save.status == "sukses") {

            const img = await Jimp.read(tmp_name);
            img.crop(
                parseInt(form_data.x), parseInt(form_data.y), parseInt(form_data.width), parseInt(form_data.height)

            );
            await img.writeAsync("assets/artikel/" + save.id + ".jpg");
            fs.unlink(tmp_name, (err) => {
                if (!err) {
                    console.log("sukses");
                }
            })

            res.json({ status: "data_saved" })
        }
        else
            res.json({ status: "gaga l_saved" })
    }
    async delete_artikel(req, res) {
        const { id_artikel } = req.params;
        const hapus = await new ArtikelTbl().delete(id_artikel)
        if (hapus.status == "sukses_deleted") {
            const path = `assets/artikel/${id_artikel}.jpg`
            const c = fs.existsSync(path)
            if (c)
                fs.unlinkSync(path)
            res.json({ status: "data_terhapus" })
        }
        else {
            res.json({ status: "data_gagal_terhapus" })
        }
    }

    async getPelatan(req, res) {
        const data = await new PeralatanTbl().getAll();
        res.json({ data: data })
    }
    async simpanPeralatan(req, res) {
        const form_data = req.body;
        const tmp_file = req.file.path;
        const simpan = await new PeralatanTbl().simpan(form_data);
        if (simpan.status == "sukses") {
            const jimp = await Jimp.read(tmp_file);
            jimp.crop(parseInt(form_data.x), parseInt(form_data.y), parseInt(form_data.width), parseInt(form_data.height))
            await jimp.writeAsync("assets/peralatan/" + simpan.id + ".jpg");
            fs.unlinkSync(tmp_file);
            res.json({
                status: "data_saved"
            })
        }
        else {
            res.json({
                status: "data_saved"
            })
        }

    }
    async deletePeralatan(req, res) {
        const { id_peralatan } = req.params
        const hapus = await new PeralatanTbl().delete(id_peralatan);
        if (hapus == "sukses") {
            const file = "assets/peralatan/" + id_peralatan + ".jpg";
            const c = fs.existsSync(file);
            if (c) {
                fs.unlinkSync(file);
            }
            res.json({
                "status": "data_terhapus"
            })
        }
    }

    async getTips(req, res) {
        const data = await new TipsTbl().getAll();
        res.json({
            data: data
        });
    }
    async saveTips(req, res) {
        const form_data = req.body;
        const simpan = await new TipsTbl().save(form_data)
        if (simpan.status == "sukses") {
            res.json({
                status: "sukses"
            })
        }
        else {
            res.json({
                status: "gagal"
            })
        }
    }
    async deleteTips(req, res) {
        const { id } = req.params;
        const _delete = await new TipsTbl().delete(id);
        if (_delete == "sukses") {
            res.json({
                status: "data_deleted"
            })
        }
        else {
            res.json({
                status: "gagal_terhapus"
            })
        }
    }

    async getRambu_rambu(req, res) {
        const data = await new RambuTbl().getAll();
        res.json({
            data: data
        });
    }
    async saveRambu_rambu(req, res) {
        const form_data = req.body;
        const { status, id } = await new RambuTbl().save(form_data);
        const tmp_name = req.file.path;
        if (status == "sukses") {

            const c = await Jimp.read(tmp_name);
            c.crop(parseInt(form_data.x), parseInt(form_data.y), parseInt(form_data.width), parseInt(form_data.height),);
            const save = await c.writeAsync("assets/rambu-rambu/" + id + ".png");
            if (save) {
                fs.unlinkSync(tmp_name);
            }
            res.json({ status: "data_saved" })
        }
        else {
            res.json({ status: "gagal_saved" })
        }
    }
    async deleteRambu_rambu(req, res) {
        const { id } = req.params;
        const _delete = await new RambuTbl().delete(id)
        if (_delete.status = "sukses") {
            const path = "assets/rambu-rambu/" + id + ".png";
            if (fs.existsSync(path)) {
                fs.unlinkSync(path)
            }
            res.json({
                status: "data_terhapus",
            })
        }

    }

    async getSlideShow(req, res) {
        const data = await SlideShowTbl.getAll();
        res.json({ data: data });
    }
    async saveSlideShow(req, res) {
        const form_data = req.body;
        console.log(form_data)
        const simpan = await SlideShowTbl.save(form_data);
        if (simpan.status == "sukses") {
            const tmp_name = req.file.path;
            const jimp = await Jimp.read(tmp_name);
            jimp.crop(parseInt(form_data.x), parseInt(form_data.y), parseInt(form_data.width), parseInt(form_data.height))
            jimp.write("assets/slide-show/" + simpan.id + ".jpg", (callback) => {
                fs.unlinkSync(req.file.path);
                console.log(callback);
                console.log("sukses crop");
            });
            res.json({ status: "data_saved" })

        }
        else {
            res.json({
                status: "gagal_saved"
            })
        }


    }
    async deleteSlideShow(req, res) {
        const { id } = req.params;
        const hapus = await SlideShowTbl.delete(id);
        if (hapus == "sukses") {
            const path = "assets/slide-show/" + id + ".jpg";
            if (fs.existsSync(path))
                fs.unlinkSync(path)
        }
        res.json({
            status: "data_deleted"
        })
    }
}

module.exports = AdminController;