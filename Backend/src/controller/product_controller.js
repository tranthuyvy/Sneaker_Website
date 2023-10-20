import Model from "../config/sequelize";
const product = Model.product;
import {
  generateProductDetailId,
  generateProductId
} from '../service/common'
import saveImg from 'service/saveImg';
import auth from '../middleware/authenJWT'
const branch = Model.branch;
const productImage = Model.image;
const staff = Model.staff
class product_controller {
  createProduct = async (req, res) => {
    let {
      name,
      id_branch,
      id_category,
      product_price,
      description,
    } = req.body;
    //Ảnh


    //Kiểm tra nhập đủ trường chưa
    if (!name || !id_branch || !id_category || !product_price || !description) {
      return res.status(500).send({ code: "009" });
    }
    name = name.trim();
    product_price = Number(product_price);
    // Check xem thằng name có trong db chưa
    let checkName = await product.findOne({ where: { name } });
    console.log(checkName);
    if (checkName?.dataValues) {
      return res.status(500).send({ code: "011" });
    } else {
      try {
        let id_account = auth.tokenData(req)?.id || 1;
        let create_by = 1;
        let dataStaff = await staff.findOne({ where: { id_account } });
        if (dataStaff && dataStaff.dataValues && dataStaff.dataValues.id) {
          create_by = dataStaff.dataValues.id;
        }
        let nameBranch = await branch.findOne({ id: id_branch });
        console.log(nameBranch.dataValues.id);
        let id = '';
        if (nameBranch && nameBranch.dataValues && nameBranch.dataValues.id) {
          id = generateProductId(name, nameBranch.dataValues.name);
          // console.log(generateProductId(name, nameBranch));
        }
        let dataProduct = await product.create({
          id,
          name,
          id_branch,
          id_category,
          create_by,
          product_price,
          description,
          status: 1,
        });
        const listImageName = saveImg(req, res);
        if (listImageName.length < 1) {
          return res.status(500).send({ code: "009" });
        }
        console.log("listImageName: ", listImageName);
        const image = req.files.length == 0 ? [] : listImageName.map(item => {
          return { id_product: id, link: `https://firebasestorage.googleapis.com/v0/b/thuctap-c9a4b.appspot.com/o/${item}?alt=media` }
        });
        const img = image.length == 0 ? null : await productImage.bulkCreate(image);
        console.log("Check data product: ", dataProduct.dataValues);
        console.log("Thêm thành công");
        return res.status(200).send({ code: "012" });
      } catch (e) {
        console.log(e);
        return res.status(500).send({ code: "006" });
      }
    }
  };

  updateProduct = async (req, res) => {
    let { id } = req.query;
    let updataData = req.body;
    //Ảnh

    if (id) {
      try {
        let dataProduct = await product.findOne({ where: { id } });
        const listImageName = saveImg(req, res);
        console.log("listImageName: ", listImageName);
        if (listImageName.length > 0) {
          await productImage.destroy({
            where: {
              id_product: id
            },
          })
          const image = req.files.length == 0 ? [] : listImageName.map(item => {
            return { id_product: id, link: `https://firebasestorage.googleapis.com/v0/b/thuctap-c9a4b.appspot.com/o/${item}?alt=media` }
          });
          const img = image.length == 0 ? null : await productImage.bulkCreate(image);
        }
        else {

          console.log("Hello");
          let { listImageDelete } = req.body;
          // console.log(listImageDelete);
          if (!listImageDelete) {
            console.log("listImageDelete:", listImageDelete);
            // return res.status(500).send({ code: "009" });
          }
          else {
            for (let i = 0; i < listImageDelete.length; i++) {
              console.log("Delete: ", listImageDelete[i]);
              await productImage.destroy({
                where: {
                  id: listImageDelete[i]
                },
              })
              //api delete từng cái ảnh
              //Bỏ ảnh thì xóa ảnh
              //Chọn ảnh thì thêm ảnh
            }
          }
        }
        if (dataProduct && dataProduct.dataValues && dataProduct.dataValues.id) {
          if (updataData.name) {
            dataProduct.name = updataData.name;
          }
          if (updataData.id_branch) {
            dataProduct.id_branch = updataData.id_branch;
          }
          if (updataData.id_category) {
            dataProduct.id_category = updataData.id_category;
          }
          if (updataData.product_price) {
            dataProduct.product_price = Number(updataData.product_price);
          }
          if (updataData.description) {
            dataProduct.description = updataData.description;
          }
          // if (updataData.image) {
          //   dataProduct.image = updataData.image;
          // }
          // await dataProduct.update({
          //     name, address, phone
          // })
          await dataProduct.save();
          return res.status(200).send({ code: "013" });
        }
        else {
          return res.status(404).send({ code: "014" });
        }
      } catch (e) {
        console.log(e);
        return res.status(500).send({ code: "006" });
      }
    }
  }

  disableProduct = async (req, res) => {
    let { id } = req.query;
    let checkIdProduct = await product.findOne({ where: { id } });
    if (checkIdProduct && checkIdProduct.dataValues && checkIdProduct.dataValues.id) {
      try {
        await checkIdProduct.update({ status: 2 });
        return res.status(200).send({ code: "013" });
      } catch (e) {
        console.log(e);
        return res.status(500).send({ code: "006" });
      }
    }
    else {
      return res.status(404).send({ code: "014" });
    }
  }

  getAllProduct = async (req, res) => {
    const id_product = req.query.id;
    const page = parseInt(req.query.page) || 1; //Trang bao nhiêu
    const pageSize = parseInt(req.query.pageSize) || 5; // bao nhiêu sản phẩm trong 1 trang

    console.log(page, pageSize);
    // Tính vị trí bắt đầu và vị trí kết thúc của sản phẩm trên trang hiện tại
    const option = [
      {
        model: Model.product_detail,
        as: "product_details",
      },
      {
        model: Model.discount,
        as: 'id_discount_discount'
      },
      {
        model: Model.branch,
        as: 'id_branch_branch'
      },
      {
        model: Model.image,
        as: "images"
      }
    ]

    if (id_product) {
      // console.log("id:", id_product);
      let data = await product.findOne({ where: { id: id_product }, include: option });
      return res.status(200).send({ code: "002", data: data });
    } else {
      if (page || pageSize) {
        let startIndex = (page - 1) * pageSize;
        let endIndex = startIndex + pageSize;
        let data = await product.findAll({
          include: option
        });
        const paginatedProducts = data.slice(startIndex, endIndex);
        const totalPage = Math.ceil(data.length / pageSize);
        return res
          .status(200)
          .send({ code: "002", data: paginatedProducts, totalPage });
      } else {
        let data = await product.findAll();
        return res.status(200).send({ code: "002", data: data });
      }
    }
    //nếu bình thường thì lấy hết còn không thì lấy theo id
    console.log("Check list product: ", data);
  };
}


export default new product_controller();
