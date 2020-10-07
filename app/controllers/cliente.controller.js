const Cliente = require("../models/cliente.model.js");

// Todas los clientes
exports.findAll = (req, res) => {

    Cliente.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ha ocurrido un error."
      });
    else res.send(data);
  });
  
};

// Cliente por ID
exports.findOne = (req, res) => {

    Cliente.findById(req.params.clienteId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Cliente no encontrado.`
        });
      } else {
        res.status(500).send({
          message: "Error buscando cliente por la ID " + req.params.clienteId
        });
      }
    } else res.send(data);
  });

};

// Crear nuevo Cliente
exports.create = (req, res) => {

    // Validando informacion
    if (!req.body) {
      res.status(400).send({
        message: "La peticion no puede estar vacia"
      });
    }

    // Registrando Persona en BD
    Cliente.create(req.body, (err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Ha ocurrido un error."
        });
        else if(data.error != null){
          res.status(500).send(data);
        } else res.send(data);
    });
};

// Actualizar Cliente
exports.update = (req, res) => {

  // Validando Informacion
  if (!req.body) {
    res.status(400).send({
      message: "La consulta no debe estar vacia"
    });
  }

  Cliente.updateById( req.params.clienteId, new Cliente(req.body), (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `No se ha encontrado el cliente con la id ${req.params.clienteId}.`
          });
        } else {
          res.status(500).send({
            message: "error al actualizar el cliente con id " + req.params.clienteId
          });
        }
      } if(data.error != null){
        res.status(500).send(data);
      } else res.send(data);
    }
  );

};