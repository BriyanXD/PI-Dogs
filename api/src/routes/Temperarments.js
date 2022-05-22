const { Router } = require("express");
const { getTemperamentDB } = require("../controllers/Temperaments.js");

const router = Router();

router.get("/", getTemperamentDB);

module.exports = router;
