const Documento = require("../models/documento.model.js");

// Todas los Documentos
exports.findAll = (req, res) => {

    Documento.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ha ocurrido un error."
      });
    else res.send(data);
  });
  
};

// Documento por ID
exports.findOne = (req, res) => {

    Documento.findById(req.params.documentoId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Documento no encontrado.`
        });
      } else {
        res.status(500).send({
          message: "Error buscando documento por la ID " + req.params.documentoId
        });
      }
    } else res.send(data);
  });

};

// Crear nuevo Documento
exports.create = (req, res) => {

  // Validando informacion
  if (!req.body) {
    res.status(400).send({
      message: "La peticion no puede estar vacia"
    });
  }

  // Creando Documento
  const documento = new Documento({
    id_cliente: req.body.id_cliente,
    nombre: req.body.nombre,
    archivo: req.body.archivo,
  });

  // Registrando Documento en BD
  Documento.create(documento, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ha ocurrido un error."
      });
    else res.send(data);
  });

};

// Actualizar Documento
exports.update = (req, res) => {

  // Validando Informacion
  if (!req.body) {
    res.status(400).send({
      message: "La consulta no debe estar vacia"
    });
  }

  Documento.updateById( req.params.documentoId, new Documento(req.body), (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `No se ha encontrado el documento con la id ${req.params.documentoId}.`
          });
        } else {
          res.status(500).send({
            message: "error al actualizar el documento con id " + req.params.documentoId
          });
        }
      } else res.send(data);
    }
  );

};