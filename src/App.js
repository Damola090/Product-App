const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))


//Import all Routers
const product = require('../Routes/Product');

//Configure Routers
app.use('/api/v1/', product);

module.exports = app


