import client from "config/redis";
import Model from '../config/sequelize'
async function setProduct() {
    const listProduct = await Model.product.findAll();
    const newList = [...listProduct.map(item => {
        return JSON.stringify(item)
    })]
}
async function getProduct() {
    const listProduct = []
    for await (const product of client.sScanIterator('listProduct')) {
        listProduct.push(product)
    }
    return [...listProduct.map(item=>{
        return JSON.parse(item)
    })]
}
export { getProduct, setProduct }
