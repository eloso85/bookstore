var express = require('express');
var router = express.Router();

var customer_controller = require('../controllers/customerController')

console.log(customer_controller.customer_list);

router.get('/list', customer_controller.customer_list);

router.post('/customer/create', customer_controller.customer_add);

router.get('/customer/:id', customer_controller.customer_get_ID)

router.post('/customer/:id/delete', customer_controller.customer_delete_ID)

router.post('/customer/:id/update', customer_controller.customer_update_ID)

// router.get('/',(req,res)=>{
//     res.send('Wiki home page.')
// })

// router.get('/about',(req,res)=>{
//     res.send('About this wiki')
// })

module.exports = router;