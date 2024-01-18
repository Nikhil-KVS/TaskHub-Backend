const { string } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TasksSchema = new Schema({
 user_id:
 {
  type:String,
  ref:'users',
 },

  name: {
    type: String,
    trim: true,
  },
  y: {
    type: Number,
       trim: true,
  },
  FromDate: {
    type:String,
    trim: true,
  },
  ToDate: {
    type: String,
    trim: true,
  },
  Description: {
    type: String,
    trim: true,
  },
  Status: {
    type: String,
    trim: true,
  },

  role: {
    type: String,
    trim: true,
  }


});

const Tasks = mongoose.model('Tasks', TasksSchema);

module.exports = Tasks;