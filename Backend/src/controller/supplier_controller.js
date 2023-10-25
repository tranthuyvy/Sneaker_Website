import Model from "../config/sequelize";
const supplier = Model.supplier;
const { Op } = require('sequelize');
class supplier_controller {
  hello = (req, res) => {
    return res.send("Hello");
  };

  getSupplierById = async (req, res) => {
    const { id } = req.params;

    try {
      const foundSupplier = await supplier.findOne({ where: { id } });

      if (foundSupplier) {
        return res.status(200).json(foundSupplier);
      } else {
        return res.status(404).json({ error: "Supplier not found" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  createSupplier = async (req, res) => {
    let { name, address, phone } = req.body;

    if (!name || !address || !phone) {
      return res.status(500).send({ code: "009" });
    }
    name = name.trim();
    //Lấy id của staff
    let dataSupplier = await supplier.findOne({ where: { name } });
    if (dataSupplier && dataSupplier.dataValues && dataSupplier.dataValues.id) {
      return res.status(500).send({ code: "011" });
    }

    try {
      await supplier.create({ name, address, phone, status: 1 });
      console.log("Thành công rồi bro");
      return res.status(200).send({ code: "004" });
    } catch (e) {
      console.log(e);
      return res.status(500).send({ code: "006" });
    }
  };

  updateSupplier = async (req, res) => {
    let { id } = req.query;
    let updateData = req.body;
    // if (!name || !address || !phone || !id) {
    //     return res.status(500).send({ code: "009" });
    // }
    if (id) {
      try {
        let dataSupplier = await supplier.findOne({ where: { id } });
        if (
          dataSupplier &&
          dataSupplier.dataValues &&
          dataSupplier.dataValues.id
        ) {
          if (updateData.name) {
            let name = updateData.name.trim();
            let checkName = await supplier.findOne({
              where: {
                name,
                id: { [Op.ne]: id }
              }
            });
            if (checkName?.dataValues) {
              return res.status(500).send({ code: "011" });
            }
            dataSupplier.name = name;
          }
          if (updateData.address) {
            dataSupplier.address = updateData.address;
          }
          if (updateData.phone) {
            dataSupplier.phone = updateData.phone;
          }
          // await dataSupplier.update({
          //     name, address, phone
          // })
          await dataSupplier.save();
          return res.status(200).send({ code: "013" });
        } else {
          return res.status(404).send({ code: "014" });
        }
      } catch (e) {
        console.log(e);
        return res.status(500).send({ code: "006" });
      }
    }
  };

  disableSupplier = async (req, res) => {
    let id = req.query.id;
    let checkIdSupplier = await supplier.findOne({ where: { id } });
    if (
      checkIdSupplier &&
      checkIdSupplier.dataValues &&
      checkIdSupplier.dataValues.id
    ) {
      try {
        await checkIdSupplier.update({ status: 0 });
        return res.status(200).send({ code: "013" });
      } catch (e) {
        console.log(e);
        return res.status(500).send({ code: "006" });
      }
    } else {
      return res.status(404).send({ code: "014" });
    }
  };

  getAllSupllier = async (req, res) => {
    try {

      const page = parseInt(req.query.page) || 1; //Trang bao nhiêu
      const pageSize = parseInt(req.query.pageSize) || 5; // bao nhiêu nhà cung cấp trong 1 trang
      let startIndex = (page - 1) * pageSize;
      let endIndex = startIndex + pageSize;
      let data = await supplier.findAll();
      const paginatedProducts = data.slice(startIndex, endIndex);
      const totalPage = Math.ceil(data.length / pageSize);
      return res.status(200).send({ code: "002", data: paginatedProducts, totalPage });
    } catch (e) {
      console.log(e);
      return res.status(500).send({ code: "006" });
    }
  };
}

export default new supplier_controller();
