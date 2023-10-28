import Model from "../config/sequelize";
import auth from "../middleware/authenJWT";

const discount = Model.discount;
const staff = Model.staff;
const discount_product = Model.discount_product;
class discount_controller {
  hello = (req, res) => {
    return res.status(200).send("Hello from discount");
  };

  createDiscount = async (req, res) => {
    let { value, type, expiration_date, start_date } = req.body;
    let create_by = "";

    let id_account = auth.tokenData(req)?.id; //cái này chỉ là id_account
    if (!value || !type || !expiration_date || !id_account || !start_date) {
      return res.status(500).send({ code: "009" });
    }

    //Lấy id của staff
    let dataStaff = await staff.findOne({ where: { id_account } });
    if (dataStaff && dataStaff.dataValues && dataStaff.dataValues.id) {
      create_by = dataStaff.dataValues.id;
    }
    //Điều chỉnh múi giờ cho đúng
    const dateObject = new Date(expiration_date);
    const utcDateExpiration = new Date(
      Date.UTC(
        dateObject.getFullYear(),
        dateObject.getMonth(),
        dateObject.getDate()
      )
    );
    // console.log("Múi giờ: ", utcDate);

    //Điều chỉnh múi giờ cho đúng
    const dateObjectNew = new Date(start_date);
    const utcDateStart = new Date(
      Date.UTC(
        dateObjectNew.getFullYear(),
        dateObjectNew.getMonth(),
        dateObjectNew.getDate()
      )
    );
    // console.log("Múi giờ: ", utcDateNew);
    console.log("Start: ", utcDateStart.getFullYear(), "End:", utcDateExpiration.getFullYear());
    if (Number(utcDateStart.getFullYear()) > Number(utcDateExpiration.getFullYear())) {
      return res.status(200).send({ code: "203" });
    }
    else {

      if (utcDateStart.getMonth() > utcDateExpiration.getMonth()) {
        return res.status(200).send({ code: "203" });
      }
      else {

        if (utcDateStart.getDay() >= utcDateExpiration.getDay()) {
          return res.status(200).send({ code: "203" });
        }
        else {
          console.log("Hợp lệ");
        }
      }
    }
    // console.log(">>> Check id của staff: ", dataStaff.dataValues);
    type = Number(type);
    value = Number(value);
    console.log(value, type, id_account);

    //Nếu type=1 thì là khuyến mãi theo tiền
    //Nếu type=2 thì khuyến mãi theo phần trăm
    if (type === 2) {
      // value = value / 100;/
      console.log("value sau khi km: ", value);
    }
    try {
      let id_discount = await discount.create({
        value,
        type,
        expiration_date: utcDate,
        start_date: utcDateNew,
        create_by,
        status: 1,
      });
      console.log("Thành công rồi bro");
      return res.status(200).send({ code: "004" });
    } catch (e) {
      console.log(e);
      return res.status(500).send({ code: "005" });
    }

    return res.status(200).send("create");
  };

  getAllDiscount = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1; //Trang bao nhiêu
      const pageSize = parseInt(req.query.pageSize) || 5; // bao nhiêu discount trong 1 trang
      let startIndex = (page - 1) * pageSize;
      let endIndex = startIndex + pageSize;
      let data = await discount.findAll();
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


  disableDiscount = async (req, res) => {
    let id = req.query.id;
    let checkIdDiscount = await discount.findOne({ where: { id } });
    if (
      checkIdDiscount &&
      checkIdDiscount.dataValues &&
      checkIdDiscount.dataValues.id
    ) {
      try {
        await checkIdDiscount.update({ status: 0 });
        return res.status(200).send({ code: "013" });
      } catch (e) {
        console.log(e);
        return res.status(500).send({ code: "202" });
      }
    } else {
      return res.status(404).send({ code: "014" });
    }
  };

  applyDiscount = async (req, res) => {
    let { listProduct } = req.body;
    let id_discount = req.query.id;
    try {
      if (listProduct.length > 0) {

        for (let i = 0; i < listProduct.length; i++) {
          let checkExist = await discount_product.findOne({ where: { id_discount, id_product: listProduct[i].id } })
          console.log(checkExist);
          if (checkExist && checkExist.dataValues && checkExist.dataValues.id) {
            console.log("Sản phẩm đã có trong db");
          }
          else {
            await discount_product.create({ id_discount, id_product: listProduct[i].id, status: 1 })
          }
          // 
        }
        return res.status(200).send({ code: "004" });
      }
    } catch (error) {
      console.log(error);
      return res.status(404).send({ code: "005" });
    }

  }
  deleteProductByIdDiscount = async (req, res) => {

    try {
      let id_discount = req.query.id;
      if (id_discount) {
        await discount_product.destroy({
          where: {
            id: id_discount
          },
        })
        return res.status(200).send({ code: "204" });
      }
    } catch (error) {
      console.log(error);
      return res.status(404).send({ code: "205" });
    }
  }
  getApplyDiscount = async (req, res) => {
    try {
      let id_discount = req.query.id;
      let option = [
        {
          model: Model.product,
          as: "id_product_product",
          include: [{
            model: Model.branch,
            as: 'id_branch_branch'
          },
          {
            model: Model.image,
            as: "images"
          },
          {
            model: Model.category,
            as: "id_category_category"
          }]

        }
      ]
      if (id_discount) {
        let data = await discount_product.findAll({ where: { id_discount, status: 1 }, include: option });
        return res
          .status(200)
          .send({ code: "002", data });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send({ code: "003" });
    }

  }
}

export default new discount_controller();
