<template>
    <div class="bg_intro">
        <div class="intro">
            <ul class='info'>
                <li style="margin-top: 0;">
                    <input type="text" id='name' v-model="registerForm.username" placeholder="Usename" @blur="usenameDuplicate">
                </li>
                <li>
                    <input type="email" id='email' v-model="registerForm.email" placeholder="email">
                </li>
                <li>
                    <input type="password" id='password' v-model="registerForm.password" placeholder="password" @input="checkPasswordStrength"
                    >
                    <div
                        :style="`font-size: 12px; color: ${passwordStrength.color}; margin-top: 1px;`"
                    >
                        {{ passwordStrength.message }}
                    </div>
                </li>
                <li>
                    <input type="password" id='SecPass' v-model="registerForm.secPwd" placeholder="enter pwd again" @blur="secpass">
                </li>
                <li>
                    <button id='btn' style="margin: 0 auto; width: 20vw" @click="handleregister" :disabled="isLoading">{{ isLoading ? 'Creating...' : 'confirm' }}</button>
                </li>
                <router-link :to="{ name: 'Login' }"  style="margin: auto">
                    <h style="text-align: center;">Already have an account? Click here to Log In</h>
                </router-link>
            </ul>
        </div>
    </div>
    <router-view></router-view>
</template>

<script>
import axios from "axios";
import { API_BASE_URL } from "@/components/axios";

export default {
  data() {
    return {
      registerForm: {
        username: '',
        email: '',
        password: '',
        secPwd: ''
      },
      isLoading: false,
      passwordStrength: {
        message: '',
        color: 'gray'
      }
    };
  },
  methods: {
    checkPasswordStrength() {
      const { password } = this.registerForm;

      if (password.length === 0) {
        this.passwordStrength = { message: '', color: 'gray' };
        return;
      }

      const weakRegex = /^[a-zA-Z0-9]{1,5}$/; // 弱：仅字母或数字，长度小于6
      const mediumRegex = /^[a-zA-Z0-9]{6,}$/; // 中：字母+数字，长度大于等于6
      const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/; // 强：大小写字母+数字+特殊字符，长度大于等于8

      if (weakRegex.test(password)) {
        this.passwordStrength = { message: '密码强度弱请加强，可添加大小写字母或字符', color: 'red' };
      } else if (mediumRegex.test(password)) {
        this.passwordStrength = { message: '密码强度中', color: 'orange' };
      } else if (strongRegex.test(password)) {
        this.passwordStrength = { message: '密码强度强', color: 'green' };
      } else {
        this.passwordStrength = { message: '密码强度中', color: 'orange' }; // 默认为中等
      }
    },

    // 验证两次密码是否一致
    validatePassword() {
      if (!this.registerForm.password.trim() || !this.registerForm.secPwd.trim() ) {
        this.$message.error('密码不能为空');
        return false;
      }
      if (this.registerForm.password !== this.registerForm.secPwd) {
        this.$message.error('两次输入的密码不一致');
        return false;
      }
      return true;
    },

    // 验证用户名是否为空
    validateUsername() {
      if (!this.registerForm.username.trim()) {
        this.$message.error('用户名不能为空');
        return false;
      }
      return true;
    },

    // 验证邮箱格式
    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.registerForm.email)) {
        this.$message.error('请输入有效的邮箱地址');
        return false;
      }
      return true;
    },

    // 注册方法
    async handleregister() {
      // 验证所有字段
      if (!this.validateUsername() || !this.validateEmail()) {
        return;
      }
      if (!this.validatePassword()) {
        return;
      }

      this.isLoading = true;

      try {
        const response = await axios.post(
            API_BASE_URL+'/api/register', // 替换为你的注册API地址
            {
              assetUserName: this.registerForm.username,
              assetUserEmail: this.registerForm.email,
              assetUserPwd: this.registerForm.password
            },
            {
              headers: {
                'Content-Type': 'application/json'
              }
            }
        );

        if (response.data.success) {
          this.$message.success('注册成功');
          // 注册成功后跳转到登录页面
          this.$router.push({ name: 'Login' });
        } else {
          throw new Error(response.data.message || '注册失败');
        }
      } catch (error) {
        const errorMessage = error.response?.data?.message ||
            error.message ||
            '注册失败，请稍后重试';
        this.$message.error(errorMessage);
        console.error('注册错误:', error);
      } finally {
        this.isLoading = false;
      }
    }

  }
};
</script>


<style scoped>
*{
  padding:0;
  margin:0;
}
li {
    list-style: none;
}
.bg_intro{
   position: fixed;
    /* background: url("../../img/") no-repeat; */
    background-size: cover;
    width: 100%;
    height: 100%;
}
.bg_intro .intro{
  position: relative;
  background: #E2E4E44A;
  border-radius: 20px;
  width:30%;
  height: 65%;
  margin:0 auto;
  margin-top:5%;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center;     /* 垂直居中 */
}
.bg_intro .intro .info{
  position: relative;
  width: 100%;
  /* height: 300px; */
  margin:0;
  padding:0;
}
input[type="text"],
input[type="password"],
input[type="email"],
textarea {
    display: block;
    width: 300px;
    height: 20px;
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
    font-family: 'roboto', sans-serif;
}

::placeholder {
    color: rgba(46, 31, 31, 0.6);
}
#btn {
  /* position: relative; */
  width: 65%;
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
  padding: 0px 0px 0px 20px;
}
</style>