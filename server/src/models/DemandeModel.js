const {model, Schema} = require('mongoose')
const DemandeSchema = new Schema({

    company: {
        type: String,
        required: true
    },
    kilo: {
        type: Number,
        required: true,
    },
    plastictype: {
        type: String,
        required: true
    },
    totalprice: {
        type: Number,
        required: true
    }

});

module.exports = DemandeModel = model('Demande', DemandeSchema, 'demandes');