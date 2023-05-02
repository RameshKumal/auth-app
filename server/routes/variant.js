const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middleware/auth');
const { createVariants, getVariants, getVariantsList } = require('../controllers/variant');

/*/auth/variant */
router.post('/create', verifyToken, createVariants)//user can create product in dashboard.
router.get('/get', verifyToken, getVariants)
router.get('/getVariants/:id', getVariantsList)
// router.post('/add', verifyToken, addRemoveVariants)//other products user can add in his store.
// router.delete('/:product_id', verifyToken)
// router.patch('/:store_id/:product_id', verifyToken, addProducts)//particular user can add the user

module.exports = router;