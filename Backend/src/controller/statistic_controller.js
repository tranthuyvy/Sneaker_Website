import Model from '../config/sequelize';
import { fn, col, Op } from 'sequelize';
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
                const START = new Date(0, 0, req.query.year);
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
            const option = {
                include: [{
                    model: Model.product_detail,
                    as: "id_product_detail_product_detail",
                    // include: [{
                    //     model: Model.product,
                    //     as: "id_product_product",
                    // }]
                }],
                group: [col('id_product_detail')]
            }
            // const product_batch = await Model.product_batch_item.findAll(option)
            const product = await Model.product.findAll({
                include: [{
                    model: Model.product_detail,
                    as: "product_details",
                    include: [{
                        model: Model.product_batch_item,
                        as: "product_batch_items",
                        attributes: ['id'],

                    }]
                }],
            
            })
            return res.status(200).send({
                code: '002',
                data: product
            })
        } catch (error) {
            res.status(200).send({
                code: '001',
            })
            console.log(error)
        }

    }
}
export default new statistic_controller()