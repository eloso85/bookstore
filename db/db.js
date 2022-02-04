require('dotenv').config({path:'../.env'})



const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((r)=>{
    console.log(`connection sucessful ${r}`);

}).catch((e)=>{
    console.log(`connection failed ${e}`);
})

