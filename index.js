const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

const getBooksFromFile = () => {
    try {
        const data = fs.readFileSync('books.json', 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading or parsing books.json:', error);
        throw new Error('Failed to read or parse books data.');
    }
};

app.set('view engine', 'ejs');

app.get('/books', (req, res) => {
    try {
        const books = getBooksFromFile(); 
        res.json(books);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

app.get('/books/:id', (req, res) => {
    try {
        const books = getBooksFromFile(); 
        const book = books.find(b => b.id === parseInt(req.params.id));
        if (book) {
            res.json(book);
        } else {
            res.status(404).send('Book not found');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

app.get('/ejs/books', (req, res) => {
    try {
        const books = getBooksFromFile();  
        res.render('books', { books: books });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
