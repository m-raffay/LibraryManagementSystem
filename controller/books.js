const { Op } = require('sequelize');
const Books = require('../models/Books');

const booksController = {
  async getAllBooks(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const titleFilter = req.query.title || '';
      const where = {
        title: {
          [Op.like]: `%${titleFilter}%`
        }
      };
      const { count: totalItems, rows: books } = await Books.findAndCountAll({
        where,
        limit: parseInt(limit),
        offset
      });
      const totalPages = Math.ceil(totalItems / limit);
      res.json({ totalPages, currentPage: page, totalItems, books });
    } catch (error) {
      console.log(error);
      res.status(500).send('Error retrieving books');
    }
  },

  async getBookById(req, res) {
    const { id } = req.params;
    try {
      const book = await Books.findByPk(id);
      if (!book) {
        return res.status(404).send('Book not found');
      }
      res.json(book);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: 'Error retrieving book', error });
    }
  },

  async createBook(req, res) {
    const { title, author, publisher, publicationDate, isbn, genre, price, quantityInStock } = req.body;
    try {
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
      res.json(newBook);
    } catch (error) {
      console.log(error);
      res.status(500).send('Error creating book');
    }
  },

  async updateBookById(req, res) {
    const { id } = req.params;
    const { title, author, publisher, publicationDate, isbn, genre, price, quantityInStock } = req.body;
    try {
      const book = await Books.findByPk(id);
      if (!book) {
        return res.status(404).send('Book not found');
      }
      const updatedBook = await book.update({
        title,
        author,
        publisher,
        publicationDate,
        isbn,
        genre,
        price,
        quantityInStock,
      });
      res.json(updatedBook);
    } catch (error) {
      console.log(error);
      res.status(500).send('Error updating book');
    }
  },

  async deleteBookById(req, res) {
    const { id } = req.params;
    try {
      const book = await Books.findByPk(id);
      if (!book) {
        return res.status(404).send('Book not found');
      }
      await book.destroy();
      res.send('Book deleted successfully');
    } catch (error) {
      console.log(error);
      res.status(500).send('Error deleting book');
    }
  },
};

module.exports = booksController;