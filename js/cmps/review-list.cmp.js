
export default {
    props: ['reviews'],
    emits: ['removeReview',],
    template: `
    <section>
        <ul class="review-list">Reviews
           <li v-for="review in reviews" :key="review.name">
            <ul class="review-card">
                <p>Name : {{review.name}}</p>
                <p>Free Text :{{review.txt}}</p>
                <p>Rate :{{review.rate}}</p>
                <p>Read At :{{review.date}}</p>
                <button @click.stop="remove(review.id)">X</button>
            </ul>
          </li>
       </ul>
    </section>
    `,
    data() {
        return {
            
        }
    },
    methods: {
        remove(reviewId) {
            console.log('review', reviewId);
            this.$emit('removeReview', reviewId);
        },
    },
    components: {

    }
}