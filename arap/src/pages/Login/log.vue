<template>
  <div class="bg_intro">
    <div class="intro">
      <ul class="info">
        <img src="../../assets/logo.png" style="height: 90px;" />
        <li>
          <input type="text" id="username" v-model="loginForm.username" placeholder="username" @blur="validateUserName" @keyup.enter="handleLogin"/>
        </li>
        <li>
          <input type="password" id="password" v-model="loginForm.password" placeholder="password" @blur="validatePassword" @keyup.enter="handleLogin"/>
        </li>
        <li>
          <button id="btn" @click="handleLogin" :disabled="isLoading" style="margin: 0 auto; width: 20vw">{{ isLoading ? 'Logging in...' : 'Login' }}</button>
        </li>
        <br />
        <router-link :to="{ name: 'Register' }" style="margin: auto">
          <h style="text-align: center;">No account? Click here to Register</h>
        </router-link>
        <br />
      </ul>
    </div>
  </div>
</template>

<script>

import axios from "axios";
import { API_BASE_URL } from "@/components/axios";

export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      isLoading: false
    };
  },
  methods: {

    validateUserName() {
      if (!this.loginForm.username.trim()) {
        this.$message.error('用户名不能为空');
        return false;
      }
      return true;
    },
    validatePassword() {
      if (!this.loginForm.password.trim()) {
        this.$message.error('密码不能为空');
        return false;
      }
      return true;
    },

    async handleLogin() {
      if (!this.validateUserName() || !this.validatePassword()) {
        return;
      }
      this.isLoading = true;
      //this.$router.push({ name: 'AssetInventory' });
      try {
        console.log('请求参数:', {
          assetUserName: this.loginForm.username,
          assetUserPwd: this.loginForm.password
        });

        const response = await axios.post(
            API_BASE_URL+'/user/login',
            new URLSearchParams({
              assetUserName: this.loginForm.username,
              assetUserPwd: this.loginForm.password
            }),
            {
              headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }

            }
        );
        if (response.data.success) {
          this.$message.success('login success');

          const userData = {
            username: response.data.username || 'guest',
            userId: response.data.userId || '',
            useremail: response.data.useremail || '',
            userLevel:response.data.userLevel,
          };
          console.log('准备存储的用户数据:', userData);

          try {
            if (!userData.username || !userData.userId) {
              console.error('用户数据不完整，无法存储:', userData);
              this.$message.error('用户信息不完整，请联系管理员');
              return;
            }

            try {
              sessionStorage.setItem('userData', JSON.stringify(userData));
            } catch (storageError) {
              console.error('存储用户数据时发生错误:', storageError);
              this.$message.error('无法保存用户信息，请稍后重试');
            }

            sessionStorage.setItem('userData', JSON.stringify(userData));
          } catch (storageError) {
            console.error('存储用户数据时发生错误:', storageError);
            this.$message.error('无法保存用户信息，请稍后重试');
          }


          // 登录成功后跳转到Home页面
          this.$router.push('/home/asset-inventory');
        } else {
          throw new Error(response.data.message || 'fail login');
        }

      } catch (error) {

        const errorMessage = error.response?.data?.message ||
            error.message ||
            '无法连接到服务器，请检查后端服务是否运行';
        this.$message.error(errorMessage);
        console.error('完整错误:', error);
      } finally {
        this.isLoading = false;
      }
    }

  }
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}
li {
  list-style: none;
}
template,
body {
  text-align: center;
}
.bg_intro {
  height: 100%;
  width: 100%;
}
.bg_intro .intro {
  position: relative;
  background: #E2E4E44A;
  border-radius: 20px;
  width: 30%;
  height: 65%;
  margin: 0 auto;
  margin-top: 5%;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center;     /* 垂直居中 */
}
.bg_intro .intro .info {
  position: relative;
  width: 80%;
  /* height: 300px; */
  margin: 0;
  padding:0;
  /* background-color: #1e2f92; */
}
li {
  list-style: none;
  margin: 0;
  padding: 0;
}
input[type="text"],
input[type="password"],
textarea {
  display: block;
  width: 80%;
  height: 15px;
  padding: 12px;
  border-radius: 5px;
  background: #fff;
  border: none;
  outline: none;
  margin: 30px auto;
  text-transform: none;
  color: #383838;
  font-size: 14px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
  font-family: "roboto", sans-serif;
}

::placeholder {
  color: rgba(46, 31, 31, 0.6);
}
#btn {
  /* position: relative; */
  width: 80%;
  height: 40px;
  line-height: 40px;
  margin: auto;
  background: #e6903f;
  color: #000000;
  font-weight: bold;
  border-radius: 5px;
  text-transform: capitalize;
  border: none;
  cursor: pointer;
  display: block;
  margin: -10px 45px;
  font-size: 18px;
}
a {
  /* position: relative; */
  font-size: 15px;
  text-align: center;
  display: inline-block;
  text-transform: capitalize;
  color: #504949;
  font-weight: bold;
  padding: 0px 0px 0px 70px;
}
</style>