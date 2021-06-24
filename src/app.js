'use strict';

const express = require('express');
const app = express();

const cors = require('cors');

const routes = require('./routers');

app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use(routes);

module.exports = app;
