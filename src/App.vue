
<template>
  <navbar
    v-if="this.$store.getters['user/getIsAuthenticated'] || $route.name === 'home' || $route.name === 'list-vehicle' || $route.name === 'payment'" />

  <router-view />
</template>

<script>

import navbar from './components/navbar/navbar.vue';

export default {
  components: {
    navbar
  },
}
</script>
