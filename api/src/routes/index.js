const { Router } = require("express");
const Dogs = require("./Dogs.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.use("/dogs", Dogs);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
