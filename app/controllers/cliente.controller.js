const Cliente = require("../models/cliente.model.js");
const Persona = require("../models/persona.model.js");
const Direccion = require("../models/direccion.model.js");

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
        else res.send(data);
    });
  
    // // Creando Persona
    // const persona = new Persona({
    //     nombre: req.body.nombre,
    //     primer_apellido: req.body.primer_apellido,
    //     segundo_apellido: req.body.segundo_apellido,
    //     telefono: req.body.telefono,
    //     rfc: req.body.rfc
    // });

    // // Creando Direccion
    // const direccion = new Direccion({
    //     calle: req.body.calle,
    //     numero: req.body.numero,
    //     colonia: req.body.colonia,
    //     codigo_postal: req.body.codigo_postal,
    // });

    // var personaId = 0;
    // var direccionId = 0;
    // var estatus = 1;

    // // Registrando Persona en BD
    // Persona.create(persona, (err, data) => {
    //     if (err)
    //     res.status(500).send({
    //         message:
    //         err.message || "Ha ocurrido un error."
    //     });
    //     else {
    //         personaId = data.id;

    //         // Registrando Direccion en BD
    //         Direccion.create(direccion, (err, data) => {
    //             if (err)
    //             res.status(500).send({
    //                 message:
    //                 err.message || "Ha ocurrido un error."
    //             });
    //             else {
    //                 direccionId = data.id;

    //                 // Creando Direccion
    //                 const cliente = new Cliente({
    //                     id_persona: personaId,
    //                     id_direccion: direccionId,
    //                     estatus: 1,
    //                 });

    //                 // Registrando Cliene en BD
    //                 Cliente.create(cliente, (err, data) => {
    //                     if (err)
    //                     res.status(500).send({
    //                         message:
    //                         err.message || "Ha ocurrido un error."
    //                     });
    //                     else res.send(data);
    //                 });
    //             }
    //         });
    //     }
    // });
  
};