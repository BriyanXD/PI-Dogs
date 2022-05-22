const { default: axios } = require("axios");
const { parse } = require("dotenv");
const { Dog, Temperament } = require("../db.js");

// traemos los datos de la base de datos
async function getDogsDB() {
  try {
    let dogsDB = await Dog.findAll({
      include: [
        {
          model: Temperament,
          attributes: ["nombre"],
          through: {
            attributes: [],
          },
        },
      ],
    });

    return dogsDB;
  } catch (error) {
    return error;
  }
}

// Traemos los datos de la api
async function getDogsAPI() {
  try {
    const dogsAPI = await axios("https://api.thedogapi.com/v1/breeds");
    return dogsAPI;
  } catch (error) {
    return error;
  }
}

//combinamos los datos y realizamos las busquedas
async function getAllDogs(req, res) {
  const { name } = req.query;
  const { id } = req.params;
  try {
    const dogsDB = await getDogsDB();
    const dogsAPI = await getDogsAPI();

    alldogs = [...dogsDB, ...dogsAPI.data];

    if (name) {
      const findDogs = await alldogs.filter((dog) => dog.name.includes(name));
      if (findDogs.length > 0) return res.send(findDogs);
      else return res.status(404).json({ error: "Datos no encontrados" });
    }
    if (id) {
      const findDog = await alldogs.find((dog) => {
        if (dog.id.toString() === id) {
          return dog;
        }
      });
      if (findDog) return res.send(findDog);
      else return res.status(404).json({ error: "ID inexistente" });
    }
    res.send(alldogs);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

// cramos nuevos datos y los guardamos en la DB
async function setDog(req, res) {
  const { name, altura, peso, tiempo_vida, id_temp } = req.body;
  try {
    const addDog = await Dog.create({
      name,
      altura,
      peso,
      tiempo_vida,
    });
    await addDog.setTemperaments(id_temp);
    res.status(201).send(addDog);
  } catch (error) {
    res.status(400).json({ masagge: error.message });
  }
}

module.exports = {
  getAllDogs,
  setDog,
};
