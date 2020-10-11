const sql = require("./db.js");
var dateFormat = require('dateformat');
var randomstring = require("randomstring");

// constructor
const Cliente = function(cliente) {
  this.id_persona = cliente.id_persona;
  this.id_direccion = cliente.id_direccion;
  this.comentarios = cliente.comentarios;
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

Cliente.getAllPaginated = (req, result) => {
  // clientes por pagina
  const limit = req.query.limit
  // numero de pagina
  const page = req.query.page
  // offset
  const offset = (page - 1) * limit

  sql.query("SELECT * FROM clientes JOIN personas ON clientes.id_persona = personas.id JOIN direcciones ON clientes.id_direccion = direcciones.id limit "+limit+" OFFSET "+offset, (error, response) => {
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

        if(response.length - i == 1){

          sql.query("SELECT count(*) as total FROM clientes", (error, response) => {
            if (error) {
              console.log("error: ", error);
              result(null, error);
              return;
            }

            var jsonResult = {
              'pagination': {
                'total':response[0].total,
                'current_page':page*1,
                'per_page': limit*1,
                'last_page': Math.ceil(response[0].total/limit),
                'from': ( (page - 1) * limit ) +1,
                'to': (page * limit > response[0].total ? response[0].total : page * limit),
              },
              'clientes':clientes
            }
  
            result(null, jsonResult);

          });  
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
                sql.query("INSERT INTO clientes (id_persona, id_direccion, comentarios, estatus) VALUES (?,?,?,?)", 
                [personId, direccionId, null, 1], (err, res) => {
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
                    var path ='public/documents/';
                    let date_ob = dateFormat(new Date(), "yyyy-mm-dd:h:MM:ss:l");
                    var extencion = documento.ext;
                    var name = "Document-"+date_ob+randomstring.generate(10)+"."+extencion;
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
                            console.log(err);
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

Cliente.updateById = (id, cliente, result) => {
  sql.query(
    "UPDATE clientes SET id_persona = ?, id_direccion = ?, comentarios = ?, estatus = ? WHERE id = ?",
    [cliente.id_persona, cliente.id_direccion, cliente.comentarios, cliente.estatus, id],
    (error, response) => {
      if (error) {
        console.log("error: ", error);
        result(null, {error: error});
        return;
      }

      if (response.affectedRows == 0) {
        // cliente no encontrado
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, { id: id, ...cliente });
    }
  );
};

module.exports = Cliente;