const sql = require("./db.js");

// constructor
const Persona = function(persona) {
  this.nombre = persona.email;
  this.primer_apellido = persona.primer_apellido;
  this.segundo_apellido = persona.segundo_apellido;
  this.telefono = persona.telefono;
  this.rfc = persona.rfc;
};

Persona.getAll = result => {
  sql.query("SELECT * FROM personas", (error, response) => {
    if (error) {
      console.log("error: ", error);
      result(null, error);
      return;
    }

    console.log("personas: ", response);
    result(null, response);
  });
};

Persona.findById = (personaId, result) => {
  sql.query(`SELECT * FROM personas WHERE id = ${personaId}`, (error, response) => {
    if (error) {
      console.log("error: ", error);
      result(error, null);
      return;
    }

    if (response.length) {
      console.log("found customer: ", response[0]);
      result(null, response[0]);
      return;
    }

    // Persona no encontrada
    result({ kind: "not_found" }, null);
  });
};

Persona.create = (nuevaPersona, result) => {
  sql.query("INSERT INTO personas SET ?", nuevaPersona, (error, response) => {
    if (error) {
      console.log("error: ", error);
      result(error, null);
      return;
    }

    result(null, { id: response.insertId, ...nuevaPersona });
  });
};

Persona.updateById = (id, persona, result) => {
  sql.query(
    "UPDATE personas SET nombre = ?, primer_apellido = ?, segundo_apellido = ?, telefono = ?, rfc = ? WHERE id = ?",
    [persona.nombre, persona.primer_apellido, persona.segundo_apellido, persona.telefono, persona.rfc, id],
    (error, response) => {
      if (error) {
        console.log("error: ", error);
        result(null, error);
        return;
      }

      if (response.affectedRows == 0) {
        // persona no encontrada
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, { id: id, ...persona });
    }
  );
};

module.exports = Persona;