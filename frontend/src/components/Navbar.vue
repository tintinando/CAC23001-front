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
            <RouterLink class="nav-link" aria-current="page" to="/">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" aria-current="page" to="/about">Acerca de</RouterLink>
          </li>
          <li v-if="loggedIn" class="nav-item">
            <RouterLink class="nav-link" aria-current="page" to="/addproduct">Agregar productos</RouterLink>
          </li>
        </ul>
        <span>
          <Login />
        </span>
      </div>
    </div>
  </nav>
</template>

<script>
import Login from './Login.vue';
import { RouterLink } from 'vue-router'
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['loggedIn'])
  },
  components:{
    Login,
  }
};

</script>