const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require('cors');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const app = express();

// Permitimos el acceso a las peticiones externas
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

// Agregando ruta estatica publica para recursos y documentos
var publicDir = require('path').join(__dirname,'/app/public');
app.use(express.static(publicDir));

// Agregando rutas de personas
require("./app/routes/persona.routes.js")(app);
// Agregando rutas de direcciones
require("./app/routes/direccion.routes.js")(app);
// Agregando rutas de clientes
require("./app/routes/cliente.routes.js")(app);
// Agregando rutas de documentos
require("./app/routes/documento.routes.js")(app);

// Configurando Cluster, puerto y servidor http
const PORT = 4000;
if (cluster.isMaster) {
  console.log(`Master ${process.pid} ejecutandose`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} murio`);
    cluster.fork();
  });
} else {

  cluster.on('exit',() => {
    cluster.fork();
  });

  process.on('error', (error) => {
      console.log(error.stack);
  });

  // Configuramos puerto y listener 
  app.listen(PORT, () => {
    console.log(`Worker ${process.pid} ejecutandose en puerto ${PORT}.`);
  });
 
}