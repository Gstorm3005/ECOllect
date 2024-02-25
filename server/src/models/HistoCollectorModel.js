const {model, Schema} = require('mongoose')

const HistoCollectorSchema = new Schema({

  kilo: {
    type: Number,
    required: true
  },
  pdd: {
    type: Schema.Types.ObjectId,
    ref: 'Pdd'
  },
  collector: {
    type: Schema.Types.ObjectId,
    ref: 'User'
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

module.exports = HistoCollectorModel = model('HistoCollector', HistoCollectorSchema, 'histo_collectors');