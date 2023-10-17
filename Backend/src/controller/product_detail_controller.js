import Model from '../config/sequelize';
import saveImg from 'service/saveImg';
import { generateProductDetailId } from 'service/common';
class product_detail_controller {
    async create(req, res) {
        try {
            const image = req.files.length == 0 ? "" : `https://firebasestorage.googleapis.com/v0/b/thuctap-c9a4b.appspot.com/o/${saveImg(req, res)}?alt=media`;
            const { idProduct, size, color } = req.body;
            const id= generateProductDetailId(idProduct,size,color)
            const product_detail = await Model.product_detail.create({ id,color, size, id_product: idProduct })
            const img = await Model.product_image.create({ id_product_detail: product_detail.dataValues.id, image })
            res.status(200).send({ code: "004" })
        } catch (error) {
            console.log(error)
            res.status(500).send({ code: "005" })
        }
    }
}
export default new product_detail_controller()