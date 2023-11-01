import Model from "../config/sequelize";
const review = Model.review;
const order = Model.order;
class review_controller {
    hello = (req, res) => {
        return res.status(200).send("hello");
    }

    createReview = async (req, res) => {
        try {
            let { id_user } = req.query;//lát sửa lại đăng nhập = token
            let { id_product, star, comment } = req.body;
            let checkUserBuy = ''
            let check = false;
            if (id_user) {
                //Check người dùng đã mua hàng chưa 
                checkUserBuy = await order.findAll({
                    where: { id_user },
                    include: [{
                        model: Model.order_detail,
                        as: "order_details",
                        include: [{
                            model: Model.product_detail,
                            as: "id_product_detail_product_detail"
                        }]
                    }]
                })

                if (checkUserBuy.length > 0) {
                    for (let i = 0; i < checkUserBuy.length; i++) {
                        // console.log("checkUserBuy: ", checkUserBuy[i].dataValues);
                        if (checkUserBuy[i].dataValues.order_details.length > 0) {
                            // console.log("order detail: ", checkUserBuy[i].dataValues.order_details);
                            //1 chi tiết chỉ có 1 product
                            if (checkUserBuy[i].dataValues.order_details.length > 0) {
                                for (let j = 0; j < checkUserBuy[i].dataValues.order_details.length; i++) {
                                    console.log(checkUserBuy[i].dataValues.order_details[j].dataValues.id_product_detail_product_detail.dataValues.id_product);
                                    if (checkUserBuy[i].dataValues.order_details[j].dataValues.id_product_detail_product_detail.dataValues.id_product == id_product) {
                                        check = true;
                                    }
                                }

                            }
                        }
                    }
                }
                //Bỏ id_product vào tìm có không
                if (check) {
                    let data = await review.create({ id_user, id_product, star, comment });
                    return res.status(200).send({ code: "004" })
                }
                else {
                    return res.status(200).send({ code: "005" })
                }

            }
            console.log(id_user, id_product, star, comment, check);

        } catch (e) {
            console.log(e);
            return res.status(500).send({ code: "005" })
        }
    }

    getAllReview = async (req, res) => {
        try {
            const { id_product } = req.query;
            const page = parseInt(req.query.page) || 1; //Trang bao nhiêu
            const pageSize = parseInt(req.query.pageSize) || 5; // bao nhiêu nhà cung cấp trong 1 trang
            let startIndex = (page - 1) * pageSize;
            let endIndex = startIndex + pageSize;
            let data = await review.findAll({
                where: { id_product }, include: [
                    {
                        model: Model.user,
                        as: 'id_user_user'
                    }]
            });
            const paginatedProducts = data.slice(startIndex, endIndex);
            const totalPage = Math.ceil(data.length / pageSize);
            return res
                .status(200)
                .send({ code: "002", data: paginatedProducts, totalPage });
        } catch (e) {
            console.log(e);
            return res.status(500).send({ code: "003" });
        }
    }
}

export default new review_controller();