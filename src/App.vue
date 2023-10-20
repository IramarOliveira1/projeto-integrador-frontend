
<template>
  <navbar
    v-if="this.$store.getters['user/getUser'].isAuthenticated || $route.name === 'home' || $route.name === 'list-vehicle' || $route.name === 'payment'" />

  <router-view />
</template>

<script>

import navbar from './components/navbar/navbar.vue';

export default {
  components: {
    navbar
  },
  mounted() {
    if (localStorage.getItem('token')) {
      this.$store.dispatch('user/getUser');
    }
  },
}
</script>
