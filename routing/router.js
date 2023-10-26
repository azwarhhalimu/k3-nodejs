const exporess = require("express");
const router = exporess.Router();
const _AdminController = require("../controller/AdminController");
const uploadFotoPengertian = require("../middleware/uploadFotoPengertian");
const AdminController = new _AdminController();

router.get("/pengertian", AdminController.getPengertian)
router.post("/pengertian", uploadFotoPengertian.single("foto"), AdminController.savePengertian)
router.delete("/pengertian/:id", AdminController.deletePengertian)

router.get("/artikel", AdminController.artikel);
router.post("/artikel", uploadFotoPengertian.single("foto"), AdminController.save_artikel);
router.delete("/artikel/:id_artikel", AdminController.delete_artikel);

router.get("/peralatan", AdminController.getPelatan)
router.post("/peralatan", uploadFotoPengertian.single("foto"), AdminController.simpanPeralatan)
router.delete("/peralatan/:id_peralatan", AdminController.deletePeralatan)


router.get("/tips", AdminController.getTips);
router.post("/tips", AdminController.saveTips);
router.delete("/tips/:id", AdminController.deleteTips);


router.get("/rambu-rambu", AdminController.getRambu_rambu);
router.post("/rambu-rambu", uploadFotoPengertian.single("foto"), AdminController.saveRambu_rambu);
router.delete("/rambu-rambu/:id", AdminController.deleteRambu_rambu);

router.get("/slide-show", AdminController.getSlideShow);
router.post("/slide-show", uploadFotoPengertian.single("foto"), AdminController.saveSlideShow);
router.delete("/slide-show/:id", AdminController.deleteSlideShow);

module.exports = router;