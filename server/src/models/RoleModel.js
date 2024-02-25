const {model, Schema} = require('mongoose')

const RoleSchema = new Schema({
  name: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = RoleModel = model('Role', RoleSchema, 'roles');