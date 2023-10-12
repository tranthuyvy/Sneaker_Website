import Model from "../config/sequelize";
const staff = Model.staff;
class StaffController {
  async getProfileByIdStaff(req, res) {
    try {
      const id_account = req.params.id_account;

      const staff_pro = await staff.findOne({
        where: { id_account },
      });

      if (staff_pro) {
        res.json(staff_pro);
      } else {
        res.status(404).json({ error: "Not Found User Profile" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Lỗi server" });
    }
  }
}

export default StaffController;
