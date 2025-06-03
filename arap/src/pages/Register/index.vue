<template>
    <div id="container">
  <div id="header">
    <Header />
  </div>
  <div id="main">
    <Info />
  </div>
  <div id="footer">
    <Footer />
  </div>
</div>
</template>

<script>
import Header from '../../components/Header.vue';
import Info from './Info.vue';
import Footer from '../../components/Footer.vue';

    export default {
        components:{
           Header,
            Info,
            Footer,
        }
    }
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
  top:8.5vh;
  height: 91.5vh;
  width:100%;
  margin: 0;
  background-size: cover;
  background-image: url("../../assets/background.jpeg");
  background-repeat: no-repeat;
}
</style>