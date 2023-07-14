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

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const setIsLoggedIn = (newState) => store.commit('setIsLoggedIn', newState);
const loggedIn = computed(() => store.state.loggedIn);

const toggleLogin = () => {
    setIsLoggedIn(!loggedIn.value);
};

</script>