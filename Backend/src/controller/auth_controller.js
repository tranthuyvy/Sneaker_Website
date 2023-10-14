import Model from "../config/sequelize";
import bcrypt from "bcrypt";
import { createJWT } from "config/jwt";
import jwt_decode from "jwt-decode";

const account = Model.account;
const saltRounds = 10;
class auth_controller {
    async login(req, res) {
        const { username, password } = req.body;
        console.log(username, password);
        try {
            const acc = await account.findOne({ where: { name: username } });
            if (acc) {
                const match = await bcrypt.compare(password, acc.dataValues.password);
                if (match) {
                    res.status(200).send({
                        accessToken: createJWT(acc.dataValues),
                        refreshToken: createJWT(acc.dataValues, "REFRESH"),
                        code: "000",
                    });
                } else res.status(200).send({ code: "001" });
            } else res.status(200).send({ code: "001" });
        } catch (error) {
            res.status(500).send({ code: "006" });
        }
    }
    async login_google(req, res) {
        try {
            const data = await jwt_decode(req.body.code);
            const user = await Model.user.findOne({ where: { email: data.email } });
            if (user) {
                const acc = {
                    email: user.email,
                    name: user.name,
                    id_role: 3,
                };
                res.status(200).send({
                    accessToken: createJWT(acc),
                    refreshToken: createJWT(acc, "REFRESH"),
                    code: "000",
                });
            } else {
                Model.user
                    .create({
                        email: data.email,
                        name: data.name,
                        phone: null,
                        platform: "Google",
                        id_social: data.sub,
                        point: 0,
                    })
                    .then();
                res.status(200).send({
                    accessToken: createJWT({
                        email: data.email,
                        name: data.name,
                        id_role: 3,
                    }),
                    refreshToken: createJWT(
                        { email: data.email, name: data.name, id_role: 3 },
                        "REFRESH"
                    ),
                    code: "000",
                });
            }
        } catch (error) {
            console.log(error);
            res.send({ code: "006" });
        }
    }
}
export default new auth_controller();
