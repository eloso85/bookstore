require("dotenv").config();
const express = require('express')

//routes
var customerRoutes = require('./routes/customerRoutes');
var bookRoutes = require('./routes/bookRoutes');
var orderRoutes = require('./routes/orderRoutes');

const app = express();
const port = 5000;

// Connect 
require('./db/db');

//console.log(test);

app.use(express.json())

app.use('/customers', customerRoutes);
app.use('/books', bookRoutes);
app.use('/orders', orderRoutes);





app.listen(port, () => {
    console.log(`Up and Running on port ${port}`);
})