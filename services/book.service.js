import { utilService } from './util-service.js'
// import { bookData } from '../js/books-data.js'
import booksJson from './../data/books.json' assert {type: 'json'}
import { storageService } from './async-storage.service.js';

let gBooks
const BOOKS_KEY = 'booksDB'
_createBooks()

export const bookService = {
    query,
    remove,
    getById,
    addReview,
    removeReview,
    // save,
    // getEmptyBook,
}


function query() {
    return storageService.query(BOOKS_KEY)
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOKS_KEY)

    if (!books || !books.length) {
        books = booksJson
        utilService.saveToStorage(BOOKS_KEY, books)
    }
    gBooks = books
    return books
}

function _createBook(name, price = 250) {
    const book = {
        id: utilService.makeId(),
        name,
        price,
    }
    return book
}

function remove(bookId) {
    return storageService.remove(BOOKS_KEY, bookId)
    // const books = query()
    // const idx = books.findIndex(book => book.id === bookId)
    // books.splice(idx, 1)
    // gBooks = books
    // utilService.saveToStorage(BOOKS_KEY, books)
}

function getById(bookId) {
    return storageService.get(BOOKS_KEY, bookId)
        .then(book => {
            return book
        })
    // return gBooks.find(book => book.id === bookId)
}

// function removeReview(bookId, reviewId) {
//     console.log('bookId', bookId);
//     const books = query()
//     const idx = books.findIndex(book => book.id === bookId)
//     books[idx]
//     console.log(books[idx]);
//     const reviewIdx = books[idx].reviews.findIndex(review => review.id === reviewId)

//     books[idx].reviews.splice(reviewIdx, 1)
//     gBooks = books
//     utilService.saveToStorage(BOOKS_KEY, books)
// }

function addReview(bookId, review) {
    review.id = utilService.makeId()
    
    return getById(bookId)
        .then(book => {
            console.log('book', book)
            if (!book.reviews) book.reviews = []
            book.reviews.push(review)
            return storageService.put(BOOKS_KEY, book)
                .then((updatedBook) => {
                    return updatedBook
                })

        })
}


function removeReview(bookId, reviewId) {
    return getById(bookId)
        .then(book => {
            var idx = book.reviews.findIndex(review => review.id === reviewId)
            book.reviews.splice(idx, 1)
            return storageService.put(BOOKS_KEY, book)
                .then((updatedBook) => {
                    return updatedBook
                })
        })
}








// function addReview(bookId, review) {
//     console.log('bookId',bookId);
//     console.log('review',review);
//     review.id = utilService.makeId()


//     const books = query().then()

//     const idx = books.findIndex(book => book.id === bookId)
//     if (!books[idx].reviews) {
//         books[idx].reviews = []
//         console.log('before');
//     }
//     books[idx].reviews.push(review)
//     console.log('after');

//     gBooks = books
//     utilService.saveToStorage(BOOKS_KEY, books)
// }