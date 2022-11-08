const { createApp } = Vue

import { router } from '../js/routes.js'

import bookApp from './pages/book-app.cmp.js'
import appHeader from './cmps/app-header.cmp.js'
import appFooter from './cmps/app-footer.cmp.js'
import userMsg from './cmps/user-msg.cmp.js'



const options = {
    el: '#app',
    router,
    template: `
        <section>
            <app-header />
            <router-view />
            <app-footer />
            <user-msg/>
        </section>
             `,
    components: {
        appHeader,
        bookApp,
        appFooter,
        userMsg
    }
}




const app = createApp(options)
app.use(router)
app.mount('#app')