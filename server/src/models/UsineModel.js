const {model, Schema} = require('mongoose')

const UsineSchema = new Schema({

  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  stock : {
    type: [
      {
        kilo: {
          type: Number,
          required: true,
          deafult: 0
        },
        type: {
          type: String,
          required: true,
        }
      }
    ]

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

module.exports = UsineModel = model('Usine', UsineSchema,'usines');
