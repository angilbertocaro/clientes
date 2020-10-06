module.exports = app => {
    const direcciones = require("../controllers/direccion.controller.js");
  
    // Index
    app.get("/direcciones", direcciones.findAll);
  
    // Index by ID
    app.get("/direccion/:direccionId", direcciones.findOne);

    // Crear
    app.post("/direccion", direcciones.create);
  
    // Actualizar
    app.put("/direccion/:direccionId", direcciones.update);
};