const Books = require('../models/Books');

// POST(add a new book)
const addBook = async (req, res) => {
  try {
    const { title, author, publisher, publicationDate, isbn, genre, price, quantityInStock  } = req.body;
    
    // Check if the book already exists
    const existingBook = await Books.findOne({ where: { title } });
    if (existingBook) {
      return res.status(409).json({ message: 'Book already exists' });
    }
    
    // Create the new book
    const newBook = await Books.create({
        title,
        author,
        publisher,
        publicationDate,
        isbn,
        genre,
        price,
        quantityInStock,
    });
    
    // Return the new book
    res.status(201).json(newBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { addBook };