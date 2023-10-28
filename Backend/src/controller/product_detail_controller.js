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
            const listPro = [];
            listPro.push(Model.product_detail.findByPk(id, {
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
                    }
                ]
            }))
            listPro.push(Model.product_batch_item.findOne({
                where: { id_product_detail: id },
                attributes: [[fn('SUM', literal('quantity')), 'quantity']],
                group: [`id_product_detail`]
            }))
            listPro.push(Model.order_detail.findOne({
                where: { id_product_detail: id },
                attributes: [[fn('SUM', literal('quantity')), 'quantity']],
                group: [`id_product_detail`]
            }))
            const [detail, product_batch_item, order_detail] = await Promise.all(listPro);
            let batch_quantity = product_batch_item?.dataValues?.quantity || 0
            let order_quantity = order_detail?.dataValues?.quantity || 0
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