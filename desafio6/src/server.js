const express = require("express"),
  path = require("path");
const app = express();
const morgan = require("morgan");


const indexRoute = require("./routes/index.routes");


app.set("port", 8080); 
app.set("json spaces", 2); 
app.set("views", __dirname + "/views");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use("/", express.static(path.join(__dirname, "../public"))); 
app.use("/", indexRoute); 


const { engine } = require("express-handlebars");
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: __dirname + "/views/layouts/layout.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/includes",
  })
);


app.set("view engine", "hbs");


const server = app.listen(app.get("port"), () => {
  console.log(`Servidor express iniciado en puerto ${app.get("port")}`);
});


server.on("error", (error) => {
  console.log(`Error !!!: ${error}`);
});


const SocketIO = require("socket.io");
const io = SocketIO(server);

io.on("connection", (socket) => {
  console.log(`New Connection: ${socket.id}`);

  socket.on("chat:message", (data) => {
    io.sockets.emit("chat:message", data);
  });

  socket.on("chat:typing", (data) => {
    socket.broadcast.emit("chat:typing", data)
  });
});
