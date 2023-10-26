const express = require("express");
const PublicController = require("../controller/PublicController");
const public_router = express.Router();

public_router.get("/rambu-rambu", PublicController.getRambu);
public_router.get("/tips", PublicController.getTips);
public_router.get("/home", PublicController.getHome);
public_router.get("/slide-show", PublicController.getSlideShow);

public_router.get("/artikel/:id", PublicController.getSingleArtikel);
public_router.get("/rambu-rambu/:id", PublicController.lihatRambu);
public_router.get("/pengertian/:id", PublicController.getSinglePengertian);
public_router.get("/peralatan/:id", PublicController.getPeralatanSingle);
public_router.get("/tips/:id", PublicController.getSingleTips);
module.exports = public_router;