const express = require('express');
const app = express();

require('./DB/database')
app.use(express.json)

const product = require('./routes/product');
app.use("/api/v1" , product)

module.exports = app;