import express from 'express';
import { Server as IOServer } from "socket.io";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { engine } from "express-handlebars";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pruduct   = [];
const messages = [];

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
app.get("/", (req, res) => {
    res.render("form");
    });

const espressServer = app.listen(3000, () => {
  console.log("Server is running on port 3000");
});



const io = new IOServer(espressServer);

io.on("connection", (socket) => {
    // nueva conexion recibida
    console.log("new connection", socket.id);
    
    socket.emit("server:product", pruduct);

    socket.on("new-product", (data) => {
        //console.log(data);
        pruduct.push(data);
        io.emit("server:product", pruduct);
    });
   
    socket.emit("server:message", messages);

    socket.on("Client-message", (data) => {
        //console.log(data);
        messages.push(data);
        io.emit("server:message", messages);
    })
    
});