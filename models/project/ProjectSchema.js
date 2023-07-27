const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    team: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    status: {
      type: String,
      enum: ['Not Started', 'In Progress', 'Completed'],
      default: 'Not Started',
    },
  });
  
module.exports =  mongoose.model('Project', projectSchema);