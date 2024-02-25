const {model, Schema} = require('mongoose')
const PddSchema = new Schema({

  address: {
    type: String,
    required: true
  },
  kilo: {
    type: Number,
    required: true,
    default: 0
  },
  wilaya: {
    type:  Schema.Types.ObjectId,
    ref: 'Wilaya'
  },
  supervisor: {
    type:  Schema.Types.ObjectId,
    ref: 'User'
  },
  position: {
    type: {
      lat: {
        type: Number,
        required: true
      },
      lng: {
        type: Number,
        required: true
      }
    }
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

module.exports = PddModel = model('Pdd', PddSchema, 'pdds');