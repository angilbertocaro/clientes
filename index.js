const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require('cors');

const app = express();

// Permitimos el acceso a las peticiones 
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Bienvenido!!!." });
});

// Agregando rutas de personas
require("./app/routes/persona.routes.js")(app);
// Agregando rutas de direcciones
require("./app/routes/direccion.routes.js")(app);

// Configuramos puerto y listener 
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});