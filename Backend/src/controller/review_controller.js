import Model from "../config/sequelize";
const review = Model.review;

class review_controller {
    hello = (req, res) => {
        return res.status(200).send("hello");
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