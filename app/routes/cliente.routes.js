module.exports = app => {
    const clientes = require("../controllers/cliente.controller.js");

    // Paginated
    app.get("/clientes", clientes.findAllPaginated);

    // Index
    app.get("/clientes/all", clientes.findAll);
  
    // Index by ID
    app.get("/cliente/:clienteId", clientes.findOne);

    // Crear
    app.post("/cliente", clientes.create);
  
    // Actualizar
    app.put("/cliente/:clienteId", clientes.update);
};