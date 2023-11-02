import Model from "../config/sequelize"

const product_batch = Model.product_batch;
const product_batch_item = Model.product_batch_item;
import auth from "../middleware/authenJWT"
const staff = Model.staff
class product_batch_controller {
    hello = (req, res) => {
        /**
         * Lô sẽ có rất nhiều sản phẩm
         * Lô sẽ có cùng 1 sản phẩm mà màu size khác nhau
         * Lô có nhà cung cấp
         * Lô là 1 mảng
         */

        return res.send("Hello from product_batch");
    }

    getAllBatchProduct = async (req, res) => {
        try {
            let { id_product_batch } = req.query;
            const page = parseInt(req.query.page); //Trang bao nhiêu
            const pageSize = parseInt(req.query.pageSize); // bao nhiêu sản phẩm trong 1 trang

            let option = [{
                model: product_batch_item,
                as: "product_batch_items",
                include: [{
                    model: Model.product_detail,
                    as: "id_product_detail_product_detail",
                    include: [{
                        model: Model.product,
                        as: "id_product_product",
                        include: [{
                            model: Model.image,
                            as: "images",
                        }]
                    }]
                }],

            }, {
                model: Model.supplier,
                as: "id_supplier_supplier"
            }
            ]
            if (id_product_batch) {
                // console.log("id:", id_product);
                let data = await product_batch.findOne({ where: { id: id_product_batch }, include: option });
                return res.status(200).send({ code: "002", data: data });
            }
            else {

                let startIndex = (page - 1) * pageSize;
                let endIndex = startIndex + pageSize;
                let data = await product_batch.findAll({
                    include: option
                })
                const paginatedProducts = data.slice(startIndex, endIndex);
                const totalPage = Math.ceil(data.length / pageSize);
                console.log("data: ", data);
                return res.status(200).send({ code: "002", data: paginatedProducts, totalPage });
            }
        } catch (e) {
            console.log(e);
            return res.status(500).send({ code: "003" })
        }
    }

    enterBatchProduct = async (req, res) => {
        // let { arrProductBatch } = req.body
        // [{"id":1,"name": "Nike","size":1,"color":"Đen","price":200}]


        // let arrProductBatch = [{ "id": 1, "name": "Nike", "quantity": 100, "size": 1, "color": "Đen", "price": 200 },
        // { "id": 2, "name": "Jodan", "quantity": 22, "size": 3, "color": "Xanh", "price": 300 },
        // { "id": 3, "name": "Cao gót", "quantity": 50, "size": 3, "color": "Tím mộng mơ", "price": 100 }
        // ]
        try {
            let { arrProductBatch, id_supplier, name } = req.body
            let create_by = 1;
            console.log("hello");
            //Người tạo
            let id_account = auth.tokenData(req)?.id;
            console.log("id_acount", id_account);
            if (!id_supplier || !name) {
                return res.status(500).send({ code: "009" });
            }
            else {
                id_supplier = Number(id_supplier)
                name = name.trim();
                // Check xem thằng name có trong db chưa
                let checkName = await product_batch.findOne({ where: { name } });
                console.log(checkName);

                if (checkName?.dataValues) {
                    return res.status(500).send({ code: "011" });
                }
            }
            if (id_account) {

                let dataStaff = await staff.findOne({ where: { id_account } });
                if (dataStaff && dataStaff.dataValues && dataStaff.dataValues.id) {
                    create_by = dataStaff.dataValues.id;
                }
            }
            console.log("arrProductBatch: ", arrProductBatch, id_supplier);
            // Tạo 1 cái lô trước product_batch
            // await product_batch.create({
            //     name:"Phong",
            //      id_supplier,
            //      create_by:1
            //  })
            if (!arrProductBatch || arrProductBatch.length < 1) {
                return res.status(500).send({ code: "009" });
            }
            let check = false;
            let dataBatch = '';

            //Check xem có đầy đủ các thuộc tính
            for (let i in arrProductBatch) {
                if (!arrProductBatch[i].quantity || !arrProductBatch[i].import_price || !arrProductBatch[i].id_product_detail) {
                    return res.status(500).send({ code: "009" });
                }
                if (Number(arrProductBatch[i].import_price) < 1) {
                    return res.status(500).send({ code: "209" })
                }
                if (Number(arrProductBatch[i].quantity) < 1) {
                    return res.status(500).send({ code: "210" })
                }
            }
            //Check xem thằng id_product_detail có trùng
            for (let i = 0; i < arrProductBatch.length; i++) {
                for (let j = i + 1; j < arrProductBatch.length; j++) {
                    if (arrProductBatch[i].id_product_detail == arrProductBatch[j].id_product_detail) {
                        return res.status(500).send({ code: "207" });
                    }
                }
            }

            for (let i in arrProductBatch) {
                // console.log(arrProductBatch[i]);
                //Tạo từng sản phẩm trong lô
                console.log("quantity:", arrProductBatch[i].quantity);
                console.log("import_price:", arrProductBatch[i].import_price);
                console.log("id_product_detail:", arrProductBatch[i].id_product_detail);
                // if (!arrProductBatch[i].quantity || !arrProductBatch[i].import_price || !arrProductBatch[i].id_product_detail) {
                //     return res.status(500).send({ code: "009" });
                // }

                if (!check) {
                    check = true;
                    try {
                        dataBatch = await product_batch.create({ name, create_by, id_supplier })
                    } catch (e) {
                        console.log(e);
                        return res.status(500).send({ code: "005" });
                    }
                    console.log(dataBatch);
                }
                if (dataBatch && dataBatch.dataValues && dataBatch.dataValues.id) {
                    try {
                        await product_batch_item.create({
                            quantity: arrProductBatch[i].quantity,
                            id_product_detail: arrProductBatch[i].id_product_detail,
                            import_price: arrProductBatch[i].import_price,
                            id_product_batch: dataBatch.dataValues.id
                        })

                    } catch (e) {
                        console.log(e);
                        return res.status(500).send({ code: "005" });
                    }
                }

            }
            console.log("Thành công rồi bro");
            return res.status(200).send({ code: "004" });

        } catch (e) {
            console.log(e);
            return res.status(500).send({ code: "005" });
        }
    }
}

export default new product_batch_controller();