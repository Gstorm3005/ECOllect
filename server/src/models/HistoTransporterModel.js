const {model, Schema} = require('mongoose')

const HistoTransporterSchema = new Schema({

  kilo: {
    type: Number,
    required: true
  },
  // pdd: {
  //   type: Schema.Types.ObjectId,
  //   required: true,
  //   ref: 'Pdd'
  // },
  transporter: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
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

module.exports = HistoTransporterModel = model('HistoTransporter', HistoTransporterSchema, 'histo_transporters');
