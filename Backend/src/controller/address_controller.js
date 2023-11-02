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
            res.status(500).send({ code: '006' })
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
            res.status(500).send({ code: '006' })
        }
    }
    async delete(req, res) {
        try {
            const id = req.query.id;
            const email = auth.tokenData(req).email;
            const account = await Model.user.findOne({
                where: { email: email }
            })
            const data = await Model.order.findOne({
                where: { id_address: id },
                attributes: [[fn('COUNT', col('id')), 'quantity']]
            })
            if (data.dataValues.quantity == 0) {
                const result = await Model.address.destroy({
                    where: { id: id, id_user: account.dataValues.id }
                })
                if (result > 0)
                    return res.status(200).send({ code: '022' })
                return res.status(200).send({ code: '024' })
            }
            res.status(200).send({ code: '023' })
        } catch (err) {
            console.log(err)
            res.status(500).send({ code: '006' })
        }
    }
    async setDefault(req,res) {
        try {
            const email = auth.tokenData(req).email;
            const id = req.query.id;
            const account = await Model.user.update({ default_address: id }, {
                where: { email: email }
            });
            res.status(200).send({code:'013'})
        } catch (error) {
            console.log(error)
            res.status(200).send({code:'025'})
        }


    }
}
export default new address_controller()