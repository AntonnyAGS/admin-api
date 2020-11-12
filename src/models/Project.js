'use strict';
'use strict';

const { Schema, model, ObjectId } = require('mongoose');
const { ProjectStatus } = require('../enums');

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  clientId: {
    type: ObjectId,
    ref: 'Client',
    required: true
  },
  status: {
    type: ProjectStatus,
    required: true
  }
},
{
  timestamps: true
}
);

module.exports = model('Project', ProjectSchema);
