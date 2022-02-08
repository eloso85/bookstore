var express = require('express');
var router = express.Router();

var book_controller = require('../controllers/bookController');

router.get('/list', book_controller.book_list);

router.post('/book/create', book_controller.book_add);

router.post('/book/:id/update', book_controller.book_update);


module.exports = router;