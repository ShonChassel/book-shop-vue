import longText from '../cmps/long-text.cmp.js'
import reviewAdd from '../cmps/review-add.cmp.js'
import reviewList from '../cmps/review-list.cmp.js'
import { bookService } from '../../services/book.service.js'

export default {
    // props: ['book'],
    template: `
        <section v-if="book"  class="book-details">
            <img :src="imgUrl" >
            <h3>Book Details:</h3>
            <p>Book name : {{book.title}}</p>
            <p :class="bookDetails">Price : {{book.listPrice.amount}} {{currencyCode}}</p>
            <p>Page Count :{{pageCount}}</p>
            <p>Published Date :{{ publishedDate}}</p>
            <p class="red"> {{isOnSale}}</p>
            <long-text :txt="book.description" :maxLength="100"/>
            <review-list :reviews="book.reviews" @removeReview="removeReview"/>
            <review-add @reviewAdd="addReview" />
            <button @click="select">Back</button>
        </section>
        <section v-else class="loader">
           <h2>Loading</h2>
        </section>
    `,
    data() {
        return {
            book: null
        }
    },
    methods: {
        select() {
            this.$router.push('/book/');
        },
        addReview(data) {
            bookService.addReview(this.book.id, data)
            .then(book => {this.book = book})
        },
        removeReview(reviewId) {
            bookService.removeReview(this.book.id, reviewId)
            .then(book => {this.book = book})
        },
    },
    //?--------------------------------------
    created() {
        const { bookId } = this.$route.params;
        bookService.getById(bookId).then(book => this.book = book)

        // const book = bookService.getById(bookId)
        // this.book = book;
    },

    computed: {
        imgUrl() {
            return `${this.book.thumbnail}`
        },
        pageCount() {
            if (this.book.pageCount > 500) return 'Long reading'
            if (this.book.pageCount < 200) return 'Decent Reading'
            if (this.book.pageCount < 100) return 'Light Reading'
            else return 'Regular Reading'
        },
        publishedDate() {

            if ((this.book.publishedDate - 2021) === -10) return 'Veteran Book'
            if ((this.book.publishedDate - 2021) === -1) return 'New!'
            else return 'Regular book'
        },
        bookDetails() {
            if (this.book.listPrice.amount > 150) return 'red'
            if (this.book.listPrice.amount < 20) return 'green'
        },
        currencyCode() {
            if (this.book.listPrice.currencyCode === 'ILS') return '₪'
            if (this.book.listPrice.currencyCode === 'USD') return '$'
            if (this.book.listPrice.currencyCode === 'EUR') return '€'

        },
        isOnSale() {
            if (!this.book.listPrice.isOnSale) return
            return 'S A L E '
        },
    },
    components: {
        longText,
        reviewAdd,
        reviewList
    }
}