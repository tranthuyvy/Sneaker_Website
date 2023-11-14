import Model from '../config/sequelize';
import { fn, col, Op, literal } from 'sequelize';
class statistic_controller {
    async order(req, res) {
        let type = req.query.type || 'All';
        try {
            if (type.localeCompare('month') == 0) {
                const START = new Date(req.query.start)
                const END = new Date(req.query.end);
                const orders = await Model.order.findAll({
                    where: {
                        create_at: {
                            [Op.gt]: START,
                            [Op.lt]: END
                        }
                    },
                    attributes: [[fn('SUM', col('total_price')), 'total'], [fn('month', col('create_at')), 'month'], [fn('year', col('create_at')), 'year']],
                    group: [fn('month', col('create_at')), fn('YEAR', col('create_at'))],
                    order: ['year', 'month']
                });
                return res.status(200).send({
                    code: '002',
                    data: orders
                })
            }
            if (type.localeCompare('year') == 0) {
                const START = new req.query.start ? Date(0, 0, req.query.start) : Date();
                const END = new Date()
                const orders = await Model.order.findAll({
                    where: {
                        create_at: {
                            [Op.gt]: START,
                            [Op.lt]: END
                        }
                    },
                    attributes: [[fn('SUM', col('total_price')), 'total'], [fn('year', col('create_at')), 'year']],
                    group: [fn('YEAR', col('create_at'))],
                    order: ['year']
                });
                return res.status(200).send({
                    code: '002',
                    data: orders
                })
            }
        } catch (error) {
            res.status(200).send({
                code: '001',
            })
            console.log(error)
        }


    }
    async product_batch(req, res) {
        let id = req.id_product || '0';
        try {
            const product = await Model.product_detail.findAll({
                include: [{
                    model: Model.product_batch_item,
                    as: "product_batch_items",
                },
                {
                    model: Model.order_detail,
                    as: "order_details",
                }, {
                    model: Model.product,
                    as: "id_product_product",
                }
                ],
            })

            const data = product.map(item => {
                let batch = 0
                item.dataValues.product_batch_items.forEach(element => {
                    batch += element.dataValues.quantity
                });
                let order = 0
                item.dataValues.order_details?.forEach(element => {
                    order += element.dataValues.quantity
                });

                return { ...item.dataValues, batch, order }
            })
            return res.status(200).send({
                code: '002',
                data: data
            })
        } catch (error) {
            res.status(200).send({
                code: '001',
            })
            console.log(error)
        }
    }
    async product(req, res) {

    }
}
export default new statistic_controller()