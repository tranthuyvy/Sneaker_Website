import Model from "../config/sequelize";
import bcrypt from "bcrypt";
import { createJWT } from "config/jwt";
import jwt_decode from "jwt-decode";
import mail from '../service/mail'
const staff = Model.staff;
const forgot_password = Model.forgot_password;
const salt = bcrypt.genSaltSync(10);
const account = Model.account;
const saltRounds = 10;
class auth_controller {
    async login(req, res) {
        let { username, password } = req.body;
        console.log(username, password);

        if (!username || !password) {
            return res.status(500).send({ code: "009" });
        }

        username = username.trim();
        password = password.trim();
        if (password.length < 6) {
            return res.status(500).send({ code: "129" });
        }

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
            const data = req.body
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
            res.send({ code: "001" });
        }
    }
    async refreshToken(req, res) { }

    //Quên mật khẩu
    forgotPassword = async (req, res) => {
        try {
            //1. Cần email để gửi đi
            let { email } = req.body
            if (!email) {
                return res.status(500).send({ code: "009" });
            }
            email = email.trim();
            let checkEmailExist = await staff.findOne({ where: { email } });
            if (checkEmailExist && checkEmailExist.dataValues && checkEmailExist.dataValues.id) {
                let id_staff = checkEmailExist.dataValues.id;
                //check 
                let checkCodeExist = await forgot_password.findOne({
                    where: { id_staff },
                    order: [
                        ['expiration_date', 'desc']
                    ], limit: 1
                });
                console.log("checkCodeExist: ", checkCodeExist);
                if (checkCodeExist && checkCodeExist.dataValues && checkCodeExist.dataValues.id) {
                    let dataForgot = checkCodeExist.dataValues;
                    // const date1 = new Date(dataForgot.create_at);
                    let currentDate = new Date();
                    currentDate.setHours(currentDate.getHours() + 7);
                    const date2 = new Date(dataForgot.expiration_date);
                    const subtraction = date2 - currentDate;
                    // console.log("REesult: ", subtraction);
                    const differenceInMinutes = subtraction / (1000 * 60);
                    // console.log("Phút : ", differenceInMinutes);
                    if (differenceInMinutes > 0) {
                        return res.status(200).send({ code: "220" })
                    }
                    // console.log("create_at: ", dataForgot.create_at);
                    // console.log("expiration_date: ", dataForgot.expiration_date);
                }

                //Lấy id của staff checkEmailExist.dataValues.id
                //Tạo mã code 6 kí tự
                let code = mail.createCode();
                mail.sendVerification(email, code);

                let currentDate = new Date();
                // console.log("currentDate: ", currentDate);
                currentDate.setHours(currentDate.getHours() + 7);

                let expiDate = new Date(currentDate.getTime());
                expiDate.setMinutes(expiDate.getMinutes() + 30);
                // console.log("ExpirationDate: ", expiDate);
                await forgot_password.create({ code, id_staff, create_at: currentDate, expiration_date: expiDate })
                return res.status(200).send({ code: "217" })
            }
            else {
                return res.status(500).send({ code: "219" });
            }
        } catch (e) {
            console.log(e);
            return res.status(500).send({ code: "218" });
        }

    }

    //Đổi mật khẩu sử dụng mã code
    changePasswordForgot = async (req, res) => {
        try {
            let { email, code, newPassword } = req.body;

            if (!email || !code || !newPassword) {
                return res.status(500).send({ code: "009" });
            }
            email = email.trim();
            code = code.trim();
            newPassword.trim();

            if (newPassword.length < 6) {
                return res.status(500).send({ code: "129" });
            }

            let checkEmailExist = await staff.findOne({ where: { email } });
            if (checkEmailExist && checkEmailExist.dataValues && checkEmailExist.dataValues.id) {
                let id_staff = checkEmailExist.dataValues.id;
                //Check mã code có không 
                let checkCode = await forgot_password.findOne({ where: { code, id_staff } });
                if (checkCode && checkCode.dataValues && checkCode.dataValues.id) {
                    let dataForgot = checkCode.dataValues;
                    // const date1 = new Date(dataForgot.create_at);
                    let currentDate = new Date();
                    currentDate.setHours(currentDate.getHours() + 7);

                    const date2 = new Date(dataForgot.expiration_date);
                    // console.log("Check currentDate: ", currentDate);
                    // console.log("Check date2: ", date2);
                    const subtraction = date2 - currentDate;
                    // console.log("REesult: ", subtraction);
                    const differenceInMinutes = subtraction / (1000 * 60);
                    // console.log("Phút : ", differenceInMinutes);
                    if (differenceInMinutes > 0) {
                        //Cho phép thay đổi mật khẩu
                        let id_account = checkEmailExist.dataValues.id_account;
                        let dataAccount = await account.findOne({ where: { id: id_account } });
                        let hash = hashPassword(newPassword);
                        dataAccount.password = hash;
                        dataAccount.save();

                        await forgot_password.destroy({ where: { id_staff } });
                        return res.status(200).send({ code: "213" })
                    }
                    else {
                        return res.status(500).send({ code: "221" })
                    }
                } else {
                    return res.status(500).send({ code: "222" })
                }
                //Check thêm thời hạn

                // let id_account = checkEmailExist.dataValues.id_account;
                // let 
            }
            else {
                return res.status(500).send({ code: "219" })
            }
        } catch (e) {
            console.log(e);
            return res.status(500).send({ code: "216" })
        }
    }

}


//Băm mật khẩu
let hashPassword = (password) => {
    try {
        return bcrypt.hashSync(password, salt);
    } catch (error) {
        console.log(error);
        return false;
    }
};
export default new auth_controller();
