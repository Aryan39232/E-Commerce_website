const express = require('express');
const app = express();
const product = require('./routes/product');
const errorMiddleware  = require('./middleware/error')
require('./DB/database')


app.use(express.json)
app.use("/api/v1" , product)
app.use(errorMiddleware)


module.exports = app;