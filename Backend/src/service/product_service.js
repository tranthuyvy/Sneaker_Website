import Model from '../config/sequelize'
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
                        include:{
                            model: Model.discount,
                            as:'id_discount_discount'
                        }
                    }
                ]
            })
        })
    )].map(i => i.dataValues)
    return products
}
export { getPrice }