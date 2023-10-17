import Model from '../config/sequelize'
const supplier = Model.supplier;

class supplier_controller {
    hello = (req, res) => {
        return res.send("Hello")
    }

    createSupplier = async (req, res) => {
        let { name, address, phone } = req.body;

        if (!name || !address || !phone) {
            return res.status(500).send({ code: "009" });
        }
        name = name.trim();
        //Lấy id của staff
        let dataSupplier = await supplier.findOne({ where: { name } });
        if (dataSupplier && dataSupplier.dataValues && dataSupplier.dataValues.id) {
            return res.status(500).send({ code: "011" });
        }

        try {
            await supplier.create({ name, address, phone, status: 1 });
            console.log("Thành công rồi bro");
            return res.status(200).send({ code: "004" });
        } catch (e) {
            console.log(e);
            return res.status(500).send({ code: "006" });
        }

    }

    updateSupplier = async (req, res) => {
        let { id } = req.query;
        let updataDta = req.body;
        // if (!name || !address || !phone || !id) {
        //     return res.status(500).send({ code: "009" });
        // }
        if (id) {
            try {
                let dataSupplier = await supplier.findOne({ where: { id } });
                if (dataSupplier && dataSupplier.dataValues && dataSupplier.dataValues.id) {
                    if (updataDta.name) {
                        dataSupplier.name = updataDta.name;
                    }
                    if (updataDta.address) {
                        dataSupplier.address = updataDta.address;
                    }
                    if (updataDta.phone) {
                        dataSupplier.phone = updataDta.phone;
                    }
                    // await dataSupplier.update({
                    //     name, address, phone
                    // })
                    await dataSupplier.save();
                    return res.status(200).send({ code: "013" });
                }
                else {
                    return res.status(404).send({ code: "014" });
                }
            } catch (e) {
                console.log(e);
                return res.status(500).send({ code: "006" });
            }
        }
    }

    disableSupplier = async (req, res) => {
        let id = req.query.id;
        let checkIdSupplier = await supplier.findOne({ where: { id } });
        if (checkIdSupplier && checkIdSupplier.dataValues && checkIdSupplier.dataValues.id) {
            try {
                await checkIdSupplier.update({ status: 2 });
                return res.status(200).send({ code: "013" });
            } catch (e) {
                console.log(e);
                return res.status(500).send({ code: "006" });
            }
        }
        else {
            return res.status(404).send({ code: "014" });
        }
    }

    getAllSupllier = async (req, res) => {
        try {
            let data = await supplier.findAll();
            return res.status(200).send({ code: "002", data })
        } catch (e) {
            console.log(e);
            return res.status(500).send({ code: "006" });
        }
    }
}

export default new supplier_controller();
