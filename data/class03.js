const fs = require("fs");

class baseDeDatos {
  // * solo se invoca cuando se crea instancia

  constructor(archivo) {
    this.archivo = archivo;
  }

  // ? Usuario

  //*  crear usuario
  async createUser(objUser) {
    // paso1
    // * { nombre: "eduardo", correo: "hola@google.com" }
    const data = await fs.promises.readFile(
      `${this.archivo}/usuarios.json`,
      "utf-8"
    );
    const usuarios = JSON.parse(data);
    const id = usuarios.length + 1;
    // * { nombre: "eduardo", correo: "hola@google.com", id: id }
    objUser.id = id;
    // * { nombre: "eduardo", correo: "hola@google.com", id: id, likes }
    objUser.likes = [];
    usuarios.push(objUser);
    const usuariosString = JSON.stringify(usuarios);
    await fs.promises.writeFile(
      `${this.archivo}/usuarios.json`,
      usuariosString
    );

    return usuarios;
  }

  //* obtener todos los usario

  async getAllUsers() {
    try {
      const data = await fs.promises.readFile(
        `${this.archivo}/usuarios.json`,
        "utf-8"
      );
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  // * obtener usuarios por ID
  //                parametro
  async getUserById(id) {
    const data = await fs.promises.readFile(
      `${this.archivo}/usuarios.json`,
      "utf-8"
    );
    const usuarios = JSON.parse(data);
    const usuario = usuarios.find((usuario) => usuario.id == id);
    if (usuario) {
      return usuario;
    } else {
      return "Usuario no encontrado";
    }
  }

  // * obtener likes de usuario por ID
  async getLikesById(id) {
    // const user = await this.getUserById(id)

    const data = await fs.promises.readFile(
      `${this.archivo}/usuarios.json`,
      "utf-8"
    );
    const usuarios = JSON.parse(data);
    const usuario = usuarios.find((usuario) => usuario.id == id);
    if (usuario) {
      return usuario.likes;
    } else {
      return "Usuario no encontrado";
    }
  }
  async deleteById(idEntered) {
    // ? Elimina del archivo el objeto con el Id buscado

    const dataToParse = await fs.readFileSync(this.archivo, "utf-8");
    const dataParsed = JSON.parse(dataToParse);
    // * Se filtran los productos que no cumplen las condiciones (coincidir con el id proporcionado)
    const leakedID = dataParsed.filter(({ id }) => id !== idEntered);
    // * Encuentra el producto con el id proporcionado
    const idFound = dataParsed.find(({ id }) => id === idEntered);

    try {
      if (idFound) {
        
        );
        // * Se actualiza el archivo
        const updatedFile = JSON.stringify(leakedID, null, " ");
        fs.writeFileSync(this.file, updatedFile);
      } else {
        console.log(`No se ha encontrado el objeto con id: ${idEntered}`);
      }
    } catch (error) {
      console.error(`Se ha producido un error en deleteById: ${error}`);
    }
  }

  async deleteAll() {
    // ? Elimina todos los objetos presentes en el archivo
    try {
      console.log("Todos los objetos fueron eliminados");
      // * Borrado de todos los objetos (Se sobreescribe el archivo a un array vacío)
      await fs.writeFileSync(this.file, "[]");
    } catch (error) {
      console.error(`Se ha producido un error en deleteAll: ${error}`);
    }
  }
}

  // * dar like

  async likePage(usuarioId, paginaId) {
    try {
      // * obtener usuarios
      const data = await this.getAllUsers();
      // * filtrar el usuario
      // * agregar like
      const dataAct = data.map((usuario) => {
        if (usuario.id == usuarioId) {
          usuario.likes.push(paginaId);
        }

        return usuario;
      });
      const dataString = JSON.stringify(dataAct);

      await fs.promises.writeFile(`${this.archivo}/usuarios.json`, dataString);

      return dataAct;
    } catch (e) {
      console.error(e);
    }
  }

  // ? Fan pages

  // * crear pagina
  // * {nombre: string, id: number}
  async createPage(pageObj) {
    // * leer archivo
    const data = await fs.promises.readFile(
      `${this.archivo}/pages.json`,
      "utf-8"
    );
    const paginas = JSON.parse(data);
    // * generar id

    const id = paginas.length + 1;
    pageObj.id = id;

    //* agregamos la pagina
    paginas.push(pageObj);
    const stringPaginas = JSON.stringify(paginas);
    await fs.promises.writeFile(`${this.archivo}/pages.json`, stringPaginas);
    return paginas;
  }

  // * enlistar paginas

  async getAllPages() {
    const data = await fs.promises.readFile(
      `${this.archivo}/pages.json`,
      "utf-8"
    );
    const paginas = JSON.parse(data);
    return paginas;
  }
}
async function start() {
  const db = new baseDeDatos("data");
  // db.createUser({ nombre: "eduardo", correo: "hola@google.com" });
  //   const users = await db.getAllUsers();
  //   console.log(users);
  const usuario = await db.likePage(1, 5);
  console.log(usuario);
}

start();

