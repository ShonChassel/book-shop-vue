import bookPreview from './book-preview.cmp.js'

export default {
    props: ['books'],
    emits: ['remove','selected'],
    template: `
    <section class="book-list">
        <ul>
             <li v-for="book in books" :key="book.id" @click="select(book.id)">
             <book-preview @remove="$emit('remove', $event)" :book="book"/>
            </li>
        </ul>
    </section>
    `,
    data() {
        return {
            isDetails: null
        }
    },
    methods: {
        select(bookId) {
            this.$router.push('/book/'+bookId);
        },
       
    },
    components: {
        bookPreview,
    }
}