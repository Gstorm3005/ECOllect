const UserModel = require("../models/UserModel")
const bcryptjs = require("bcryptjs")

class User {

    static async create(user) {

        user.password = await bcryptjs.hash(user.password, 10)
        const t = await UserModel.create(user)
        return t
    }

    static async find() {

        const t = await UserModel.find().populate('role').exec()
        return t
    }

    static async findById(user_id) {

        const t = await UserModel.findById(user_id).exec()
        return t
    }

    static async update(id, user) {

        const t = await UserModel.updateOne({ _id: id }, { $set: user }).exec()
        return t
    }

    static async remove(user) {

        const t = await UserModel.deleteOne({ _id: user }).exec()
        return t
    }

    static async findByEmail(email) {

        const t = await UserModel.findOne({ email: email }).populate('role').exec()
        return t
    }
}

module.exports = User