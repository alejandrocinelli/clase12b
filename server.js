import express from 'express';
import { Server as IOServer } from "socket.io";
import { fileURLToPath } from "url";
import path , { dirname, join } from "path";
import { engine } from "express-handlebars";
import fs from "fs";
import Contenedor from './api.js';
import router  from "./public/routes/index.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//const pruduct   = [];
//const messages = [];

const messageApi = new Contenedor(
  {
    client: "sqlite3",
    connection: {
      filename: path.resolve(__dirname, "./database/coderhouse.sqlite"),
    },
    useNullAsDefault: true,
  },
  "message"
)

const productApi = new Contenedor(
  {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      user: "root",
      password: "root",
      database: "mydb",
    },
    pool: { min: 0, max: 7 },
  },
  "product"
);

app.engine(
    "hbs",
    engine({
      extname: ".hbs",
      defaultLayout: join(__dirname, "public/views/layouts/main.hbs"),
      layoutsDir: join(__dirname, "public/views/layouts"),
      partialsDir: join(__dirname, "public/views/partials"),
    })
  );
  //establecemos el motor de la plantilla
  app.set("view engine", "hbs");
  // se establece donde se encuetran los archivos
  app.set("views", join(__dirname, "public/views"));
  app.use(express.static("public"));

// esto lo deberia haber hecho con un router 
/*app.get("/", (req, res) => {
    res.render("form");
    });*/

app.use("/", router);    

const espressServer = app.listen(3000, () => {
  console.log("Server is running on port 3000");
});



const io = new IOServer(espressServer);

io.on("connection", async (socket) => {
    // nueva conexion recibida
    console.log("new connection", socket.id);
    
    socket.emit("server:product", await productApi.getAll());
    
    socket.on("new-product", async (data) => {
      //console.log(data);
      await productApi.save({...data});
      io.emit("server:product", await productApi.getAll());
    })

  // borrar por id no esta funcionando aun 
    socket.on("delete-product", async (id) => {
      await productApi.deleteById(id);
      io.emit("server:product", await productApi.getAll());
    })

    // borrar todos los productos
    socket.on("delete-all", async () => {
      await productApi.deleteAll();
      io.emit("server:product", await productApi.getAll());
    })

   /* socket.on("new-product", (data) => { 
        //console.log(data);
        pruduct.push(data);
        io.emit("server:product", pruduct);
        
    }
   
    );*/
   
    socket.emit("server:message", await messageApi.getAll());

    socket.on("Client-message", async (msgInfo) => {
      // console.log(msgInfo)
      await messageApi.save({...msgInfo, time: new Date().toLocaleString()});
      io.emit("server:message", await messageApi.getAll());
    } );

    /*socket.on("Client-message", (data) => {
        //console.log(data);
        messages.push(data);
        io.emit("server:message", messages);
        // guardar los mensajes en un txt 
        fs.writeFileSync("./public/chats/messages.txt", JSON.stringify(messages));
    })*/
    
});