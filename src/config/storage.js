'use strict';

const { Storage } = require('@google-cloud/storage');
const path = require('path');

module.exports = new Storage({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  projectId: process.env.GOOGLE_PROJECT_ID
});
