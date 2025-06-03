<template>
    <div>
    <Header />
    <div class="content">
        TODO：对于资产进行风险调查问卷，主要难点在于根据用户不同的选择加载接下来不同的问卷内容。
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