'use strict';

const { Schema, model, ObjectId } = require('mongoose');

const TokenSchema = new Schema({
  token: {
    type: String,
    required: true
  },
  refreshToken: {
    type: String,
    required: true
  },
  userId: {
    type: ObjectId,
    ref: 'User',
    required: true
  }
},
{
  timestamps: true
}
);

module.exports = model('Token', TokenSchema);
