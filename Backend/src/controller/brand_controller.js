import Model from '../config/sequelize'
const brand = Model.branch;

class brand_controller {
    createBrand = async (req, res) => {
        let { name, info, link_page } = req.body;
        if (!name || !info || !link_page) {
            return res.status(500).send({ code: "009" });
        }
        try {
            await brand.create({ name, info, link_page, status: 1 });
            console.log("Thành công rồi bro");
            return res.status(200).send({ code: "004" });
        } catch (e) {
            console.log(e);
            return res.status(500).send({ code: "006" });
        }
    }

    updateBrand = async (req, res) => {
        let updateData = req.body;
        let { id } = req.query;
        if (id) {
            try {
                let dataBrand = await brand.findOne({ where: { id } })
                if (
                    dataBrand &&
                    dataBrand.dataValues &&
                    dataBrand.dataValues.id
                ) {
                    if (updateData.name) {
                        dataBrand.name = updateData.name;
                    }
                    if (updateData.info) {
                        dataBrand.info = updateData.info;
                    }
                    if (updateData.link_page) {
                        dataBrand.link_page = updateData.link_page
                    }
                    dataBrand.save();
                    return res.status(200).send({ code: "013" });
                } else {
                    return res.status(404).send({ code: "014" });
                }
            } catch (e) {
                console.log(e);
                return res.status(500).send({ code: "006" });
            }
        }
    }

    disableBrand = async (req, res) => {
        let id = req.query.id;
        let checkIdBrand = await brand.findOne({ where: { id } });
        if (
            checkIdBrand &&
            checkIdBrand.dataValues &&
            checkIdBrand.dataValues.id
        ) {
            try {
                await checkIdBrand.update({ status: 0 });
                return res.status(200).send({ code: "013" });
            } catch (e) {
                console.log(e);
                return res.status(500).send({ code: "006" });
            }
        } else {
            return res.status(404).send({ code: "014" });
        }
    };

    getAllBrand = async (req, res) => {
        try {

            const page = parseInt(req.query.page) || 1; //Trang bao nhiêu
            const pageSize = parseInt(req.query.pageSize) || 5; // bao nhiêu nhà cung cấp trong 1 trang
            let startIndex = (page - 1) * pageSize;
            let endIndex = startIndex + pageSize;
            let data = await brand.findAll();
            const paginatedProducts = data.slice(startIndex, endIndex);
            const totalPage = Math.ceil(data.length / pageSize);
            return res.status(200).send({ code: "002", data: paginatedProducts, totalPage });
        } catch (e) {
            console.log(e);
            return res.status(500).send({ code: "006" });
        }
    };

}

export default new brand_controller();
