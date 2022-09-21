const { Router } = require("express");
const router = Router();
const productsRoute = require("./products.routes")
const controller = require("../controllers/index.controller")

router.get("/", controller.index)
router.use("/api/products", productsRoute);

module.exports = router