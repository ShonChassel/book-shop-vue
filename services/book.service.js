import { utilService } from './util-service.js'
// import { bookData } from '../js/books-data.js'
import booksJson from './../data/books.json' assert {type: 'json'}
import { storageService } from './async-storage.service.js';

let gBooks
const GOOGLE_KEY = 'googleDB'

const BOOKS_KEY = 'booksDB'
_createBooks()

const gGoogleBook = utilService.loadFromStorage(GOOGLE_KEY) || {}

export const bookService = {
    query,
    remove,
    getById,
    addReview,
    removeReview,
    ask,
    addGoogleBook,
    save
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

function ask(ev) {
    console.log('googleBook', ev);
    // if (gGoogleBook[ev]) {
    //     console.log('book from storage');
    //     return Promise.resolve(gGoogleBook[ev])
    // }
    console.log('books from server')
    const api = `https://www.googleapis.com/books/v1/volumes?printType=books&q=${ev}`
    return axios.get(api)
        .then(books => {
            return books.data
            // saveToStorage(STORAGE_KEY, books)
            // return Promise.resolve(books)
        })
}

function addGoogleBook(googleBook) {
    console.log('googleBook', googleBook);
    let books = utilService.loadFromStorage(BOOKS_KEY)
    let book = createBook(googleBook)

    save(book)

}

function createBook(val) {
    return {
        id: val.id,
        title: val.volumeInfo.title,
        authors: val.volumeInfo.authors,
        description: val.volumeInfo.description,
        subtitles: val.volumeInfo.subtitles,
        pageCount: val.volumeInfo.pageCount,
        categories: val.volumeInfo.categories,
        thumbnail: val.volumeInfo.imageLinks.thumbnail,
        language: val.volumeInfo.language,
        publishedDate: val.volumeInfo.publishedDate,
        publishedDate: val.volumeInfo.publishedDate,
        listPrice: {
            amount: 226, currencyCode: 'EUR', isOnSale: false,
        }
    }
}


    function save(book) {
        console.log(book);
        if (book.id) {
            return storageService.post(BOOKS_KEY, book)
        } else {
            return storageService.put(BOOKS_KEY, book)

        }
    }
// listPrice: {
//           amount: 226,
//           currencyCode: 'EUR',
//           isOnSale: false,
//         },

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


// {
//     id: results.id,
//     title: results.volumeInfo.title,
//     authors: results.volumeInfo.authors,
//     description: results.volumeInfo.description,
//     subtitles: results.volumeInfo.subtitles,
//     pageCount: results.volumeInfo.pageCount,
//     categories: results.volumeInfo.categories,
//     thumbnail: results.volumeInfo.imageLinks.thumbnail,
//     language: results.volumeInfo.language,
//     publishedDate: results.volumeInfo.publishedDate,
//     publishedDate: results.volumeInfo.publishedDate,
//     listPrice: {
//       amount: 226,
//       currencyCode: 'EUR',
//       isOnSale: false,
//     },
