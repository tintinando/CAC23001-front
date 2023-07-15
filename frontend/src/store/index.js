import { createStore } from "vuex";
import { setLoggedInInLS } from '../utils/localStorageUtils'

const state = {
    loggedIn: false,
    searchFilter: '',
};

const getters = {
    isLoggedIn: state => {
        return state.loggedIn;
    },
    getSearchFilter: state => {
        return state.searchFilter;
    }
};

const actions = {};

const mutations = {
    setIsLoggedIn(state, loggedIn) {
        state.loggedIn = loggedIn;
        setLoggedInInLS(loggedIn);
    },
    setSearchFilter(state, searchFilter) {
        state.searchFilter = searchFilter;
    },
};

export default createStore({
    state,
    getters,
    actions,
    mutations,
})