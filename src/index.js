'use strict';

const express = require('express');
const app = express();

const http = require('http');
const server = http.Server(app);

const cors = require('cors');
const bodyParse = require('body-parser');

require(__dirname + '/globals.js')();

require (__CONFIG + 'mongodb');

const routes = require('/routes');

const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(bodyParse.json());

app.use(routes)

server.listen(PORT, () => console.log(`Server is running on PORT =====> ${PORT}`));
