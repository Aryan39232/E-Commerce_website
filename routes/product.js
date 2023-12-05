const express = require('express');
const { getAllProducts , creatProducts } = require('../controllers/product');

const router = express.Router();


router.route("/products").get(getAllProducts)
router.route("/products/new").post(creatProducts)

module.exports = router;