const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const { Dog, Temperament } = require("../db.js");

// traemos los datos de la base de datos
async function getDogsDB() {
  try {
    let dogsDB = await Dog.findAll({
      include: [
        {
          model: Temperament,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      ],
    });

    return dogsDB;
  } catch (error) {
    console.log(error);
  }
}

// Traemos los datos de la api
async function getDogsAPI() {
  try {
    const dogsAPI = await axios(
      `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
    );
    const resdogs = await dogsAPI.data.map((dog) => {
      return {
        id: dog.id,
        name: dog.name,
        image: dog.image,
        life_span: dog.life_span,
        temperaments: dog.temperament,
      };
    });
    return resdogs;
  } catch (error) {
    console.log(error);
  }
}

//combinamos los datos y realizamos las busquedas
async function getAllDogs(req, res) {
  const { name } = req.query;
  const { id } = req.params;
  let alldogs = [];

  //con promesas va mas rapido
  /* const dogsApi = getDogsAPI().then((respons) => (alldogs = [...respons.data]));
  const dogsDB = getDogsDB().then((respons) => (alldogs = [...respons]));
  await Promise.all([dogsApi, dogsDB]); */

  await Promise.all([getDogsAPI(), getDogsDB()]).then(
    (r) => (alldogs = [...r[0], ...r[1]])
  );

  // con async await tarda mas en terminar las peticiones
  /* const dogsApi = await getDogsAPI();
  const dogsDB = await getDogsDB();

  alldogs = [...dogsApi, ...dogsDB]; */
  try {
    // consulta por query
    if (name) {
      const findDogs = await alldogs.filter((dog) =>
        dog.name.toLowerCase().includes(name.toLowerCase())
      );
      if (findDogs.length > 0) return res.send(findDogs);
      else return res.status(404).json({ error: "Datos no encontrados" });
    }

    //consulta por params
    if (id) {
      const findDog = await alldogs.find((dog) => {
        if (dog.id.toString() === id) {
          return dog;
        }
      });
      if (findDog) return res.send(findDog);
      else return res.status(404).json({ error: "ID inexistente" });
    }

    // en caso de no recibir ningun paramentro retorna todo
    res.send(alldogs);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

// cramos nuevos datos y los guardamos en la DB
async function setDog(req, res) {
  const { name, altura, peso, life_span, name_temp, image } = req.body;
  try {
    const addDog = await Dog.create({
      name,
      altura,
      peso,
      life_span,
      image,
    });
    const temperamentDB = await Temperament.findAll({
      where: { name: name_temp },
    });
    await addDog.addTemperaments(temperamentDB);
    res.status(201).send(addDog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  getAllDogs,
  setDog,
};
