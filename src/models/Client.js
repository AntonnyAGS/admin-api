'use strict';

const { Schema, model } = require('mongoose');
const { PersonType } = require('../enums');

const ClientSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  cpf: {
    type: String
  },
  cnpj: {
    type: String
  },
  enterpriseName: {
    type: String,
    required: true
  },
  type: {
    type: PersonType,
    required: true
  }
},
{
  timestamps: true
}
);

module.exports = model('Client', ClientSchema);
