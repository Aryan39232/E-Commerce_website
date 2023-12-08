const express = require('express');
const { getAllProducts , creatProducts , updateProducts, deleteProducts, getProductsDetails, getProductReviews, createProductReview, deleteReviews} = require('../controllers/product');
const { isAuthenticatedUser ,authorizedRoles} = require('../middleware/auth');

const router = express.Router();


router.route("/products").get( getAllProducts)
router.route("/products/new").post( isAuthenticatedUser ,authorizedRoles("admin"),creatProducts)
router.route("/products/:id").put( isAuthenticatedUser ,authorizedRoles("admin"),updateProducts);
router.route("/products/:id").delete(isAuthenticatedUser ,authorizedRoles("admin"),deleteProducts);
router.route("/products/:id").delete(getProductsDetails);
router.route("/review").put(isAuthenticatedUser , createProductReview);
router.route("/reviews").get(getProductReviews).delete(isAuthenticatedUser , deleteReviews)

module.exports = router;