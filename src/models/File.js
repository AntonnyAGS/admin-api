'use strict';

const { Schema, model } = require('mongoose');
const { FileType } = require('../enums');

const ProjectFileSchema = new Schema({
  projectId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  fileName: {
    type: String,
    required: true,
  },
  fileType: {
    type: FileType,
    required: true
  }
},
{
  timestamps: true
}
);

module.exports = model('ProjectFile', ProjectFileSchema);
