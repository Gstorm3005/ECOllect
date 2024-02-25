const {model, Schema} = require('mongoose')


const ChargementSchema = new Schema({

  kilo: {
    type: Number,
    required: true
  },
  transporter: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // pdd: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Pdd',
  //   required: true
  // },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }

});

module.exports = ChargementModel = model('Chargement', ChargementSchema, 'chargements');
