<template>
<div id="container">
  <div id="header">
    <Header />
  </div>
  <div id="main">
    <Info />
    <div class="clear" />
  </div>
  <div id="footer">
    <Footer />
  </div>
</div>
</template>

<script>
// import Top from "../Register/Top.vue";
import Info from "./log.vue";
import Footer from "../../components/Footer.vue";
import Header from "../../components/Header.vue";

export default {
  components: {
    // Top,
    Info,
    Footer,
    Header,
  },
};
</script>

<style scoped>
#container {
  height: 100%;
  width: 100%;
}
#footer {
  background-color: #92A4BD;
  position: fixed;
  bottom: 0px;
  height: 5vh;
  width: 100%;
  margin: 0;
}
.layout {
  height: 100%;
}
#main {
  position: fixed;
  height: 91.5vh;
  width:100%;
  margin: 0;
  background-size: cover;
  background-image: url("../../assets/background.jpeg");
  background-repeat: no-repeat;
}
.clear{
  clear: both;
}
</style>