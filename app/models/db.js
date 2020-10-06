const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

// Creamos la conexion a la base de datos MYSQL
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

// Abrimos la conexion de la base de datos
connection.connect(error => {
  if (error) throw error;
  console.log("Conexion exitosa!!!");
});

module.exports = connection;