import { createStore } from "vuex";
import { setLoggedInInLS } from '../utils/localStorageUtils'

export default createStore({
    state: {
        loggedIn: false,
    },
    getters: {
        isLoggedIn: state => {
            return state.loggedIn;
        },
    },
    // setter sincrónico
    mutations: {
        SET_IS_LOGGED_IN(state, loggedIn) {
            state.loggedIn = loggedIn;
            setLoggedInInLS(loggedIn);
        }
    },
    // setter asincrónico
    actions: {

    },
    modules: {

    }
})