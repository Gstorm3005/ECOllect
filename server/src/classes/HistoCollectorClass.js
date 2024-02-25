const HistoCollectorModel = require("../models/HistoCollectorModel")

class HistoCollector {

    static async create(histocollector) {

        const t = await HistoCollectorModel.create(histocollector)
        return t
    }

    static async find() {

        const t = await HistoCollectorModel.find().exec()
        return t
    }

    static async findById(histocollector_id) {

        const t = await HistoCollectorModel.findById(histocollector_id).exec()
        return t
    }


    static async findByCollector(userId) {

        const t = await HistoCollectorModel.find({collector: userId}).populate('pdd').sort({ $natural: -1 }).exec()
        return t
    }


    static async updateOne(id, histocollector) {

        const t = await HistoCollectorModel.updateOne({ _id: id }, { $set: histocollector }).exec()
        return t
    }

    static async remove(histocollector) {

        const t = await HistoCollectorModel.remove(histocollector).exec()
        return t
    }
}

module.exports = HistoCollector