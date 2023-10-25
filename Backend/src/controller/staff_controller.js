import Model from "../config/sequelize";
import auth from "../middleware/authenJWT";
const staff = Model.staff;

class StaffController {
  async getProfileByIdStaff(req, res) {
    const id_account = auth.tokenData(req).id;
    try {
      const staff_pro = await staff.findOne({
        where: { id_account },
      });

      if (staff_pro) {
        res.status(200).json(staff_pro);
      } else {
        res.status(404).json({ error: "Not Found User Profile" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error" });
    }
  }

  async updateProfile(req, res) {
    try {
      const id_account = auth.tokenData(req).id;
      const updatedData = req.body;

      const staff_pro = await staff.findOne({
        where: { id_account },
      });
      if (staff_pro) {
        if (updatedData.name) {
          staff_pro.name = updatedData.name;
        }

        if (updatedData.email) {
          staff_pro.email = updatedData.email;
        }

        if (updatedData.phone) {
          staff_pro.phone = updatedData.phone;
        }

        if (updatedData.id_card) {
          staff_pro.id_card = updatedData.id_card;
        }

        if (updatedData.date_of_birth) {
          staff_pro.date_of_birth = updatedData.date_of_birth;
        }

        if (updatedData.sex) {
          staff_pro.sex = updatedData.sex;
        }

        if (updatedData.bank_account_number) {
          staff_pro.bank_account_number = updatedData.bank_account_number;
        }

        await staff_pro.save();

        res.json({ code: "013" });
      } else {
        res.status(404).json({ code: "014" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ code: "202" });
    }
  }
}

export default StaffController;
