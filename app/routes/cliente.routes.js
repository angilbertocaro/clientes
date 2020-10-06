module.exports = app => {
    const clientes = require("../controllers/cliente.controller.js");
  
    // Index
    app.get("/clientes", clientes.findAll);
  
    // Index by ID
    app.get("/cliente/:clienteId", clientes.findOne);

    // Crear
    app.post("/cliente", clientes.create);
  
    // // Actualizar
    // app.put("/direccion/:direccionId", clientes.update);
};