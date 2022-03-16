const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let animals = [];

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

app.get("/animals", (req, res) => {
  res.status(200).json(animals);
});

app.get("/animals/random", (req, res) => {
  const index = randomInt();
  if (animals.length === 0) {
    res.status(204).send();
    return;
  }
  res.status(200).json(animals[index]);
});

app.post("/animals", (req, res) => {
  const animal = req.body;
  const existsSame = animals.some((el) => el.name === animal.name);
  if (existsSame) {
    res.status(400).json({
      message: "Nao pode cadastrar animais com nome igual.",
    });
    return;
  }
  animals.push(animal);
  res.status(200).send();
});

app.delete("/animals/:id", (req, res) => {
  const { id } = req.params;
  animals = animals.filter((el) => el.id !== id);
  res.status(200).send();
});

app.put("/animals/:id", (req, res) => {
  const { id } = req.params;
  const animal = req.body;
  animals = animals.map((el) => {
    if (el.id === id) {
      return {
        ...animal,
        id: el.id,
      };
    }
    return el;
  });
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
