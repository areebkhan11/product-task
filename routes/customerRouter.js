const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController.js');

router.get('/', customerController.getCustomers);
router.post('/', customerController.createCustomer);
router.post('/login', customerController.loginCustomer);

module.exports = router;