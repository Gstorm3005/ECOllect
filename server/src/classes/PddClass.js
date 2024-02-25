const PddModel = require("../models/PddModel")

class Pdd {

    static async create(pdd) {

        const t = await PddModel.create(pdd)
        return t
    }

    static async find() {

        const t = await PddModel.find().populate("supervisor").populate("wilaya").exec()
        return t
    }

    static async findBySupervisor(supervisor_id){
        const pdd = await PddModel.findOne({supervisor: supervisor_id}).exec()
        return pdd
    }

    static async findById(pdd_id) {

        const t = await PddModel.findById(pdd_id).exec()
        return t
    }

    static async update(id, pdd) {

        const t = await PddModel.updateOne({ _id: id }, { $set: pdd }).exec()
        return t
    }

    static async remove(pdd) {

        const t = await PddModel.deleteOne({ _id: pdd }).exec()
        return t
    }
}

module.exports = Pdd