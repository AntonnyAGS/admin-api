'use strict';

const { Schema, model } = require('mongoose');
const { FileType } = require('../enums');

const FileSchema = new Schema({
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
  },
  tag: {
    type: String,
    required: true,
    select: false
  }
},
{
  timestamps: true
}
);

module.exports = model('File', FileSchema);
