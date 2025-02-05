const Jimp = require("jimp");
class Images {
    async generation(req, res) {
        const as = {
            "pengertian": (2 / 1.3),
            "artikel": (2 / 1.3),
            "peralatan": (1 / 1),
            "rambu-rambu": (1 / 1),
            "slide-show": (2 / 1),


        }
        const { size, source } = req.query;
        const { path } = req.params
        const ext = (path == "rambu-rambu") ? ".png" : ".jpg"
        const c = await Jimp.read(`assets/${path}/${source}${ext}`);
        c.resize(parseInt(size,), parseInt(size) / as[path]);
        c.getBuffer(Jimp.MIME_JPEG, (err, buffer) => {
            if (err) {
                console.log(`TERJADI ERRROR ${err}`)
            }
            else {
                console.log(`sukses`)
                res.setHeader('Content-Type', path == "rambu-rambu" ? 'image/png' : 'image/jpeg');
                res.status(200).end(buffer);
            }
        })
    }
}


module.exports = Images;