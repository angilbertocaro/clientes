module.exports = app => {
    const documentos = require("../controllers/documento.controller.js");
  
    // Index
    app.get("/documentos", documentos.findAll);
  
    // Index by ID
    app.get("/documento/:documentoId", documentos.findOne);

    // Crear
    app.post("/documento", documentos.create);
  
    // Actualizar
    app.put("/documento/:documentoId", documentos.update);
};