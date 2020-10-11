const sql = require("./db.js");

// constructor
const Direccion = function(direccion) {
  this.calle = direccion.calle;
  this.numero = direccion.numero;
  this.colonia = direccion.colonia;
  this.codigo_postal = direccion.codigo_postal;
};

Direccion.getAll = result => {
  sql.query("SELECT * FROM direcciones", (error, response) => {
    if (error) {
      console.log("error: ", error);
      result(null, error);
      return;
    }

    console.log("direcciones: ", response);
    result(null, response);
  });
};

Direccion.findById = (direccionId, result) => {
  sql.query(`SELECT * FROM direcciones WHERE id = ${direccionId}`, (error, response) => {
    if (error) {
      console.log("error: ", error);
      result(error, null);
      return;
    }

    if (response.length) {
      console.log("direccion encontrada: ", response[0]);
      result(null, response[0]);
      return;
    }

    // Direccion no encontrada
    result({ kind: "not_found" }, null);
  });
};

Direccion.create = (nuevaDireccion, result) => {
  sql.query("INSERT INTO direcciones SET ?", nuevaDireccion, (error, response) => {
    if (error) {
      console.log("error: ", error);
      result(error, null);
      return;
    }

    result(null, { id: response.insertId, ...nuevaDireccion });
  });
};

Direccion.updateById = (id, direccion, result) => {
  sql.query(
    "UPDATE direcciones SET calle = ?, numero = ?, colonia = ?, codigo_postal = ? WHERE id = ?",
    [direccion.calle, direccion.numero, direccion.colonia, direccion.codigo_postal, id],
    (error, response) => {
      if (error) {
        console.log("error: ", error);
        result(null, error);
        return;
      }

      if (response.affectedRows == 0) {
        // direccion no encontrada
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, { id: id, ...direccion });
    }
  );
};

module.exports = Direccion;