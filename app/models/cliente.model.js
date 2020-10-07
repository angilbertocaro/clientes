const sql = require("./db.js");

// constructor
const Cliente = function(cliente) {
  this.id_persona = cliente.id_persona;
  this.id_direccion = cliente.id_direccion;
  this.estatus = cliente.estatus;
};

Cliente.getAll = result => {
  sql.query("SELECT * FROM clientes JOIN personas ON clientes.id_persona = personas.id JOIN direcciones ON clientes.id_direccion = direcciones.id", (error, response) => {
    if (error) {
      console.log("error: ", error);
      result(null, error);
      return;
    }

    var clientes = [];
    for (let i = 0; i < response.length; i++) {

      sql.query(`SELECT * FROM documentos WHERE id_cliente = ${response[i].id}`, (error, res) => {
        if (error) {
          console.log("error: ", error);
          result(null, error);
          return;
        }
        response[i] = Object.assign({}, response[i], {documentos:res});  
        clientes.push(response[i]);
        console.log(clientes);

        if(response.length - i == 1){
          result(null, clientes);
        }
      });

    }

  });
};

Cliente.findById = (clienteId, result) => {
  sql.query(`SELECT * FROM clientes JOIN personas ON clientes.id_persona = personas.id JOIN direcciones ON clientes.id_direccion = direcciones.id WHERE clientes.id = ${clienteId}`, (error, response) => {
    if (error) {
      console.log("error: ", error);
      result(error, null);
      return;
    }

    if (response.length) {
      console.log("cliente encontrado: ", response[0]);
      sql.query(`SELECT * FROM documentos WHERE id_cliente = ${response[0].id}`, (error, res) => {
        if (error) {
          console.log("error: ", error);
          result(null, error);
          return;
        }
        response[0] = Object.assign({}, response[0], {documentos:res});  
        result(null, response[0]);
        return;
      });
    } else {
      // Cliente no encontrado
      result({ kind: "not_found" }, null);
    }
    
  });
};

Cliente.create = (request, resultado) => {

    sql.beginTransaction(function(err) {
        // Error por si la transaccion falla
        if (err) { 
            console.log("error: ", error);
            resultado(error, null);
            return; 
        }

        // Insercion en la tabla persona
        sql.query("INSERT INTO personas (nombre, primer_apellido, segundo_apellido, telefono, rfc) VALUES (?,?,?,?,?)", 
        [request.nombre, request.primer_apellido, request.segundo_apellido, request.telefono, request.rfc], (err, result) => {
        if (err != null) { 
            sql.rollback( (error) => {
            console.log("error: ", error);
            resultado(error, null);
            return;
            });
        }
    
            // Insercion en la tabla direcciones
            var personId = result.insertId;
            sql.query("INSERT INTO direcciones (calle, numero, colonia, codigo_postal) VALUES (?,?,?,?)", 
            [request.calle, request.numero, request.colonia, request.codigo_postal], (err, response) => {
            if (err != null) { 
                sql.rollback( (error) => {
                console.log("error: ", error);
                resultado(error, null);
                return;
                });
            }

                // Insercion en la tabla clientes con los resultados de las tablas anteriores
                var direccionId = response.insertId;
                sql.query("INSERT INTO clientes (id_persona, id_direccion, estatus) VALUES (?,?,?)", 
                [personId, direccionId, 1], (err, res) => {
                if (err != null) { 
                    sql.rollback( (error) => {
                    console.log("error: ", error);
                    resultado(error, null);
                    return;
                    });
                }

                // Subida de archivos y registro en la base de datos
                var clienteId = res.insertId;
                const fs = require('fs');
                var documentos = request.documentos;
                documentos.forEach(documento => { 

                    // Preparando rutas de archivos y nombres auxiliares
                    var path ='app/public/documents/';
                    let date_ob = new Date();
                    var extencion = documento.ext;
                    var name = "Document-"+date_ob+"."+extencion;
                    var fullname = path+name;
                    var base64Str = documento.base64;

                    // Guardando archivos en carpera public/documentos
                    fs.writeFile(fullname, base64Str, 'base64', function(err) {
                        console.log(err);
                    });

                    // Registrando la informacion y ruta del archivo en la base de datos
                    sql.query("INSERT INTO documentos (id_cliente, nombre, archivo) VALUES (?,?,?)", 
                    [clienteId, documento.nombre, name], (err, res) => {
                        if (err != null) { 
                            sql.rollback( (error) => {
                            console.log("error: ", error);
                            resultado(error, null);
                            return;
                            });
                        }
                    });

                }); 
                

                // Confirmando el registro de todas las inserciones
                sql.commit( (err) => {
                if (err != null) { 
                    sql.rollback( (error) => {
                    console.log("error: ", error);
                    resultado(error, null);
                    return;
                    });
                }

                // Valor retornado, id del nuevo prospecto
                resultado(null, { id: res.insertId });
                });
            });
        });
        });
    });

    // En caso de error retornamos 0
    process.on('uncaughtException', function (error) {
        console.log(error.stack);
        resultado(null, { error : "Ha ocurrido un error", code: 0});
    });
};

Cliente.updateById = (id, direccion, result) => {
  sql.query(
    "UPDATE clientes SET calle = ?, numero = ?, colonia = ?, codigo_postal = ? WHERE id = ?",
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

module.exports = Cliente;