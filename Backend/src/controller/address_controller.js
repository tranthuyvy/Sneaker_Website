import { fn, col, literal } from 'sequelize';
import Model from '../config/sequelize';
import auth from "../middleware/authenJWT";
class address_controller {
    async get(req, res) {
        try {
            const email = auth.tokenData(req).email;
            const account = await Model.user.findOne({
                where: { email: email }
            })
            const data = await Model.address.findAll({
                where: { id_user: account.dataValues.id },

            })
            res.send({
                data: {
                    address: data,
                    user: account
                },
                code: '002'
            })
        } catch (err) {
            console.log(err)
            res.status(200).send({ code: '002' })
        }
    }
    async create(req, res) {
        try {
            const body = req.body;
            const email = auth.tokenData(req).email;
            const account = await Model.user.findOne({
                where: { email: email }
            })
            let id_user = account.dataValues.id
            const data = await Model.address.create({ ...body, id_user })
            res.send({
                data: data,
                code: '018'
            })
        } catch (error) {
            console.log(error)
            res.send({ code: '001' })
        }
    }
    async modify(req, res) {
        try {
            
        } catch (err) {
            console.log(err)
            res.status(200).send({code:'002'})
        }
    }
}
export default new address_controller()