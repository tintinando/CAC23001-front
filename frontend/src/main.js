import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import { getLoggedInFromLS } from './utils/localStorageUtils'

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')

// recupero estado de logueo del localStorage
const isLoggedIn = getLoggedInFromLS();
store.commit('SET_IS_LOGGED_IN', isLoggedIn);