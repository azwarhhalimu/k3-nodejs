const express = require("express");
const app = express();
const cors = require("cors");
const bodyparser = require("body-parser");
const router = require("./routing/router");
const img_routing = require("./routing/img-router");
const public_router = require("./routing/router-public");
const auth_router = require("./routing/auth-router");

let moment = require("moment-timezone");
const AuthLogin = require("./extensi/AuthLogin");
moment.tz.setDefault("Asia/Makassar");

// config 
app.get("/", (req, res) => {
    res.send("its wordkss ")
})
app.use(cors());
app.use(express.Router());
app.use(bodyparser())
app.set(express.urlencoded({ extended: false }))


app.use("/auth", auth_router)
app.use("/admin", AuthLogin.check, router)
app.use("/images", img_routing)
app.use("/public", public_router);

app.listen(2000, () => {
    console.log("aplikasi berjalan pada port " + 2000);
})