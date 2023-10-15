import Model from "../config/sequelize"

const product_batch = Model.product_batch;
const product_batch_item = Model.product_batch_item;

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

    enterBatchProduct = async (req, res) => {
        // let { arrProductBatch } = req.body
        // [{"id":1,"name": "Nike","size":1,"color":"Đen","price":200}]


        // let arrProductBatch = [{ "id": 1, "name": "Nike", "quantity": 100, "size": 1, "color": "Đen", "price": 200 },
        // { "id": 2, "name": "Jodan", "quantity": 22, "size": 3, "color": "Xanh", "price": 300 },
        // { "id": 3, "name": "Cao gót", "quantity": 50, "size": 3, "color": "Tím mộng mơ", "price": 100 }
        // ]
        let arrProductBatch = [
            {
                "id": 5,
                "name": "giày jodan air",
                "id_branch": 1,
                "id_category": 2,
                "create_by": 1,
                "create_at": "2023-10-12T14:14:43.000Z",
                "product_price": 200,
                "id_discount": null,
                "description": "Giày xanh dương hơi đậm",
                "update_by": null,
                "update_at": "2023-10-12T14:14:43.000Z",
                "status": 1,
                "product_details": [
                    {
                        "id": 2,
                        "color": "red",
                        "size": 37,
                        "id_product": 5
                    },
                    {
                        "id": 1,
                        "color": "red",
                        "size": 37,
                        "id_product": 5
                    }
                ]
            },
            {
                "id": 6,
                "name": "giày jodan air pro",
                "id_branch": 1,
                "id_category": 2,
                "create_by": 1,
                "create_at": "2023-10-12T14:18:34.000Z",
                "product_price": 2000,
                "id_discount": null,
                "description": "Giày xanh lá",
                "update_by": null,
                "update_at": "2023-10-12T14:18:34.000Z",
                "status": 1,
                "product_details": []
            },
            {
                "id": 7,
                "name": "giày jodan air pro",
                "id_branch": 1,
                "id_category": 2,
                "create_by": 1,
                "create_at": "2023-10-12T14:19:35.000Z",
                "product_price": 2000,
                "id_discount": null,
                "description": "Giày xanh lá",
                "update_by": null,
                "update_at": "2023-10-12T14:19:35.000Z",
                "status": 1,
                "product_details": []
            },
            {
                "id": 8,
                "name": "giày jodan air pro",
                "id_branch": 1,
                "id_category": 2,
                "create_by": 1,
                "create_at": "2023-10-12T14:19:40.000Z",
                "product_price": 2000,
                "id_discount": null,
                "description": "Giày xanh lá",
                "update_by": null,
                "update_at": "2023-10-12T14:19:40.000Z",
                "status": 1,
                "product_details": []
            }
        ]
        // Tạo 1 cái lô trước product_batch
        // await product_batch.create({
        //     name:"Phong",
        //      id_supplier:1,
        //      create_by:1
        //  })
        for (let i in arrProductBatch) {
            // console.log(arrProductBatch[i]);
            //Tạo từng sản phẩm trong lô
            console.log("quantity:", arrProductBatch[i].quantity);
            console.log("import_price:", arrProductBatch[i].price);
            // await product_batch_item.create({
            //     quantity:,
            //     id_product_batch_item:,
            //     import_price:,
            //     id_product_batch:
            // })
        }
        return res.status(200).send("Hello from enterbatch");
    }

}

export default new product_batch_controller();