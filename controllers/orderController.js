const  mongoose  = require('mongoose');
const Order = require('../model/order');

let today = Date();

exports.create_order = ((req, res)=>{
    const newOrder = new Order({
        customerID: mongoose.Types.ObjectId(req.body.customerID),
        bookID : mongoose.Types.ObjectId(req.body.bookID),
        initialDate:today,
        deliveryDate: req.body.deliveryDate
    });

    newOrder.save().then(()=>{
        res.send('New order added successfully')
    }).catch((err)=>{
        res.status(500).send(`Internal Server Error ${err}`)
    })
});

exports.order_list = ((req,res)=>{
    Order.find().then((orders)=>{
        orders ? res.json(orders) : res.status(404).send('Orders not found')
    }).catch((err) => {
        res.status(500).send(`Internal Server Error ${err}`)
    })
})

exports.find_orders = ((req, res)=>{
    Order.findById(req.params.id).then((order)=>{
        if (order) {
            axios.get(`http://localhost:5000/customers/customer/:id${order.customerID}`).then((response) => {
                let orderObject = {
                    CustomerName: response.data.name,
                    BookTitle: ''
                }
                axios.get(`http://localhost:3000/book/${order.bookID}`).then((response) => {
                    orderObject.BookTitle = response.data.title
                    res.json(orderObject);
                })
            })
        }else {
            res.status(404).send('Order not found')
        }
    })
})