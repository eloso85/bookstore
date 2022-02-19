const  mongoose  = require('mongoose');
const Order = require('../model/order');
const axios = require('axios');

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

exports.find_orders_byID = ((req, res)=>{
    Order.findById(req.params.id).then((order)=>{
        if (order) {
            
            axios.get(`http://localhost:5000/customers/customer/${order.customerID}`).then((response) => {
                console.log(response);
                let orderObject = {
                    CustomerName: response.data.name,
                    BookTitle: '',
                    initialDate: order.initialDate,
                    deliveryDate:order.deliveryDate

                }
                axios.get(`http://localhost:5000/books/book/${order.bookID}`).then((response) => {
                    orderObject.BookTitle = response.data.title
                    res.json(orderObject);
                })
            })
        }else {
            res.status(404).send('Order not found')
        }
    }).catch((err)=>{
        res.status(500).send(`Internal Server Error ${err}`)
    });
})

exports.order_delete_byID = ((req, res)=>{
    Order.findByIdAndRemove(req.params.id).then((order)=>{
        if(order){
            res.json(`${order} Order deleted `)
        } else {
            res.status(404).send(`${order} Order not found`)
        }
    }).catch((err)=>{
        res.status(500).send(`Internal Server Error ${err}`)
    })
})