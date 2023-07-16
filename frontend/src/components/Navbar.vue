<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Yerbas</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink class="nav-link" aria-current="page" :to="{ name: 'home' }" @click="handleHomeClick">Home
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" aria-current="page" to="/about">Acerca de</RouterLink>
          </li>
          <li v-if="loggedIn" class="nav-item">
            <RouterLink class="nav-link" aria-current="page" to="/addproduct">Agregar productos</RouterLink>
          </li>
        </ul>
        <span class="me-5">
          <SearchBar />
        </span>
        <span>
          <Login />
        </span>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue';
import Login from './Login.vue';
import SearchBar from './helpers/SearchBar.vue';
import { useRouter, RouterLink } from 'vue-router'
import { useStore } from 'vuex';

const store = useStore();
const loggedIn = computed(() => store.state.loggedIn);
const setSearchFilter = (search) => store.commit('setSearchFilter', search);

const router = useRouter();

const handleHomeClick = () => {
  if (router.currentRoute.value.name === 'home') {
    setSearchFilter('');
  } else {
    router.replace({ name: 'home' });
  };
};

</script>