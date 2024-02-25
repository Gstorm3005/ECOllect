const HistoPddModel = require("../models/HistoPddModel")

class HistoPdd {

    static async create(histopdd) {

        const t = await HistoPddModel.create(histopdd)
        return t
    }

    static async find() {

        const t = await HistoPddModel.find().exec()
        return t
    }

    static async findById(histopdd_id) {

        const t = await HistoPddModel.findById(histopdd_id).exec()
        return t
    }

    static async findBySupervisor(pdd_Id) {

        const t = await HistoPddModel.find({pdd: pdd_Id}).populate('transporter').sort({ $natural: -1 }).exec()
        return t
    }

    static async updateOne(id, histopdd) {

        const t = await HistoPddModel.updateOne({ _id: id }, { $set: histopdd }).exec()
        return t
    }

    static async remove(histopdd) {

        const t = await HistoPddModel.remove(histopdd).exec()
        return t
    }
}

module.exports = HistoPdd