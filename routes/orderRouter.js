const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController.js');
const { verifyToken } = require('../middleware/verifyToken.js');

router.get('/',verifyToken, orderController.getOrders);
router.get('/:id',verifyToken, orderController.getSingleOrder);
router.post('/create',verifyToken, orderController.createSingleOrder);

module.exports = router;