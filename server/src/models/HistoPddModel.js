const {model, Schema} = require('mongoose')
const HistoPddSchema = new Schema({

  transporter: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  kilo_transported: {
    type: Number,
    required: true
  },
  pdd: {
    type: Schema.Types.ObjectId,
    ref: 'Pdd'
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

module.exports = HistoPddModel = model('HistoPdd', HistoPddSchema, 'histo_pdds');
