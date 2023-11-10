import { Router } from "express";
import elastic_controller from "controller/elastic_controller";

const elastic_rotuer = Router();
elastic_rotuer.get('/init', elastic_controller.initData)
elastic_rotuer.get('/delete', elastic_controller.deleteData)
elastic_rotuer.get('/search', elastic_controller.searchData)
export default elastic_rotuer