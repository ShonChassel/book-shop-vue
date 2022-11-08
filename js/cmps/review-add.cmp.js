
export default {
    // props: ['books'],
    emits: ['', ''],
    template: `
    <section>
        <form @submit.prevent="submitReview">
        <input v-model="name" type="text" placeholder="Full Name" required>
        <select name="rate" v-model.number="rate">
            <option v-for="n in 5" :value="n">{{n}}</option>
        </select>
        <label><input v-model="datepicker" type="date"/></label>
        <textarea class="free-txt" name="Information" v-model="txt" type="text" placeholder="Something in addition" cols="30" rows="5"></textarea>
        <button>SUBMIT</button>
            <!-- <a href="#" @click="submit">SUBMIT</a> -->
        </form>
    </section>
    `,
    data() {
        return {
            name: '',
            txt: '',
            rate: 1,
            datepicker: new Date().toISOString().slice(0, 10)
            ,
        }
    },
    methods: {
        submitReview() {
            let data = { name: this.name, txt: this.txt, rate: this.rate, date: this.datepicker }
            this.$emit('reviewAdd', data)
        }
    },
    components: {

    }
}