import Model from "../config/sequelize";
const CateforyModel = Model.category;
const category = Model.category;
const staff = Model.staff;
const { Op } = require('sequelize');
import auth from "../middleware/authenJWT";
class category_controller {
  async get(req, res) {
    try {
      const id = req.query.id || 0;
      if (id != 0) {
        const category = await CateforyModel.findOne({
          where: { id },
        });
        if (category) res.status(200).send({ code: "002", data: category });
        else {
          res.status(200).send({ code: "003", data: category });
        }
      } else {
        const category = await CateforyModel.findAll();
        res.status(200).send({ code: "002", data: category });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error" });
    }
  }

  getCategoryById = async (req, res) => {
    const { id } = req.params;

    try {
      const foundCategory = await category.findOne({ where: { id } });

      if (foundCategory) {
        return res.status(200).send({ code: "002", data: foundCategory });
      } else {
        return res.status(404).send({ code: "014" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send({ code: "006" });
    }
  };

  createCategory = async (req, res) => {
    let { name, id_parent } = req.body;
    if (!name) {
      return res.status(500).send({ code: "009" });
    }
    name = name.trim();
    let checkName = await category.findOne({ where: { name } });
    if (checkName?.dataValues) {
      return res.status(500).send({ code: "011" });
    }
    let id_account = auth.tokenData(req)?.id || 1;
    let create_by = 1;
    let dataStaff = await staff.findOne({ where: { id_account } });
    if (dataStaff && dataStaff.dataValues && dataStaff.dataValues.id) {
      create_by = dataStaff.dataValues.id;
    }
    try {
      await category.create({ name, create_by, id_parent, status: 1 });
      console.log("Thành công rồi bro");
      return res.status(200).send({ code: "004" });
    } catch (e) {
      console.log(e);
      return res.status(500).send({ code: "005" });
    }
  };

  updateCategory = async (req, res) => {
    let updateData = req.body;
    let { id } = req.query;
    if (id) {
      try {
        let dataCategory = await category.findOne({ where: { id } });
        if (
          dataCategory &&
          dataCategory.dataValues &&
          dataCategory.dataValues.id
        ) {
          if (updateData.name) {
            let name = updateData.name.trim();
            let checkName = await category.findOne({
              where: {
                name: name,
                id: { [Op.ne]: id }
              }
            });
            if (checkName?.dataValues) {
              return res.status(500).send({ code: "011" });
            }
            dataCategory.name = name;
          }
          if (updateData.id_parent) {
            dataCategory.id_parent = updateData.id_parent;
          }

          dataCategory.save();
          return res.status(200).send({ code: "013" });
        } else {
          return res.status(404).send({ code: "014" });
        }
      } catch (e) {
        console.log(e);
        return res.status(500).send({ code: "201" });
      }
    }
  };

  getAllCategory = async (req, res) => {
    try {
      let { id_parent } = req.query;

      const page = parseInt(req.query.page) || 1; //Trang bao nhiêu
      const pageSize = parseInt(req.query.pageSize) || 10; // bao nhiêu nhà cung cấp trong 1 trang
      let startIndex = (page - 1) * pageSize;
      let endIndex = startIndex + pageSize;

      let data = "";
      if (id_parent) {
        data = await category.findAll({ where: { id_parent } });
      } else {
        data = await category.findAll();
      }

      const paginatedProducts = data.slice(startIndex, endIndex);
      const totalPage = Math.ceil(data.length / pageSize);
      return res
        .status(200)
        .send({ code: "002", data: paginatedProducts, totalPage });
    } catch (e) {
      console.log(e);
      return res.status(500).send({ code: "003" });
    }
  };

  disableCategory = async (req, res) => {
    let id = req.query.id;
    let checkIdCategory = await category.findOne({ where: { id } });
    let checkIdParent = await category.findAll({ where: { id_parent: id } });
    if (
      checkIdCategory &&
      checkIdCategory.dataValues &&
      checkIdCategory.dataValues.id
    ) {
      try {
        console.log(checkIdParent.length);
        if (checkIdParent && checkIdParent.length > 0) {
          for (let i = 0; i < checkIdParent.length; i++) {
            await checkIdParent[i].update({ status: 0 });
            // console.log(checkIdParent[i])
            // console.log(checkIdCategory);
          }
        }
        await checkIdCategory.update({ status: 0 });
        // await checkIdParent.update({ status: 0 })
        return res.status(200).send({ code: "013" });
      } catch (e) {
        console.log(e);
        return res.status(500).send({ code: "202" });
      }
    } else {
      return res.status(404).send({ code: "014" });
    }
  };
}

export default new category_controller();
