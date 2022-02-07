const Customer = require('../model/customer')

exports.customer_list = ((req, res)=>{
    Customer.find().then((customers) => {
        if (customers) {
           res.json(customers)
        } else {
           res.status(404).send('customers not found');
        }
     }).catch((err) => {
          res.status(500).send('Internal Server Error!');
    });
    
});

exports.customer_add =((req, res)=>{
    const newCustomer = new Customer({...req.body});
    newCustomer.save().then(() => {
       res.send('New Customer created successfully!');
    }).catch((err) => {
        res.status(500).send('Internal Server Error!');
    })
})

exports.customer_get_ID = ((req, res)=>{
    Customer.findById(req.params.id).then((customer) => 	{
        if (customer) {
             res.json(customer)
         } else {
             res.status(404).send('customer not found');
         }
       }).catch((err) => {
             res.status(500).send(`Internal Server Error! ${err}`);
      });
})

exports.customer_delete_ID =((req, res) => {
    Customer.findByIdAndRemove(req.params.id).then((customer) => {
        if (customer) {
             res.json('customer deleted Successfully!')
          } else {
             res.status(404).send('Customer Not Found!');
          }
        }).catch((err) => {
           res.status(500).send('Internal Server Error!');
      });
})