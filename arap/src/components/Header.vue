<template>
  <el-row class="myheader">
        <el-col :span="8" class="logo-col">
          <span class="logo" @click="toHome">
            <img src="../assets/logo.png" />
          </span>
          <el-text class="ABRSP">Asset-based Risk Assessment Platform </el-text>
        </el-col>
        <el-col :span="11"></el-col>
        <el-col :span="5">
        <el-button type="plain" size="small" round class="mybutton" @click="toHelp">Help</el-button>
          <router-link :to="{path:'/Account',query:{accountid:this.aId}}">
          <el-button type="plain" size="small" round class="mybutton">Account</el-button>
          </router-link>
        </el-col>
      </el-row>
</template>

<script>
export default {
  data(){
    return {
      username:this.$route.query.username,
      aId:this.$route.query.accountid,
    }
  },
  methods: {
    toHome(){
      this.$router.push({
        path:'/Home'
      })
    //         let user = JSON.parse(localStorage.getItem('user'));
    //         this.$router.push({
    //           path:'/Home',
    //           query: {
    //             accountid: user.accountId,
    //             usename: user.name,
    //             // projects:res.data.projects
    //           }
    // })
    },
    toHelp(){
      this.$router.push({
        path:'/Help'
      })
    //         let user = JSON.parse(localStorage.getItem('user'));
    //         this.$router.push({
    //           path:'/Help',
    //           query: {
    //             accountid: user.accountId,
    //             usename: user.name,
    //             // projects:res.data.projects
    //           }
    // })
    },
  },
};
</script>

<style scoped>
.myheader{
  background-color:#e6903f;
  height:8.5vh;
  width: 100%;
  margin: 0;
  position: fixed; 
  top: 0;         
  left: 0;        
  z-index: 1000;  
}
.mybutton {
  margin-top: 2.5vh;
  margin-left:0.8vw;
}

button{
  font-weight: bolder;
  width: 4.5vw;
  height: 3.5vh;
}

.logo {
  /* width: 33vh; */
  height: 6.5vh;
  float: left;
  overflow: hidden;
  /* margin-top: 1vh; */
  margin-left: 0.5vh;
 
}
.logo img {
  width: 100%;
  height: 100%;
  margin-top: 0;
}
.logo-col {
  display: flex;
  align-items: center; /* 让 logo 和文字垂直居中 */
  gap: 10px; /*logo和文字间距*/
}
.ABRSP {
  font-size: 20px;
  font-weight: bold;
  margin: 0; /* 移除默认 margin */
  color: black;
}
</style>