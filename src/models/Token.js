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
  },
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expireAfterSeconds: 604800 }
  },
},
{
  timestamps: true
}
);

module.exports = model('Token', TokenSchema);
