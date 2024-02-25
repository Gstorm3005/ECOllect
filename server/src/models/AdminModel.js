const {model, Schema} = require('mongoose')

const AdminSchema = new Schema({

  firstname: {
    type: String,
    required: true,
    min: 2,
    max: 20
  },
  lastname: {
    type: String,
    required: true,
    min: 2,
    max: 20
  },
  username: {
    type: String,
    required: true,
    unique: true,
    min: 6
  },
  password: {
    type: String,
    required: true,
    min: 6
  },
  created_at:{
    type: Date,
    default: Date.now
  },
  updated_at:{
    type: Date,
    default: Date.now
  }

});

module.exports = AdminModel = model('Admin', AdminSchema,'admins');