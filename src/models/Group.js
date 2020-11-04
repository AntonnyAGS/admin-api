'use strict';

const { Schema, model } = require('mongoose');

const GroupSchema = new Schema({
  groupName: {
    type: String,
    required: false
  },
  userId: {
    type: [String ],
    required: true,
  },
},
{
  timestamps: true
}
);

module.exports = model('Group', GroupSchema);
