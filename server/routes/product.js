const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const {
  getListProducts,
  createProducts,
  addRemoveProducts,
  getProducts,
} = require("../controllers/product");
const {buyOrder} = require("../controllers/order");
/*/auth/product/get */

router.get("/get", getListProducts); //by default the products other then this store will display in home page.
router.post("/create", verifyToken, createProducts); //user can create product in dashboard.
router.post("/add", verifyToken, addRemoveProducts); //other products user can add in his store.
router.get("/store", verifyToken, getProducts);
router.post("/buy/:id", verifyToken, buyOrder);


// router.delete('/:product_id', verifyToken)
// router.patch('/:store_id/:product_id', verifyToken, addProducts)//particular user can add the user

module.exports = router;
