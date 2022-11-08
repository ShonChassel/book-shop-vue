import bookPreview from './book-preview.cmp.js'

export default {
    props: ['books'],
    emits: ['remove','selected'],
    template: `
    <section class="book-list">
        <ul>
             <li v-for="book in books" :key="book.id" @click="select(book.id)">
             <book-preview @remove="$emit('remove', $event)" :book="book"/>
             <!-- <router-link :to="'/book/'+book.id"></router-link> -->
             <!-- <book-preview :book="book"/> -->
             <!-- <button @click.stop="remove(book.id)">X</button> -->
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
        // remove(bookId) {
        //     console.log('bookId', bookId);
        //     this.$emit('remove', bookId);
        // },
    },
    components: {
        bookPreview,
    }
}