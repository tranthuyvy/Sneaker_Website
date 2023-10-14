import Model from '../config/sequelize'
import auth from '../middleware/authenJWT'

const discount = Model.discount;
const staff = Model.staff;
class discount_controller {
    hello = (req, res) => {
        return res.status(200).send('Hello from discount');
    }

    createDiscount = async (req, res) => {

        let { value, type, expiration_date } = req.body;
        let create_by = '';

        let id_account = auth.tokenData(req)?.id;//cái này chỉ là id_account
        if (!value || !type || !expiration_date || !id_account) {
            return res.status(500).send({ code: "009" });
        }

        //Lấy id của staff
        let dataStaff = await staff.findOne({ where: { id_account } });
        if (dataStaff && dataStaff.dataValues && dataStaff.dataValues.id) {
            create_by = dataStaff.dataValues.id;
        }
        //Điều chỉnh múi giờ cho đúng
        const dateObject = new Date(expiration_date);
        const utcDate = new Date(Date.UTC(dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDate()));
        console.log("Múi giờ: ", utcDate);
        // console.log(">>> Check id của staff: ", dataStaff.dataValues);
        type = Number(type);
        value = Number(value);
        console.log(value, type, utcDate, id_account);

        //Nếu type=1 thì là khuyến mãi theo tiền
        //Nếu type=2 thì khuyến mãi theo phần trăm
        if (type === 2) {
            value = value / 100;
            console.log("value sau khi km: ", value);
        }
        try {
            await discount.create({ value, type, expiration_date: utcDate, create_by, status: 1 });
            console.log("Thành công rồi bro");
            return res.status(200).send({ code: "004" });
        } catch (e) {
            console.log(e);
            return res.status(500).send({ code: "006" });
        }

        return res.status(200).send('create')
    }

    getAllDiscount = async (req, res) => {
        try {
            let data = await discount.findAll();
            return res.status(200).send({ code: "002", data })
        } catch (e) {
            console.log(e);
            return res.status(500).send({ code: "006" });
        }
    }

    disableDiscount = async (req, res) => {
        let id = req.query.id;
        let checkIdDiscount = await discount.findOne({ where: { id } });
        if (checkIdDiscount && checkIdDiscount.dataValues && checkIdDiscount.dataValues.id) {
            try {
                await checkIdDiscount.update({ status: 2 });
                return res.status(200).send({ code: "013" });
            } catch (e) {
                console.log(e);
                return res.status(500).send({ code: "006" });
            }
        }

    }
}

export default new discount_controller();