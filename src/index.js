const express = require('express');
const bodyParser = require('body-parser');
const _connect = require('./db/_connect');
const userRoutes = require('./routes/userRouter');
const todoExchangeRoutes = require('./routes/todoExchangeRouter');
//configuramos el dotenv
require('dotenv').config();

//conexion de mongo
_connect();

const app = express();

app.use(bodyParser.json());

//Rutas
app.use('/account', userRoutes);
app.use('/exchanges', todoExchangeRoutes);

app.listen(process.env.PORT, ()=>console.log(`App listening on PORT ${process.env.PORT}`));

