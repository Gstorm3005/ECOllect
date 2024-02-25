const HistoTransporterModel = require("../models/HistoTransporterModel")

class HistoTransporter {

    static async create(histotransporter) {

        const t = await HistoTransporterModel.create(histotransporter)
        return t
    }

    static async find() {

        const t = await HistoTransporterModel.find().exec()
        return t
    }

    static async findById(histotransporter_id) {

        const t = await HistoTransporterModel.findById(histotransporter_id).exec()
        return t
    }

    static async findByTransporter(userId) {

        const t = await HistoTransporterModel.find({transporter: userId}).sort({ $natural: -1 }).exec()
        return t
    }

    static async updateOne(id, histotransporter) {

        const t = await HistoTransporterModel.updateOne({ _id: id }, { $set: histotransporter }).exec()
        return t
    }

    static async remove(histotransporter) {

        const t = await HistoTransporterModel.remove(histotransporter).exec()
        return t
    }
}

module.exports = HistoTransporter