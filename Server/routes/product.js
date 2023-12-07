const express = require('express');
const { getAllProducts , creatProducts , updateProducts, deleteProducts, getProductsDetails} = require('../controllers/product');

const router = express.Router();


router.route("/products").get(getAllProducts)
router.route("/products/new").post(creatProducts)
router.route("/products/:id").put(updateProducts);
router.route("/products/:id").delete(deleteProducts);
router.route("/products/:id").delete(getProductsDetails);

module.exports = router;