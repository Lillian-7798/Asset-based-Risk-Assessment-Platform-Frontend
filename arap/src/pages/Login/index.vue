<template>
    <Header />
    <n-button type="primary">
      Login
    </n-button>
    <Footer />
</template>

<script>
import Footer from "../../components/Footer.vue";
import Header from "../../components/Header.vue";

export default {
    name:'PageLogin',
  components: {
    Footer,
    Header,
  },
};
</script>

<style scoped>
</style>