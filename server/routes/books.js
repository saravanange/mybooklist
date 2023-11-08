// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    // Pass an empty book object to initialize the form fields
    const emptyBook = {
      Title: '',
      Price: '',
      Author: '',
      Genre: ''
  };
  res.render('books/details', { title: 'Add a Book', book: emptyBook });

});

// POST process the Book Details page and create a new Book - CREATE
// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {
  // Retrieve data from the request body
  const { title, price, author, genre } = req.body;

  // Create a new book object
  const newBook = new book({
      Title: title,
      Price: price,
      Author: author,
      Genre: genre
  });

  // Save the new book to the database
  newBook.save()
      .then(book => {
          // Redirect to the book list or show a success message
          res.redirect('/books');
      })
      .catch(err => {
          // Handle errors, e.g., show an error message or redirect to an error page
          console.error(err);
          res.redirect('/error');
      });
});


// GET the Book Details page in order to edit an existing Book
router.get('/edit/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    const bookId = req.params.id;

    // Find the book by its ID
    book.findById(bookId, (err, book) => {
      if (err) {
        return console.error(err);
      }
  
      res.render('books/details', {
        title: 'Edit Book',
        book: book
      });
    });
    
});

// POST - process the information passed from the details form and update the document
router.post('/edit/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    const bookId = req.params.id;
  const { title, price, author, genre } = req.body;

  // Find the book by its ID and update it
  book.findByIdAndUpdate(
    bookId,
    {
      Title: title,
      Price: price,
      Author: author,
      Genre: genre
    },
    (err, book) => {
      if (err) {
        return console.error(err);
      }

      res.redirect('/books');
    }
  );

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

    const bookId = req.params.id;

  // Find the book by its ID and remove it
  book.findByIdAndRemove(bookId, (err, book) => {
    if (err) {
      return console.error(err);
    }

    res.redirect('/books');
  });

});


module.exports = router;
