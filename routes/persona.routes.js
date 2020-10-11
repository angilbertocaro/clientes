module.exports = app => {
    const personas = require("../controllers/persona.controller.js");
  
    // Index
    app.get("/personas", personas.findAll);
  
    // Index by ID
    app.get("/persona/:personaId", personas.findOne);

    // Crear
    app.post("/persona", personas.create);
  
    // Actualizar
    app.put("/persona/:personaId", personas.update);
};