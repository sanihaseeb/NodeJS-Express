const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://localhost/bookAPI');
const Book = require('./models/bookModel');
const bookRouter = express.Router();
bookRouter.route('/books')

.get((req,res) => {
  const {query} = req;
  Book.find(query, (err, books) => {
    if(err){
      return res.send(err);
    }
      return res.json(books);  
  });
});

bookRouter.route('/books/:bookId')
.get((req, res) => {
 Book.findById(req.params.bookId, (err, book) => {
   if(err){
     return res.send(err);
   }
   return res.json(book);
 });
});

app.use('/api', bookRouter);
app.get('/', (req, res) => {
  res.send('Welcome to my Nodemon API!');
});

app.listen(port, () => {
  console.log('Running on port ' + port);
});