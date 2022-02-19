const Book = require('../model/book');


//get list of books
exports.book_list =((req, res)=>{
    Book.find().then((books)=>{
        if (books.length != 0){
            res.json(books)
        }else {
            res.status(404).send('Book not found');
        }
    }).catch((err)=>{
        res.status(500).send('Internal Server Error')
    })
})

exports.book_add = ((req, res)=>{
    const newBook = new Book ({...req.body});
    newBook.save().then(()=>{
        res.send('New Book added successfully')
    })
})

exports.get_book_byID = ((req, res)=>{
    Book.findById(req.params.id).then((book)=>{
        if(book){
            res.json(book)
        } else {
            res.status(404).send('Books not found')
        }
    }).catch((err)=>{
        res.status(500).send(`Internal Server Error ${err}`)
    })
})

exports.book_update = ((req, res)=>{
    Book.findByIdAndUpdate(req.params.id, req.body).then((book)=>{
        if(book){
            res.send('book updated')
        }else{
            res.status(500).send('error updating book')
        }
    })
})

exports.delete_book_byID =((req,res)=>{
    Book.findByIdAndRemove(req.params.id).then((book)=>{
        if (book){
            res.json(`${book} Book deleted Successfully`)
        } else {
            res.status(404).send(`${book} book not found`)
        }
    }).catch((err)=>{
        res.status(500).send(`Internal Server error ${err}`)
    });
})

// app.put('/student/:id', (req, res) => {
//     Student.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
//         if (err) {
//             return res
//                 .status(500)
//                 .send({error: "unsuccessful"})
//         };
//         res.send({success: "success"});
//     });

// });