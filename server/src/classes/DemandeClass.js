const DemandeModel = require("../models/DemandeModel")

class Demande {

    static async create(demande) {

        const t = await DemandeModel.create(demande)
        return t
    }

    static async find() {

        const t = await DemandeModel.find().exec()
        return t
    }

    static async findById(demande_id) {

        const t = await DemandeModel.findById(demande_id).exec()
        return t
    }

    static async update(id, demande) {

        const t = await DemandeModel.updateOne({ _id: id }, { $set: demande }).exec()
        return t
    }

    static async remove(demande) {

        const t = await DemandeModel.deleteOne({ _id: demande }).exec()
        return t
    }
}

module.exports = Demande