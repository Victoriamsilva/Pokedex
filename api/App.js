const express = require('express');
require("dotenv-safe").config();
const app = express();

app.use(express.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, x-access-token');

    next();
});

const routeUser = require('./routes/user')
const routePokemon = require('./routes/pokemon')
const routeList = require("./routes/lists")
app.use('/', routeUser, routePokemon, routeList)

app.listen(3100)

module.exports = app;

//app.listen(3000, () => console.log('Servidor: http://localhost:3000'))