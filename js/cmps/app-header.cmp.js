export default {
    template: `
        <header class="app-header">
            <div class="logo">
                <div> Miss Book</div>
            </div>
         <nav>
            <router-link to="/" exact>Home</router-link> 
            <router-link to="/book">Books</router-link> 
            <router-link to="/about">About</router-link>
            <router-link to="/book/bookAdd">Add book</router-link>
         </nav>
        </header>
    `,
}