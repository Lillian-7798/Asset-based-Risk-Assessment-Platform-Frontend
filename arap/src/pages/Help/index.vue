<template>
    <div>
    <Header />
    <div class="content">
        Here is Helper!
        <br />
        完成网站之后随便丢一点截图指引就可以了。
    </div>
    <div class="footer">
      <Footer />
    </div>
    </div>
</template>

<script>
import Footer from "../../components/Footer.vue";
import Header from "../../components/Header.vue";
export default {
  components: {
    Header,
    Footer,
  },
}
</script>

<style scoped>
.footer {
  background-color: #92A4BD;
  position: fixed;
  bottom: 0px;
  height: 5vh;
  width: 100%;
  margin: 0;
}
.content{
    margin-top: 8.5vh;
}
</style>