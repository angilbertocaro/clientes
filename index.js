const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require('cors');

const app = express();

// parse requests of content-type: application/json
app.use(cors());
app.use(bodyParser.json());
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Angilberto application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});