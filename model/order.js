const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    customerID: {
        type: mongoose.SchemaTypes.ObjectId,
        require: true
    },
    bookID: {
        type: mongoose.SchemaTypes.ObjectId,
        require: true
    },
    initialDate:{
        type: String,
        require: true
    },
    deliveryDate:{
        type: Date,
        require: false
    }
})

const Order = mongoose.model("order", orderSchema);
module.exports = Order;