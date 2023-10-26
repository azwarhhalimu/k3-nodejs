const express = require("express");
const Images = require("../controller/ImageController");

const img = new Images();
const img_routing = express.Router();


http://url/path?size=*&source=*
img_routing.get("/:path", img.generation);

module.exports = img_routing;