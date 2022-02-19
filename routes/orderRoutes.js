var express = require('express');
var router = express.Router();

var order_controller = require('../controllers/orderController');

router.post('/order/create', order_controller.create_order);

router.get('/list',order_controller.order_list);

router.get('/order/:id', order_controller.find_orders_byID)

router.delete('/order/:id/delete', order_controller.order_delete_byID)

module.exports = router;