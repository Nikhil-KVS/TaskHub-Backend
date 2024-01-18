const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
  },
  mobileNumber: {
    type: String,
    trim: true,
    match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit mobile number'],
  },
  password: {
    type: String,

  },
  city: {
    type: String,

    trim: true,
  },
  state: {
    type: String,
    trim: true,
  },

  zip: {
    type: String,

    trim: true,
  },
  Address: {
    type: String,
    trim: true,
  },
  
  role:{
       type:String,
       trim:true,
       default: 'people',

  }

});

const User = mongoose.model('users', userSchema);

module.exports = User;
