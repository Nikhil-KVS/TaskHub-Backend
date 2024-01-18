const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
  displayName: {
    type: String
  },
  code: {
    type: String
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'INACTIVE']
  }

}

);

const Role = mongoose.model('Role', RoleSchema);

module.exports = Role;
