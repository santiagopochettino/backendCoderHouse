const express = require("express");
const db = require("./db.js");
const app = express();

app.use(express.urlencoded());
app.use(express.json());
//* request/ response
const DB = new db("data");

app.get("/", (req, res) => {
  res.send("<h1 style='color:red'>HOLA MUNDO</h1>");
});

app.get("/producto", async (req, res) => {
  const data = await DB.getAllUsers();
  return res.send(data);
});


app.get("/producto", async (req, res) => {
  const { id } = req.query;
  try {
    const data = await DB.getUserById(id);

    return res.send(data);
  } catch (e) {
    return res.status(404).send({ error: true, msg: e.message });
  }
});
app.get("/productoRandom", async (req, res) => {
  
let randomNum = Math.floor(Math.random() * 9 + 1);
let data = await contenedor.getById(randomNum);
data === null
  ? res.send(`<h4>ID:${randomNum} >> [[ERROR]] No se ha encontrado el producto</h4>`)
  : res.json(data);
});

app.post("/producto", async (req, res) => {
  const { producto } = req.body;

  const data = await DB.createUser({ producto });
  return res.send({ error: false, msg: "Producto creado" });
});

app.listen(8080, () => {
  console.log("Iniciado");
});
