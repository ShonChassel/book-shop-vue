const { createRouter, createWebHashHistory } = VueRouter

import bookApp from './pages/book-app.cmp.js'
import homePage from './pages/home-page.cmp.js'
import aboutPage from './pages/about-page.cmp.js'
import bookDetails from './pages/book-details.cmp.js'
import bookAdd from './pages/book-add.cmp.js'

const routerOptions = {
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: homePage
        },
        {
            path: '/about',
            component: aboutPage
        },
        {
            path: '/book',
            component: bookApp
        },
        {
            path: '/book/:bookId',
            component: bookDetails
        },
        {
            path: '/book/bookAdd',
            component: bookAdd
        },
    ]
}

export const router = createRouter(routerOptions)