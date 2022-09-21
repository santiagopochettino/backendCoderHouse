const Container = require("../models/Container");
const contenedor = new Container("products.json");
const controller = {};

controller.getAll = async (req, res) => {
  const data = await contenedor.getAll();
  res.status(200).render("products", { products: data });
};

controller.getById = async (req, res) => {
  const data = await contenedor.getById(req.params.id);


  data
    ? res.status(200).json(data)
    : res.status(404).json({ error: "Producto no encontrado" });
};

controller.post = async (req, res) => {
  const { title, price, thumbnail } = req.body;
  const data = await contenedor.save({ title, price, thumbnail });
  data == null
    ? res.status(500).json({ message: ` [[${title}]] ya existe en el archivo` })
    : res.status(200).render("index");
};

controller.put = async (req, res) => {
  const { id } = req.params;
  const newObject = req.body;
  const data = await contenedor.update(+id, newObject);

  data != null
    ? res.status(200).json({ message: `Producto ${id} modificado con éxito` })
    : res.status(404).json({ error: "Producto no encontrado" });
};

controller.delete = async (req, res) => {
  const data = await contenedor.deleteById(req.params.id);
  data
    ? res
        .status(200)
        .send({ message: `Se ha eliminado el producto ${data.title}` })
    : res.status(404).send({ message: "No se ha encontrado el producto" });
};

module.exports = controller;
