require("dotenv").config();
const express = require('express')
var customerRoutes = require('./routes/customerRoutes')

const app = express();
const port = 5000;

// Connect 
require('./db/db');

//console.log(test);

app.use(express.json())

app.use('/customers', customerRoutes);





app.listen(port, () => {
    console.log(`Up and Running on port ${port}`);
})