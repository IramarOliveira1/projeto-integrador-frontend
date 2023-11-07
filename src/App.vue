
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

  mounted() {

    const teste = new WebSocket("ws://localhost:8080/chat")
    console.log(teste);

    // console.log(this.$store.getters['user/getIsAuthenticated']);
    // if (this.$store.getters['user/getIsAuthenticated']) {
    //   setInterval(async () => {
    //     await this.setStatus(this.$store.getters['reserve/getPage']);
    //     await this.setStatus(this.$store.getters['reserve/getPage']);
    //   }, 3900000);
    // }
  },

  methods: {
    async setStatus(page) {
      await this.$store.dispatch('reserve/index', { page: page, idUser: 2 });
    }
  },
}
</script>
