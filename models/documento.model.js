const sql = require("./db.js");

// constructor
const Documento = function(documento) {
  this.id_cliente = documento.id_cliente;
  this.nombre = documento.nombre;
  this.archivo = documento.archivo;
};

Documento.getAll = result => {
  sql.query("SELECT * FROM documentos", (error, response) => {
    if (error) {
      console.log("error: ", error);
      result(null, error);
      return;
    }

    console.log("documentos: ", response);
    result(null, response);
  });
};

Documento.findById = (documentoId, result) => {
  sql.query(`SELECT * FROM documentos WHERE id = ${documentoId}`, (error, response) => {
    if (error) {
      console.log("error: ", error);
      result(error, null);
      return;
    }

    if (response.length) {
      console.log("documento encontrado: ", response[0]);
      result(null, response[0]);
      return;
    }

    // Documento no encontrada
    result({ kind: "not_found" }, null);
  });
};

Documento.create = (nuevoDocumento, result) => {
  sql.query("INSERT INTO documentos SET ?", nuevoDocumento, (error, response) => {
    if (error) {
      console.log("error: ", error);
      result(error, null);
      return;
    }

    result(null, { id: response.insertId, ...nuevoDocumento });
  });
};

Documento.updateById = (id, documento, result) => {
  sql.query(
    "UPDATE documentos SET id_cliente = ?, nombre = ?, archivo = ? WHERE id = ?",
    [documento.id_cliente, documento.nombre, documento.archivo, id],
    (error, response) => {
      if (error) {
        console.log("error: ", error);
        result(null, error);
        return;
      }

      if (response.affectedRows == 0) {
        // documento no encontrado
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, { id: id, ...documento });
    }
  );
};

module.exports = Documento;