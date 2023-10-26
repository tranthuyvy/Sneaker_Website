import Model from "../config/sequelize";
const admin = Model.account;
const staff = Model.staff;
import bcrypt from "bcrypt";
const salt = bcrypt.genSaltSync(10);
import auth from "../middleware/authenJWT";
const account = Model.account;
const user = Model.user;
const { Op } = require("sequelize");

class admin_controller {
  //Admin tạo tài khoản cho nhân viên
  createNewStaff = async (req, res) => {
    let { nameStaff, userName, password } = req.body;
    let id_account = auth.tokenData(req)?.id;
    let create_by = "";

    //Bắt lỗi không nhập
    //Băm password
    console.log(nameStaff, userName, password);
    if (!nameStaff || !userName || !password) {
      return res.status(500).send({ code: "009" });
    }
    userName = userName.trim();
    password = password.trim();
    if (password.length < 6) {
      return res.status(500).send({ code: "129" });
    }
    //Check định dạng email
    // let emailPattern = /^[A-Za-z0-9._%+-]+@gmail\.com$/;
    // let check = emailPattern.test(email);
    // if (!check) {
    //   return res.status(500).send({ code: "010" });
    // }
    //Lấy id của staff
    let dataStaff = await staff.findOne({ where: { id_account } });
    if (dataStaff && dataStaff.dataValues && dataStaff.dataValues.id) {
      create_by = dataStaff.dataValues.id;
    }
    console.log(create_by);
    const checkUsernameExist = await admin.findOne({
      where: { name: userName },
    });

    //1. Email này cũng là của nhân viên
    //2. Từ cái id_account vừa thêm thì thêm 1 thằng nhân viên có id_account đó và thêm tên cho nó
    // console.log(">>> Check email exist: ", checkEmailExist?.dataValues);
    //Check email tồn tại
    if (checkUsernameExist?.dataValues) {
      return res.status(500).send({ code: "007" });
    } else {
      try {
        let hash = hashPassword(password);
        console.log(hash);
        if (hash) {
          const account = await admin.create({
            name: userName,
            password: hash,
            id_role: 1,
          });
          console.log(">>>> Check account: ", account);
          //Lấy được id_account
          console.log(">>> Check id_account: ", account.dataValues.id);

          try {
            const data = await staff.create({
              name: nameStaff,
              id_account: account.dataValues.id,
              status: 1,
              create_by,
            });
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
        return res.status(500).send({ code: "005" });
      }
    }

    // return res.status(200).send("Hello world");
  };

  hello2 = (req, res) => {
    let hell = auth.tokenData(req).id;
    console.log(hell);
    return res.send("Hello world from admin controller");
    // let { email } = req.body
    // let emailPattern = /^[A-Za-z0-9._%+-]+@gmail\.com$/;
    // let check = emailPattern.test(email);
    // // console.log("");
    // return res.json({ alo: "Hello Phong", check, email });
  };

  getAllUser = async (req, res) => {
    //Lấy ra hết id account role > 1
    //Phân trang
    let { id_role } = req.query;
    const page = parseInt(req.query.page) || 1; //Trang bao nhiêu
    const pageSize = parseInt(req.query.pageSize) || 5; // bao nhiêu sản phẩm trong 1 trang
    console.log(pageSize);
    if (id_role) {
      let data = [];
      let startIndex = (page - 1) * pageSize;
      let endIndex = startIndex + pageSize;
      //1 Nhân viên
      if (id_role == 1) {
        try {
          data = await account.findAll({
            where: { id_role: 1 },
            include: [{ model: staff, as: "staffs" }],
          });
          // console.log(data);
        } catch (error) {
          console.log(error);
          return res.status(500).send({ code: "003" });
        }
      } else if (id_role == 2) {
        //2 Khách hàng
        try {
          data = await user.findAll();
          // console.log(data);
        } catch (e) {
          console.log(e);
          return res.status(500).send({ code: "003" });
        }
      }
      const paginatedProducts = data.slice(startIndex, endIndex);
      console.log(pageSize);
      const totalPage = Math.ceil(data.length / pageSize);
      return res
        .status(200)
        .send({ code: "002", data: paginatedProducts, totalPage });
    }
  };

  changeStatus = async (req, res) => {
    const { id } = req.query;

    try {
      const staffMember = await staff.findOne({ where: { id: id } });
      console.log("Mem:", staffMember);

      if (!staffMember) {
        return res.status(404).send({ code: "014" });
      }

      staffMember.status = 0;
      await staffMember.save();

      return res.status(200).send({ code: "013" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ code: "006" });
    }
  };
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

export default new admin_controller();
