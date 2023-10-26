import Model from '../config/sequelize';
import auth from "../middleware/authenJWT";
const order = Model.order;
const order_detail = Model.order_detail;
class address_controller {
    async get(req, res) {
        try {
            const email = auth.tokenData(req).email;
            const account = await Model.user.findOne({
                where: { email: email }
            })
            const data = await Model.address.findAll({
                where: { id_user: account.dataValues.id }
            })
            res.send({
                data: {
                    address: data,
                    user: account
                },
                code: '002'
            })
        } catch (error) {
            res.send(error)
        }

    }
}
export default new address_controller()