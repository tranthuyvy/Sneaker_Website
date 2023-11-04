import Model from "../config/sequelize";
import auth from "../middleware/authenJWT";
import { sequelize } from "../config/sequelize";
import { checkInventory } from "service/order";
const orderModel = Model.order;
const orderDetail = Model.order_detail;
const productDetail = Model.product_detail;

class order_controller {
  getOrderById = async (req, res) => {
    const { id } = req.params;

    try {
      const foundOrder = await orderModel.findOne({
        where: { id },
        include: [
          {
            model: Model.address,
            as: "id_address_address",
          },
          {
            model: orderDetail,
            as: "order_details",
            include: [
              {
                model: productDetail,
                as: "id_product_detail_product_detail",
                include: {
                  model: Model.product,
                  as: "id_product_product",
                  include: [
                    {
                      model: Model.image,
                      as: "images",
                      attributes: ["link"],
                    },
                    {
                      model: Model.branch,
                      as: "id_branch_branch",
                    },
                    {
                      model: Model.category,
                      as: "id_category_category",
                    },
                    {
                      model: Model.review,
                      as: "reviews",
                    },
                  ],
                },
              },
            ],
          },
        ],
      });
      if (foundOrder) {
        return res.status(200).send({ code: "002", data: foundOrder });
      } else {
        return res.status(404).send({ code: "014" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send({ code: "006" });
    }
  };

  getAllOrder = async (req, res) => {
    let { status } = req.query;
    const page = parseInt(req.query.page) || 1; //Trang bao nhiêu
    const pageSize = parseInt(req.query.pageSize) || 5; // bao nhiêu sản phẩm trong 1 trang
    let data = "";
    let startIndex = (page - 1) * pageSize;
    let endIndex = startIndex + pageSize;
    if (status) {
      data = await orderModel.findAll({
        where: { status },
        include: [
          {
            model: orderDetail,
            as: "order_details",
            include: {
              model: orderDetail,
              as: "id_product_detail_product_detail",
              include: {
                model: Model.product,
                as: "id_product_product",
                include: {
                  model: Model.image,
                  as: "images",
                  attributes: ["link"],
                },
              },
            },
          },
        ],
      });
    } else {
      data = await orderModel.findAll({
        include: [
          {
            model: orderDetail,
            as: "order_details",
            include: {
              model: productDetail,
              as: "id_product_detail_product_detail",
              include: {
                model: Model.product,
                as: "id_product_product",
                include: {
                  model: Model.image,
                  as: "images",
                  attributes: ["link"],
                },
              },
            },
          },
        ],
      });
    }
    const paginatedProducts = data.slice(startIndex, endIndex);
    const totalPage = Math.ceil(data.length / pageSize);
    return res
      .status(200)
      .send({ code: "002", data: paginatedProducts, totalPage });
  };

  async create(req, res) {
    try {
      await sequelize.transaction(async (t) => {
        const email = auth.tokenData(req, res).email;
        const account = await Model.user.findOne({
          where: { email: email },
        });
        let id_user = account.dataValues.id;
        const { id_address, listDetail, payment_method } = req.body;
        let totalPrice = 0,
          totalItem = 0,
          total_discounted_price = 0;
        for (let i of listDetail) {
          totalItem += i.quantity;
          totalPrice += i.quantity * i.price;
        }
        let { flag, listProduct } = await checkInventory(listDetail);
        if (flag) {
          let order = await orderModel.create(
            {
              total_price: totalPrice,
              total_item: totalItem,
              total_discounted_price,
              status_payment: 0,
              status: 1,
              create_at: new Date(),
              id_user,
              id_address,
              payment_method,
            },
            { transaction: t }
          );
          let detail = await Promise.all(
            listDetail.map((item) => {
              return orderDetail.create(
                {
                  ...item,
                  id_order: order.dataValues.id,
                },
                { transaction: t }
              );
            })
          );
          res.status(200).send({ code: "019" });
        } else {
          res.status(200).send({ code: "017", data: listProduct });
        }
      });
    } catch (error) {
      res.status(200).send({ code: "005" });
      console.log(error);
    }
  }

  async checkInventory(req, res) {
    try {
      // const id_user = auth.tokenData(req).id;
      const { listDetail } = req.body;
      let { flag, listProduct } = await checkInventory(listDetail);
      res.status(200).send({ code: "002", flag, listProduct });
    } catch (error) {
      console.log(error);
      res.status(500).send({ code: "005" });
    }
  }

  async confirmOrder(req, res) {
    const { id } = req.params;

    try {
      const order = await orderModel.findOne({
        where: { id },
      });

      if (!order) {
        return res.status(404).send({ code: "014" });
      }

      order.status = 2;
      await order.save();

      return res.status(200).send({ code: "013" });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ code: "006" });
    }
  }

  async shippedOrder(req, res) {
    const { id } = req.params;

    try {
      const order = await orderModel.findOne({
        where: { id },
      });

      if (!order) {
        return res.status(404).send({ code: "014" });
      }

      order.status = 3;
      await order.save();

      return res.status(200).send({ code: "013" });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ code: "006" });
    }
  }

  async deliveryOrder(req, res) {
    const { id } = req.params;

    try {
      const order = await orderModel.findOne({
        where: { id },
      });

      if (!order) {
        return res.status(404).send({ code: "014" });
      }

      order.status = 4;
      await order.save();

      return res.status(200).send({ code: "013" });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ code: "006" });
    }
  }

  async successOrder(req, res) {
    const { id } = req.params;

    try {
      const order = await orderModel.findOne({
        where: { id },
      });

      if (!order) {
        return res.status(404).send({ code: "014" });
      }

      order.status = 5;
      await order.save();

      return res.status(200).send({ code: "013" });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ code: "006" });
    }
  }
}

export default new order_controller();
