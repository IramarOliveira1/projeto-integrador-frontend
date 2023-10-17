
<template>
  <navbar v-if="this.$store.getters.isAuthenticated || $route.name === 'home'  || $route.name === 'list-vehicle' || $route.name === 'payment'" />

  <router-view />
</template>


<script>

import navbar from './components/navbar/navbar.vue';

export default {
  components: {
    navbar
  },
  mounted() {
    if (this.$store.getters.isAuthenticated) {
      if (JSON.parse(localStorage.getItem('user'))) {
        this.$store.dispatch('getUser', this.$store.getters.getUserLogin.id);
      }
    }
  },
}
</script>
