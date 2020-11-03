'use strict';

const { Schema, model } = require('mongoose');

const GroupSchema = new Schema({
  group_name: {
    type: String,
    required: false
  },
  members_id: {
    type: [String ],
    required: true,
  },
},
{
  timestamps: true
}
);

module.exports = model('Group', GroupSchema);
