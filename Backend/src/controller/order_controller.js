import Model from '../config/sequelize';
import auth from '../middleware/authenJWT';
import sequelize from '../config/sequelize';
import { checkInventory } from 'service/order';

const orderModel = Model.order;
const orderDetail = Model.order_detail;
const productDetail = Model.product_detail;

class order_controller {
    getAllOrder = async (req, res) => {
        let { status } = req.query;
        const page = parseInt(req.query.page) || 1; //Trang bao nhiêu
        const pageSize = parseInt(req.query.pageSize) || 5; // bao nhiêu sản phẩm trong 1 trang
        let data = ''
        let startIndex = (page - 1) * pageSize;
        let endIndex = startIndex + pageSize;
        if (status) {
            data = await order.findAll({
                where: { status },
                include: [{
                    model: order_detail,
                    as: 'order_details',
                    include: {
                        model: product_detail,
                        as: 'id_product_detail_product_detail',
                        include: {
                            model: Model.product,
                            as: 'id_product_product'
                        }
                    }
                }]
            });
        }
        else {

            data = await order.findAll({
                include: [{
                    model: order_detail,
                    as: 'order_details',
                    include: {
                        model: product_detail,
                        as: 'id_product_detail_product_detail',
                        include: {
                            model: Model.product,
                            as: 'id_product_product'
                        }
                    }
                }]
            });
        }
        const paginatedProducts = data.slice(startIndex, endIndex);
        const totalPage = Math.ceil(data.length / pageSize);
        return res
            .status(200)
            .send({ code: "002", data: paginatedProducts, totalPage });
    }
    async create(req, res) {
        try {
            // const id_user = auth.tokenData(req).id;
            const { id_address, listDetail, payment_method } = req.body;
            let totalPrice = 0,
                totalItem = 0,
                total_discounted_price = 0;
            for (let i of listDetail) {
                totalItem += i.quantity;
                totalPrice += i.quantity * i.price;
            }
            let { flag, listProduct } = await checkInventory(listDetail)
            if (flag) {
                let order = await orderModel.create({
                    total_price: totalPrice,
                    total_item: totalItem,
                    total_discounted_price,
                    status_payment: 0,
                    status: 1,
                    create_at: new Date(),
                    id_user: 2,
                    id_address,
                    payment_method
                })
                let detail = await Promise.all(listDetail.map(item => {
                    return orderDetail.create({ ...item, id_order: order.dataValues.id })
                }))
                res.status(200).send({ code: '004' })
            }
            else {
                res.status(200).send({ code: '017', data: listProduct })
            }
        } catch (error) {
            console.log(error)
            res.status(500).send({ code: '005' })
        }
    }
    async checkInventory(req, res) {
        try {
            // const id_user = auth.tokenData(req).id;
            const { listDetail } = req.body;
            let { flag, listProduct } = await checkInventory(listDetail)
            res.status(200).send({ code: '002', flag, listProduct })
        } catch (error) {
            console.log(error)
            res.status(500).send({ code: '005' })
        }
    }
}

export default new order_controller();