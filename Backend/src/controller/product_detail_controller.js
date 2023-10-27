import Model from '../config/sequelize';
import saveImg from 'service/saveImg';
import { Op, col, } from 'sequelize';
import { fn, literal } from 'sequelize';
import { generateProductDetailId } from 'service/common';
class product_detail_controller {
    async create(req, res) {
        try {
            // const image = req.files.length == 0 ? "" : `https://firebasestorage.googleapis.com/v0/b/thuctap-c9a4b.appspot.com/o/${saveImg(req, res)}?alt=media`;
            const { idProduct, size } = req.body;
            const id = generateProductDetailId(idProduct, size)
            const product_detail = await Model.product_detail.create({ id, size, id_product: idProduct })
            // const img = await Model.product_image.create({ id_product_detail: product_detail.dataValues.id, image })
            res.status(200).send({ code: "004" })

        } catch (error) {
            console.log(error)
            res.status(500).send({ code: "005" })
        }
    }
    async get(req, res) {
        try {
            const id = req.query?.id || 1;
            const detail = await Model.product_detail.findByPk(id, {
                include: [
                    {
                        model: Model.product,
                        as: "id_product_product",
                        include: [
                            {
                                model: Model.branch,
                                as: 'id_branch_branch'
                            },
                            {
                                model: Model.image,
                                as: "images"
                            }
                        ]
                    },
                    {
                        model: Model.product_batch_item,
                        as: "product_batch_items",
                        attributes: [[fn('SUM', literal('product_batch_items.quantity')), 'product_batch_item_quantity']],
                        group: ['id_product_detail'],
                    },
                    {
                        model: Model.order_detail,
                        as: "order_details",
                        attributes: [[fn('SUM', literal('order_details.quantity')), 'order_quantity']],
                        group: [`${literal('order_details.id_product_detail')}`]
                    },
                ],
            });
            let batch_quantity = detail?.product_batch_items[0]?.dataValues.product_batch_item_quantity || 0
            let order_quantity = detail?.order_details[0]?.dataValues.order_quantity || 0
            const data = { ...detail.dataValues, quantity: batch_quantity - order_quantity }
            res.status(200).send({
                code: '002',
                data: data
            })
        } catch (error) {
            console.log(error);
            res.status(500).send({
                code: '001',
            })
        }
    }
}
export default new product_detail_controller()