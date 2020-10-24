'use strict';

const express = require('express');
const app = express();

const cors = require('cors');
const bodyParse = require('body-parser');

const routes = require('./routers');

app.use(cors());
app.use(bodyParse.json());

app.use(routes);

module.exports = app;
