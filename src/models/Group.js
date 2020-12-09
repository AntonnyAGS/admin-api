'use strict';

const { Schema, model } = require('mongoose');

const GroupSchema = new Schema({
  name: {
    type: String,
    required: false
  },
  usersIds: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    alias: 'users'
  }],
},
{
  timestamps: true
}
);

module.exports = model('Group', GroupSchema);
