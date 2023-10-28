import { fn, col } from 'sequelize';
import Model from '../config/sequelize';
const productBatchItem = Model.product_batch_item
async function checkInventory(list) {
    let flag = true;
    const listProduct = []
    for (let i of list) {
        let batchItem = await productBatchItem.findOne({
            where: { id_product_detail: i.id_product_detail },
            attributes: [[fn('SUM', col('quantity')), 'quantity']],
            group: ['id_product_detail'],
        })
        let orderItem = await Model.order_detail.findOne({
            where: { id_product_detail: i.id_product_detail },
            attributes: [[fn('SUM', col('quantity')), 'quantity']],
            group: ['id_product_detail'],
        })
        let limit = batchItem?.dataValues?.quantity || 0 - orderItem?.dataValues?.quantity || 0
        if (limit < i.quantity || limit==0) {
            flag = false
            listProduct.push({ id: i.id_product_detail, limit })
        }
    }
    return { flag, listProduct }
}
export { checkInventory }