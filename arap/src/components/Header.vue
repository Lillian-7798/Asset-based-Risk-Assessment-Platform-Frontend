<template>
  <el-row class="myheader">
    <el-col :span="8" class="logo-col">
      <el-button class="logo" @click="isLoggedIn ? toHome() : toLogin()">
        <img src="../assets/logo.png" class="logo-image"/>
      </el-button>
      <el-text class="ABRSP">Asset-based Risk Assessment Platform </el-text>
    </el-col>
    <el-col :span="11"></el-col>
    <el-col :span="5">
      <el-button type="plain" size="small" round class="mybutton" @click="toHelp">Help</el-button>
      <template v-if="isLoggedIn">
        <el-dropdown>
          <span class="el-dropdown-link">
            <el-text class="welcome-text">Hi, {{ username }}</el-text>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="logout">Log Out</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
      <template v-else>
        <router-link to="/Login">
          <el-button type="plain" size="small" round class="mybutton">Account</el-button>
        </router-link>
      </template>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      aId: '',
      isLoggedIn: false
    }
  },
  created() {
    this.checkLoginStatus();
  },
  methods: {
    checkLoginStatus() {
      // Check if user data exists in localStorage or route query
      const user = localStorage.getItem('user');
      if (user) {
        try {
          const userData = JSON.parse(user);
          this.username = userData.username || '';
          this.aId = userData.userId || '';
          this.isLoggedIn = true;
        } catch (e) {
          console.error('Error parsing user data:', e);
          this.isLoggedIn = false;
        }
      } else if (this.$route.query.username) {
        this.username = this.$route.query.username;
        this.aId = this.$route.query.accountid;
        this.isLoggedIn = true;
      }
    },
    toHome() {
      this.$router.push({
        path: '/Home'
      });
    },
    toLogin() {
      this.$router.push({
        path: '/Login'
      });
    },
    toHelp() {
      this.$router.push({
        path: '/Help'
      });
    },
    logout() {
      // Clear user data from localStorage and reset state
      localStorage.removeItem('user');
      this.username = '';
      this.aId = '';
      this.isLoggedIn = false;
      this.$router.push('/Login'); // Redirect to login page after logout
    }

  },
  watch: {
    '$route'() {
      // Watch for route changes to update login status
      this.checkLoginStatus();
    }
  }
};
</script>

<style scoped>
.myheader {
  background-color: #e6903f;
  height: 8.5vh;
  width: 100%;
  margin: 0;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

.mybutton {
  margin-top: 2.5vh;
  margin-left: 0.8vw;
}

button {
  font-weight: bolder;
  width: 4.5vw;
  height: 3.5vh;
}

.logo {
  height: 6.5vh;
  float: left;
  overflow: hidden;
  margin-left: 0.5vh;
  padding: 0;
  background: none; /* 移除按钮的背景颜色 */
  border: none; /* 移除按钮的边框 */
  cursor: pointer;

}

.logo img {
  width: 80%;
  height: 80%;
  margin-top: 0;
}

.logo-col {
  display: flex;
  align-items: center;
  gap: 10px;
}

.ABRSP {
  font-size: 20px;
  font-weight: bold;
  margin: 0;
  color: black;
}

.welcome-text {
  margin-left: 0.8vw;
  margin-top: 2.5vh;
  font-size: 16px;
  font-weight: bold;
  display: inline-block;
  vertical-align: middle;
  line-height: 3.5vh;
}
</style>