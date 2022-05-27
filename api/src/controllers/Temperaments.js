const { Temperament } = require("../db.js");
require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");
let apiconsultada = false;

async function getTemperamentAPI() {
  try {
    const dogsAPI = await axios.get("https://api.thedogapi.com/v1/breeds");
    const temperamentos = dogsAPI.data
      .map((dog) => {
        return dog.temperament;
      })
      .toString()
      .split(",");
    const result = temperamentos.reduce((acumulador, elemento) => {
      if (!acumulador.find((el) => el === elemento.trim()) && elemento !== "") {
        acumulador.push(elemento.trim());
      }
      return acumulador;
    }, []);

    result.map((name) => {
      Temperament.findOrCreate({
        where: {
          name,
        },
      });
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
}
// lo ejecuto para cargar los temperamentos apenas iniciar el servidor
/* getTemperamentAPI(); */

async function getTemperamentDB(req, res) {
  if (apiconsultada === false) {
    await getTemperamentAPI();
    apiconsultada = true;
  }
  try {
    const temperamentDB = await Temperament.findAll();
    res.json(temperamentDB);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
}

module.exports = {
  getTemperamentDB,
};
