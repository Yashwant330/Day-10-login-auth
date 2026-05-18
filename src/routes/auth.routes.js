let express = require("express");
const { registerController } = require("../controllers/auth.controllers");

let router = express.Router();

router.post("/register",registerController)

module.exports = router