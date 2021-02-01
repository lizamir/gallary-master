'use strict';

const KEY = 'books';
const PAGE_SIZE = 4;

var gBooks;
var gPageIdx = 0;

var gNames = [
    'broken glass',
    'Harry Potter',
    'A Little Life',
    'Darkmans',
    'Nothing to Envy',
    'Gone Girl',
    'Wolf Hall'
]

_createBooks();

function getBooks() {
    var startIdx = gPageIdx * PAGE_SIZE;
    return gBooks.slice(startIdx, startIdx + PAGE_SIZE);
}

function getBookById(bookId) {
    var book = gBooks.find(function(book) {
        return bookId === book.id
    })
    return book
}

function addBook(name, price) {
    var book = _createBook(name, price);
    console.log(book, 'book');
    gBooks.unshift(book);
    console.log(gBooks);
    _saveBookToStorage();
}

function updateBook(bookId, newPrice) {
    var book = getBookById(bookId);
    book.price = newPrice;
    _saveBookToStorage();
}

function deleteBook(bookIdx) {
    var bookId = gBooks.findIndex(function(book) {
        return bookIdx === book.id
    })
    if (bookId === -1) return;
    gBooks.splice(bookIdx, 1)
    _saveBookToStorage();

}

function _createBook(bookName, price = getRandomIntInclusive(1, 200), rate = 1) {
    return {
        id: makeId(),
        bookName: bookName,
        price: price,
        // imgUrl: null,
        discriminate: makeLorem(),
        rate: rate
    };

}

function _createBooks() {
    var books = loadFromStorage(KEY)
    if (!books || !books.length) {
        books = [];
        for (let i = 0; i < 7; i++) {
            var name = gNames[getRandomIntInclusive(0, gNames.length - 1)]
            books.push(_createBook(name))
        }
    }
    gBooks = books;
    _saveBookToStorage();
}

function nextPage() {
    gPageIdx++;
    if (gPageIdx * PAGE_SIZE >= gBooks.length) {
        gPageIdx = 0;
    }
}

function previousPage() {

    gPageIdx--;
    if (!gPageIdx * PAGE_SIZE || PAGE_SIZE) {
        gPageIdx = 0;
    }
}

function updateRate(bookId, newRate) {
    var book = findBook(bookId);
    book.rate = newRate;
    _saveBooksToStorage();
}

function _saveBookToStorage() {
    saveToStorage(KEY, gBooks)
}