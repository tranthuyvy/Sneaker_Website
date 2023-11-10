import { deleteData, initData, search } from "service/elastic"
class elastic_controller {
    async initData(req, res) {
        try {
            await initData()
            res.send("xong")
        } catch (error) {
            res.send("thất bại")
            console.log(error)
        }
    }
    async deleteData(req, res) {
        try {
            await deleteData()
            res.send("xong")
        } catch (error) {
            res.send("thất bại")
            console.log(error)
        }
    }
    async searchData(req, res) {
        try {
            const data = await search(req.query.que)
            res.send(data)
        } catch (error) {
            res.send("thất bại")
            console.log(error)
        }
    }
}
export default new elastic_controller()