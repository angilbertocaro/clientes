const Direccion = require("../models/direccion.model.js");

// Todas las direcciones
exports.findAll = (req, res) => {

    Direccion.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ha ocurrido un error."
      });
    else res.send(data);
  });
  
};

// Direccion por ID
exports.findOne = (req, res) => {

    Direccion.findById(req.params.direccionId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Direccion no encontrada.`
        });
      } else {
        res.status(500).send({
          message: "Error buscando direccion por la ID " + req.params.direccionId
        });
      }
    } else res.send(data);
  });

};

// Crear nueva Direccion
exports.create = (req, res) => {

  // Validando informacion
  if (!req.body) {
    res.status(400).send({
      message: "La peticion no puede estar vacia"
    });
  }

  // Creando Direccion
  const direccion = new Direccion({
    calle: req.body.calle,
    numero: req.body.numero,
    colonia: req.body.colonia,
    codigo_postal: req.body.codigo_postal,
  });

  // Registrando Direccion en BD
  Direccion.create(direccion, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ha ocurrido un error."
      });
    else res.send(data);
  });

};

// Actualizar Direccion
exports.update = (req, res) => {

  // Validando Informacion
  if (!req.body) {
    res.status(400).send({
      message: "La consulta no debe estar vacia"
    });
  }

  Direccion.updateById( req.params.direccionId, new Direccion(req.body), (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `No se ha encontrado una direccion con la id ${req.params.direccionId}.`
          });
        } else {
          res.status(500).send({
            message: "error al actualizar la direccion con id " + req.params.direccionId
          });
        }
      } else res.send(data);
    }
  );

};