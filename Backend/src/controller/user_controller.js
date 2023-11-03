import Model from '../config/sequelize';
import auth from "../middleware/authenJWT";
class user_controller {
    async get(req, res) {
        try {
            const email = auth.tokenData(req).email;
            const user = await Model.user.findOne({
                where: { email: email }
            })
            res.status(200).send({ code: '002', data: user })
        } catch (error) {
            res.status(500).send({ code: '001' })
        }
    }
    async update(req, res) {
        try {
            const email = auth.tokenData(req).email;
            const user = await Model.user.update({
                name: req.body.name,
                phone: req.body.phone
            }, {
                where: { email: email }
            })
            res.status(200).send({ code: '013' })
        } catch (error) {
            res.status(500).send({ code: '001' })
        }
    }
}
export default new user_controller()