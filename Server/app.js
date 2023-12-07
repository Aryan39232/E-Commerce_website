const express = require('express');
const app = express();
const product = require('./routes/product');
const user = require('./routes/user');
const errorMiddleware  = require('./middleware/error')
const cookieParser = require('cookie-parser');

require('./DB/database')

app.use(cookieParser)
app.use(express.json)
app.use("/api/v1" , product)
app.use("/api/v1" , user)
app.use(errorMiddleware)


module.exports = app;