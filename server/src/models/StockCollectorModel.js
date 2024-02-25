const {model, Schema} = require('mongoose')
const StockCollectorSchema = new Schema({

  kilo: {
    type: Number,
    required: true
  },
  collector: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  // pdd: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Pdd'
  // },
  created_at:{
    type: Date,
    default: Date.now
  },
  updated_at:{
    type: Date,
    default: Date.now
  }

});

module.exports = StockCollectorModel = model('Stock', StockCollectorSchema, 'stocks');
