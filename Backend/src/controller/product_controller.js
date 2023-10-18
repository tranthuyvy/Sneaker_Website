import Model from "../config/sequelize";
const product = Model.product;
import {
  generateProductDetailId,
  generateProductId
} from '../service/common'
const branch = Model.branch;

class product_controller {
  createProduct = async (req, res) => {
    let {
      name,
      id_branch,
      id_category,
      create_by,
      product_price,
      description,
    } = req.body;
    console.log(
      name,
      id_branch,
      id_category,
      create_by,
      product_price,
      description
    );

    //Kiểm tra nhập đủ trường chưa
    if (!name || !id_branch || !id_category || !product_price || !description) {
      return res.status(500).send({ code: "009" });
    }
    name = name.trim();
    // Check xem thằng name có trong db chưa
    let checkName = await product.findOne({ where: { name } });
    console.log(checkName);
    if (checkName?.dataValues) {
      return res.status(500).send({ code: "011" });
    } else {
      try {
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

        // console.log("Check data product: ", dataProduct.dataValues);
        console.log("Thêm thành công");
        return res.status(200).send({ code: "012" });
      } catch (e) {
        console.log(e);
        return res.status(500).send({ code: "006" });
      }
    }
  };

  getAllProduct = async (req, res) => {
    const id_product = req.query.id;
    const page = parseInt(req.query.page) || 1; //Trang bao nhiêu
    const pageSize = parseInt(req.query.pageSize) || 5; // bao nhiêu sản phẩm trong 1 trang

    console.log(page, pageSize);
    // Tính vị trí bắt đầu và vị trí kết thúc của sản phẩm trên trang hiện tại
    const option = {
      include: [
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
        }
      ],
    }
    if (id_product) {
      // console.log("id:", id_product);
      let data = await product.findOne({ where: { id: id_product }, ...option });
      return res.status(200).send({ code: "002", data: data });
    } else {
      if (page || pageSize) {
        let startIndex = (page - 1) * pageSize;
        let endIndex = startIndex + pageSize;
        let data = await product.findAll({
          include: [
            {
              model: Model.product_detail,
              as: "product_details",

            },
          ],
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
