const {model, Schema} = require('mongoose')

const UserSchema = new Schema({

  profile_Pic: {
    type: String,
    required: false
  },
  firstName: {
    type: String,
    required: true,
    min: 2,
    max: 20
  },
  lastName: {
    type: String,
    required: true,
    min: 2,
    max: 20
  },
  gender: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true,
    min: 10,
    max: 10
  },
  birthdate: {
    type: Date,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    min: 6
  },
  status: {
    type: Boolean,
    required: true
  },
  id_card_file: {
    type: String,
    required: false
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: 'Role'
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

module.exports = UserModel = model('User', UserSchema, 'users');