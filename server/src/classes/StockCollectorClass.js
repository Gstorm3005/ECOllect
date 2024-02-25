const StockCollectorModel = require("../models/StockCollectorModel")


class StockCollector {

    static async create(stockcollector) {

        const t = await StockCollectorModel.create(stockcollector)
        return t
    }

    static async find() {

        const t = await StockCollectorModel.find().populate('collector').exec()
        return t
    }

    static async findById(stockcollector_id) {

        const t = await StockCollectorModel.findById(stockcollector_id).exec()
        return t
    }

    static async findByCollector(collector_id) {

        const t = await StockCollectorModel.findOne({collector: collector_id}).exec()
        return t
    }

    static async findStockByCollector(collector_id) {

        const t = await StockCollectorModel.findOne({collector: collector_id}).exec()
        return t
    }

    static async update(id, stockcollector) {

        const t = await StockCollectorModel.updateOne({ _id: id }, { $set: stockcollector }).exec()
        return t
    }

    static async remove(stockcollector) {

        const t = await StockCollectorModel.remove(stockcollector).exec()
        return t
    }
}

module.exports = StockCollector