var express = require('express');
var router = express.Router();

var order_controller = require('../controllers/orderController');

router.post('/order/create', order_controller.create_order);
router.get('/list',order_controller.order_list);

module.exports = router;