import Model from '../config/sequelize'
const refund = Model.refund;
const refund_image = Model.refund_image;
import saveImg from 'service/saveImg';
class Refund_Cotroller {
    hello = (req, res) => {
        return res.status(200).send({ code: "hello from refund" });
    }

    createRefund = async (req, res) => {
        try {
            let { id_order, content } = req.body;
            if (!id_order || !content) {
                return res.status(500).send({ code: "009" })
            }
            let add = await refund.create({ id_order, content });
            console.log("Heelo create refund: ", add);
            if (add && add.dataValues && add.dataValues.id) {

                const listImageName = saveImg(req, res);
                if (listImageName.length > 0) {
                    const image = req.files.length == 0 ? [] : listImageName.map(item => {
                        return { id_refund: add.dataValues.id, image: `https://firebasestorage.googleapis.com/v0/b/thuctap-c9a4b.appspot.com/o/${item}?alt=media` }
                    });
                    const img = image.length == 0 ? null : await refund_image.bulkCreate(image);
                }
            }

            return res.status(200).send({ code: "004" })
        } catch (e) {
            console.log(e);
            return res.status(500).send({ code: "228" })
        }
    }

    // getRefund = async(req,res)=>{
    //     try {
    //         let id_order=req.query.id;
    //         let data= await 
    //     } catch (e) {
    //         console.log(e);
    //         return res.status(500).send({ code:""})
    //     }
    // }
};

export default new Refund_Cotroller();