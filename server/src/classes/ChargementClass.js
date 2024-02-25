const ChargementModel = require("../models/ChargementModel")

class Chargement {

    static async create(chargement) {

        const t = await ChargementModel.create(chargement)
        return t
    }
    

    static async find() {

        const t = await ChargementModel.find().populate('transporter').exec()
        return t
    }

    static async findById(chargement_id) {

        const t = await ChargementModel.findById(chargement_id).exec()
        return t
    }

    static async findByTransporter(transporter_id){

        const user = await ChargementModel.findOne({transporter: transporter_id}).exec()
        return user
    }
    
    static async update(id, chargement) {

        const t = await ChargementModel.updateOne({ _id: id }, { $set: chargement }).exec()
        return t
    }

    static async remove(chargement) {

        const t = await ChargementModel.remove(chargement).exec()
        return t
    }
}

module.exports = Chargement