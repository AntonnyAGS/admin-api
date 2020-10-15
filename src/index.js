'use strict';

const express = require('express');
const app = express();

const http = require('http');
const server = http.Server(app);

const cors = require('cors');
const bodyParse = require('body-parser');

require ('./config/mongodb');

const PORT = 3001;
app.use(cors());
app.use(bodyParse.json());

app.get('/', (req, res) => {
  res.send('Hello world')
});

server.listen(PORT, () => console.log(`Server is running on PORT =====> ${PORT}`));
