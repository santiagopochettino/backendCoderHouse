const { Router } = require("express");
const router = Router();
const controller = require("../controllers/products.controller")



const completedFields = (req, res, next) => {
    const { title, price, thumbnail } = req.body;
    title && price && thumbnail
      ? next()
      : res.status(300).send({ message: "Debe completar todos los campos" });
  };



router.get("/", controller.getAll)
router.get("/:id", controller.getById)
router.post("/",completedFields, controller.post)
router.put("/:id",completedFields, controller.put)
router.delete("/:id", controller.delete)

module.exports = router