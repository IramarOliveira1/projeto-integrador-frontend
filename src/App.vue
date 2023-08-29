
<template>
  <router-view> </router-view>
</template>


<script>
export default {
  mounted() {
    if (JSON.parse(localStorage.getItem('user'))) {
      this.$store.dispatch('getUser');
    }
  },
}
</script>
