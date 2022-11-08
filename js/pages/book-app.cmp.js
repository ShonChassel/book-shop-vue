import { bookService } from '../../services/book.service.js'

import { showErrorMsg, showSuccessMsg } from '../../services/event-bus-service.js'
import bookList from '../cmps/book-list.cmp.js'
import bookDetails from './book-details.cmp.js'
import bookFilter from '../cmps/book-filter.cmp.js'

export default {
    components: {
        bookList,
        bookFilter,
        bookService,
        bookDetails,
    },
    template: `
    <section class="book-app">
      <book-filter @filtered="setFilter"/>
      <book-details v-if="selectedBook" :book="selectedBook" @close="closeDetails"/>
      <book-list v-else :books="booksToShow" @selected="selectBook" class="cards-container" @remove="removeBook"/>
    </section>
    `,
    created() {
        this.loadBooks();
        
    },
    data() {
        return {
            books: [],
            selectedBook: null,
            filterBy: null
        };
    },
    methods: {
        loadBooks(){
            bookService.query()
            .then(books => this.books = books)
        },
        selectBook(book) {
            console.log('book', book);
            this.selectedBook = book;
        },
        setFilter(filterBy) {
            this.filterBy = filterBy;
        },
        closeDetails() {
            this.selectedBook = null;
        },
        removeBook(bookId) {
            bookService.remove(bookId)
                .then(()=>{
                    showSuccessMsg(`book ${bookId} deleted`)
                    this.loadBooks()
                });
            // const idx = this.books.findIndex(book => book.id === bookId)
            // this.books.splice(idx, 1)
        },
    },
    computed: {
        booksToShow() {

            if (!this.filterBy) return this.books;

            const searchStr = this.filterBy.title.toLowerCase();
            var booksToDisplay = this.books.filter(book => {
                return book.title.toLowerCase().includes(searchStr);
            });
            const searchMin = (this.filterBy.minPrice) ? this.filterBy.minPrice : 0
            booksToDisplay = booksToDisplay.filter(book => {
                return book.listPrice.amount > searchMin
            })
            const searchMax = (this.filterBy.maxPrice) ? this.filterBy.maxPrice : Infinity
            booksToDisplay = booksToDisplay.filter(book => {
                return book.listPrice.amount < searchMax
            })
            return booksToDisplay
        }
    },

};