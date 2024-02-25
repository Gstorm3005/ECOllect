const RoleModel = require("../models/RoleModel")

class Role {

    static async find() {

        const t = await RoleModel.find().exec()
        return t
    }

    static async update(id, role) {

        const t = await RoleModel.updateOne({ _id: id }, { $set: role }).exec()
        return t
    }

    static async remove(role) {

        const t = await RoleModel.remove(role).exec()
        return t
    }
}

module.exports = Role