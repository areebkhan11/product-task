const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController.js');
const { verifyToken } = require('../middleware/verifyToken.js');


router.get('/',verifyToken, productController.getProducts);
router.get('/:id',verifyToken, productController.getSingleProduct);
router.put('/:id',verifyToken, productController.updateProduct);




module.exports = router;