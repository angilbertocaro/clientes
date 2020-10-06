const Persona = require("../models/persona.model.js");

// Todas las personas
exports.findAll = (req, res) => {

    Persona.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ha ocurrido un error."
      });
    else res.send(data);
  });
  
};

// Persona por ID
exports.findOne = (req, res) => {

  Persona.findById(req.params.personaId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Persona no encontrada.`
        });
      } else {
        res.status(500).send({
          message: "Error buscando persona por la ID " + req.params.personaId
        });
      }
    } else res.send(data);
  });

};

// Crear nueva Persona
exports.create = (req, res) => {

  // Validando informacion
  if (!req.body) {
    res.status(400).send({
      message: "La peticion no puede estar vacia"
    });
  }

  // Creando Persona
  const persona = new Persona({
    nombre: req.body.nombre,
    primer_apellido: req.body.primer_apellido,
    segundo_apellido: req.body.segundo_apellido,
    telefono: req.body.telefono,
    rfc: req.body.rfc
  });

  // Registrando Persona en BD
  Persona.create(persona, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ha ocurrido un error."
      });
    else res.send(data);
  });

};

// Actualizar Persona
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "La consulta no debe estar vacia"
    });
  }

  Persona.updateById( req.params.personaId, new Persona(req.body), (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `No se ha encontrado una persona con la id ${req.params.personaId}.`
          });
        } else {
          res.status(500).send({
            message: "error al actualizar la persona con id " + req.params.personaId
          });
        }
      } else res.send(data);
    }
  );

};