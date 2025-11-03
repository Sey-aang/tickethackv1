require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

// Connexion à MongoDB
require('./models/connection');

const indexRouter = require('./routes/index');
const tripsRouter = require('./routes/trips');
const cartsRouter = require('./routes/carts');
const bookingsRouter = require('./routes/bookings');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/trips', tripsRouter);
app.use('/carts', cartsRouter);
app.use('/bookings', bookingsRouter);

module.exports = app;
