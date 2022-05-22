const { Router } = require("express");
const { getAllDogs, setDog } = require("../controllers/Dog.js");

const router = Router();

router.get("/", getAllDogs);
router.get("/:id", getAllDogs);
router.post("/", setDog);

module.exports = router;
