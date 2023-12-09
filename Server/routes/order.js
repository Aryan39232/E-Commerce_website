const express = require("express");
const router = express.Router();
const { isAuthenticatedUser ,authorizedRoles} = require('../middleware/auth');
const { newOrder, getSingleOrder, myOrder, getAllOrder, updateOrder, deleteOrder } = require("../controllers/order");

router.route("/order/new").post(isAuthenticatedUser , newOrder);
router.route("/order/:id").get(isAuthenticatedUser , getSingleOrder);
router.route("/orders/me").get(isAuthenticatedUser , myOrder);
router.route("/admin/orders").get(isAuthenticatedUser , authorizedRoles("admin"),getAllOrder);
router.route("/admin//order/:id").put(isAuthenticatedUser , authorizedRoles("admin"),updateOrder);
router.route("/admin//order/:id").put(isAuthenticatedUser , authorizedRoles("admin"), deleteOrder);
module.exports = router;