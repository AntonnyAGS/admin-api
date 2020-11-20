'use strict';

const { Schema, model } = require('mongoose');
const { PersonType, UserRole } = require('../enums');
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  ra: {
    type: String
  },
  role: {
    type: UserRole,
    required: true
  },
  personType: {
    type: PersonType
  },
  cnpj: {
    type: String
  },
  cpf: {
    type: String
  },
  phone: {
    type: String
  }
},
{
  timestamps: true
}
);

module.exports = model('User', UserSchema);
