import { bookService } from '../../services/book.service.js'

export default {
    components: {
        bookService,

    },
    template: `
        <header class="add-book">
            <label>Add book</label>
            <input @input.stop.prevent="searchBook" type="text" placeholder="Search...">
            <div class="googleBook-list">
                <ul v-for="book in books.items">
                    <li>{{book.volumeInfo.title}}</li>
                    <button @click.stop.prevent="addBook(book)">+</button>
                </ul>
            </div>
        </header>
    `,
    data() {
        return {
            books: [],
            selectedBook: null,
            showBy: null,
        };
    },
    methods: {
        searchBook(ev) {
            bookService.ask(ev.target.value)
            .then(books => this.books = books)
        },
        addBook(googleBook) {
            console.log('googleBook', googleBook);
            bookService.addGoogleBook(googleBook)
        }
    },
    computed: {

    },
}