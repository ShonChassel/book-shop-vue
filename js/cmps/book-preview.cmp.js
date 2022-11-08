export default {
    props: ['book'],
    emits: ['remove'],
    template: `
        <section class="book-preview">
            <button @click.stop="remove(book.id)">X</button>
            <h2>{{ book.title }}</h2>
            <h3>{{book.listPrice.amount}} {{currencyCode}}</h3>
            <img :src="imgUrl" >
        </section>
    `,
    methods: {
        remove(bookId) {
            console.log('bookId', bookId);
            this.$emit('remove', bookId);
        },
    },
    computed: {
        imgUrl() {
            return `${this.book.thumbnail}`
        },
        currencyCode() {
            if (this.book.listPrice.currencyCode === 'ILS') return '₪'
            if (this.book.listPrice.currencyCode === 'USD') return '$'
            if (this.book.listPrice.currencyCode === 'EUR') return '€'

        },
    }
}