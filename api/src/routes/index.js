const { Router } = require("express");
const Dogs = require("./Dogs.js");
const Temperaments = require("./Temperarments.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.use("/dogs", Dogs);
router.use("/temperament", Temperaments);
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
