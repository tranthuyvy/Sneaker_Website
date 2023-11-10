import Model from '../config/sequelize';
function getMaxDiscount(product) {
    let listDiscount = product.discount_products || []
    let max = 0;
    // 1 tiền 2 phần trăm
    if (listDiscount.length == 0) return 0
    for (let i of listDiscount) {
        if (i.type == 2) max = Math.max(i.id_discount_discount.value / 100 * product.product_price, max)
        else max = Math.max(max, i.id_discount_discount.value)
    }
    return max
}
async function getPrice(liDetail) {
    const details = [...await Promise.all(
        liDetail.map(item => {
            return Model.product_detail.findByPk(item.id_product_detail)
        }))].map(i => { return i.dataValues.id_product })
    const products = [...await Promise.all(
        details.map(item => {
            return Model.product.findByPk(item, {
                include: [
                    {
                        model: Model.discount_product,
                        as: 'discount_products',
                        include: {
                            model: Model.discount,
                            as: 'id_discount_discount',
                        }
                    }
                ]
            })
        })
    )].map(i => i.dataValues)
    return products.map(item => { return { ...item, price: item.product_price - getMaxDiscount(item) } })
}
export { getPrice }