<template>
    <div>
    <Header />
    <el-container class="main">
      <Sidebar></Sidebar>
        <el-main class="content">
      <router-view></router-view>
        </el-main>
    </el-container>
    <div class="footer">
      <Footer />
    </div>
    </div>
</template>

<script>
import Footer from "../../components/Footer.vue";
import Header from "../../components/Header.vue";
import Sidebar from "../../components/Sidebar.vue";
export default {
  components: {
    Header,
    Sidebar,
    Footer,
  },
  methods: {
  }
};
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
.main {
  height: 86.5vh;
  width: 100%;
  margin-top:8.5vh;
  margin-left: 0;
}
/* .side{
    height: 83.5vh;
} */
/* el-mian{
    --el-main-padding: 30px;
    width: 70%;
} */
</style>