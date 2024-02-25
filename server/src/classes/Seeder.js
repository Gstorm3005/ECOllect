const WilayaModel = require("../models/WilayaModel");
const UsineModel = require("../models/UsineModel");
const RoleModel = require("../models/RoleModel");

const { wilaya, usine, role } = require("../../mock/buncha");


class seeder {
  async wilaya() {
    //rechercher une wilaya dans la bdd
    const wl_exist = await WilayaModel.findOne();
    if (!wl_exist) {
      const wilayaDocuments = wilaya.map((w, index) => ({
        name: w,
        code: index + 1,
      }));
      await WilayaModel.insertMany(wilayaDocuments);
    }
  }


   async usine(){
    const us_exist = await UsineModel.findOne();
    if(!us_exist){
    await UsineModel.create(usine)}

  }

  async role(){
    const role_exist = await RoleModel.findOne();
    if(!role_exist){
    await RoleModel.create(role)}
  }
}

module.exports = seeder;
