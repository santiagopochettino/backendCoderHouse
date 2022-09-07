const express = require('express');
const app = express();
const morgan = require('morgan');

const arrayProducts = [
    {
        "precio": 1000,
        "id": 1,
        "title": "Fernet Branca",
        "thumbnailUrl": "https://www.res.com.ar/media/catalog/product/cache/dbcd7fcd96d4e43f69e3e3703d135006/9/2/92_2048x2048.jpg"
    },
    {
        "precio": 3000,
        "id": 2,
        "title": "Gin Bombay Sapphire",
        "thumbnailUrl": "https://http2.mlstatic.com/D_NQ_NP_2X_669612-MLA43643320606_102020-V.webp"
    },
  ];
  const Container = require("./container");
  const contenedor = new Container(arrayProducts);
  
  console.log(arrayProducts);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use("/", express.static(__dirname + "/public"));

const completedFields = (req, res, next) => {
    const { title, price, thumbnail } = req.body;
    title && price && thumbnail
      ? next()
      : res.status(300).send({ message: "Debe completar todos los campos" });
  };

  //Routes

//devuelve todos los productos
app.get('/api/products', async (req, res) =>{
    const data = await contenedor.getAll();
    res.status(200).json(data);

});
//devuelve producto segun su id
app.get('/api/products/:id', async (req, res) =>{
    const data = await contenedor.getById(req.params.id);
    data
    ? res.status(200).json(data)
    : res.status(404).json({ error: "Producto no encontrado" });

});
//recibe y agrega un producto y lo devuelve con su id
app.post('/api/products', completedFields ,async (req, res) =>{
    const {title, price, thumbnailUrl} = req.body;
    const data = await contenedor.save({ title, price, thumbnailUrl });
  data == null
    ? res.status(500).json({ message: ` [[${title}]] ya existe en el archivo` })
    : res.status(200).json(data);


});
//
app.put('/api/products/:id', (req, res) =>{
    res.send("<h1 style='color:red'>HOLA SERVIDOR</h1>");

});
//elimina un product segun su ID
app.delete('/api/products/:id', async (req, res) =>{
    const data = await contenedor.deleteById(req.params.id);
  data
    ? res
        .status(200)
        .send({ message: `Se ha eliminado el producto ${data.title}` })
    : res.status(404).send({ message: "No se ha encontrado el producto" });

});


// Servidor iniciado
app.listen(app.get(8080, () => {
    console.log(`Servidor express iniciado en puerto`);
  }));

  // Manejo de errores

server.on("error", (error) => {
    console.log(`Error !!!: ${error}`);
  });