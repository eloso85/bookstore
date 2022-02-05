require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');

//connect 
require('../db/db')

const Order = require('./order');


const app = express();
const port = 9000;
app.use(express.json())

app.post('/order', (req, res) => {
    const newOrder = new Order({
        customerID: mongoose.Types.ObjectId(req.body.customerID),
        bookID: mongoose.Types.ObjectId(req.body.bookID),
        initialDate: req.body.initialDate,
        deliveryDate: req.body.deliveryDate
    });

    newOrder.save().then(() => {
        res.send('New Order added successfully')
    }).catch((err) => {
        res.status(500).send(`Internal Sever Error ${err}`)
    })
})

app.get('/orders', (req, res) => {
    Order.find().then((orders) => {
        if (orders) {
            res.json(orders)
        } else {
            res.status(404).send('Orders not found')
        }
    }).catch((err) => {
        res.status(500).send(`Internal Server Error ${err}`)
    })
})

app.get('/order/:id', (req, res) => {
    Order.findById(req.params.id).then((order) => { // orderID = {customerID:61fedff0dda46b2937b06fe1 bookID:61fedfc6fa8f9b3b5ab5a6c9}//
        if (order) {
            axios.get(`http://localhost:5000/customer/${order.customerID}`).then((response) => {
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
    }).catch((err)=>{
        res.status(500).send('Internal Server Error')
    });
})

app.listen(port, ()=>{
    console.log(`Up and Running on port ${port} - This is Order service`);
})

// customerID:61fedff0dda46b2937b06fe1 bookID:61fedfc6fa8f9b3b5ab5a6c9//