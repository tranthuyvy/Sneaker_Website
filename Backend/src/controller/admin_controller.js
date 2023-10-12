import Model from '../config/sequelize'
const admin = Model.account
const staff = Model.staff
import bcrypt from 'bcrypt'
const salt = bcrypt.genSaltSync(10);

class admin_controller {
    //Admin tạo tài khoản cho nhân viên
    createNewStaff = async (req, res) => {
        let { nameStaff, email, password, create_by } = req.body

        //Bắt lỗi không nhập
        //Băm password
        console.log(nameStaff, email, password);
        if (!nameStaff || !email || !password) {
            return res.status(500).send({ code: "009" });
        }
        //Check định dạng email
        let emailPattern = /^[A-Za-z0-9._%+-]+@gmail\.com$/;
        let check = emailPattern.test(email);
        if (!check) {
            return res.status(500).send({ code: "010" });
        }

        const checkEmailExist = await admin.findOne({ where: { name: email } });
        //1. Email này cũng là của nhân viên
        //2. Từ cái id_account vừa thêm thì thêm 1 thằng nhân viên có id_account đó và thêm tên cho nó
        console.log(">>> Check email exist: ", checkEmailExist?.dataValues);
        //Check email tồn tại
        if (checkEmailExist?.dataValues) {
            return res.status(500).send({ code: "007" });
        }
        else {

            try {
                let hash = hashPassword(password);
                console.log(hash);
                if (hash) {
                    const account = await admin.create({
                        name: email,
                        password: hash,
                        id_role: 1,

                    })
                    console.log(">>>> Check account: ", account);
                    //Lấy được id_account
                    console.log(">>> Check id_account: ", account.dataValues.id);

                    try {
                        const data = await staff.create({
                            name: nameStaff,
                            email: email,
                            id_account: account.dataValues.id,
                            status: 1,
                            create_by
                        })
                        console.log(data.dataValues);
                        console.log("Thành công");
                        return res.status(200).send({ code: "008" });
                    } catch (e) {
                        console.log(e);
                        return res.status(500).send({ code: "006" });
                    }
                }
            } catch (e) {
                console.log(e);
                return res.status(500).send({ code: "006" });
            }
        }


        // return res.status(200).send("Hello world");
    }

    hello2 = (req, res) => {
        let { email } = req.body
        let emailPattern = /^[A-Za-z0-9._%+-]+@gmail\.com$/;
        let check = emailPattern.test(email);
        // console.log("");
        return res.json({ alo: "Hello Phong", check, email });
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
}


export default new admin_controller();