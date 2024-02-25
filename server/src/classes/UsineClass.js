const UsineModel = require("../models/UsineModel")

class Usine {

    static async find() {

        const t = await UsineModel.findOne().exec()
        return t
    }

    static async findById(usine_id) {

        const t = await UsineModel.findById(usine_id).exec()
        return t
    }

    static async remove(usine) {

        const t = await UsineModel.remove(usine).exec()
        return t
    }

    static async update(id, usine) {

        const t = await UsineModel.updateOne({ _id: id }, { $set: usine }).exec()
        return t
    }
}

module.exports = Usine