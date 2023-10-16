import Model from '../config/sequelize'
const order = Model.order;
const order_detail = Model.order_detail;
class order_controller {

    hello = (req, res) => {
        return res.send("Hello from order controller");
    }

    getAllOrder = async (req, res) => {
        let { status } = req.query;
        const page = parseInt(req.query.page) || 1; //Trang bao nhiêu
        const pageSize = parseInt(req.query.pageSize) || 5; // bao nhiêu sản phẩm trong 1 trang
        let data = ''
        let startIndex = (page - 1) * pageSize;
        let endIndex = startIndex + pageSize;
        if (status) {
            data = await order.findAll({
                where: { status },
                include: [{
                    model: order_detail,
                    as: 'order_details'
                }]
            });
        }
        else {

            data = await order.findAll({
                include: [{
                    model: order_detail,
                    as: 'order_details'
                }]
            });
        }
        const paginatedProducts = data.slice(startIndex, endIndex);
        const totalPage = Math.ceil(data.length / pageSize);
        return res
            .status(200)
            .send({ code: "002", data: paginatedProducts, totalPage });
    }

}

export default new order_controller();