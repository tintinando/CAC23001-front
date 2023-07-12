<template>
    <form class="row g-3">
        <div class="col-auto">
            <span v-if="loggedIn">Logueado</span>
            <span v-else>No logueado</span>
        </div>
        <div class="col-auto">
            <button type="button" :class="{ 'btn btn-primary': !loggedIn, 'btn btn-danger': loggedIn }" @click="toggleLogin"
                v-text="loggedIn ? 'Cerrar sesión' : 'Iniciar sesión'">
            </button>
        </div>
    </form>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
    computed: {
        ...mapState(['loggedIn'])
    },
    methods: {
        ...mapMutations(['SET_IS_LOGGED_IN']),
        toggleLogin() {
            this.SET_IS_LOGGED_IN(!this.loggedIn);
        }
    }
};
</script>