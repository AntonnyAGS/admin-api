'use strict';

const { Schema, model, ObjectId } = require('mongoose');
const { ScoreType } = require('../enums');

const ScoreSchema = new Schema({
  score: {
    type: Number,
    required: true
  },
  studentId: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  scoresType: [{
    type: String,
    enum: Object.values(ScoreType)
  }],
  projectId: {
    type: ObjectId,
    ref: 'Project'
  },
  groupId: {
    type: ObjectId,
    ref: 'Group'
  },
  tag: {
    type: String,
    required: true,
    unique: true
  }
},
{
  timestamps: true
}
);

module.exports = model('Score', ScoreSchema);
