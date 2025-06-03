<template>
    <div class="bg_intro">
      <div class="intro">
        <ul class="info" >
            <img src="../../assets/logo.png" style="height: 90px;"/>
          <li>
            <input type="text" id="name" v-model="usname" placeholder="User Name" @blur="checkusernull"/>
          </li>
          <li>
            <input type="password" id="password" placeholder="Password" @blur="checkpasswordnull"/>
          </li>
          <li>
          <button id="btn" @click="login()" style="margin: 0 auto;width: 20vw ">Login</button>
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
// import useWebSocket from '../../webSocket/websocket';
// import { useRouter } from 'vue-router';
// import {instance} from "@/axios/axios";
export default {
  data(){
    return {
      // usshow: false,
      // passshow: false,
      // passwrong:false,
      input:"",
    //   usname:this.$route.query.username,
    }
  },
  methods:{
//     login() {
//       // let usname = document.getElementById('name').value;
//       let password = document.getElementById('password').value;
//       // this.usshow = (usname == "");
//       // this.passshow = (password == "");
//       if(this.usname=="") this.checkusernull();
//       if(password=="") {
//         setTimeout(()=>{
//           this.checkpasswordnull();
//         },1);
//       }
//       if (this.usname != "" || password != "") {
//         instance.get('/checkAccount', {
//           params: {
//             name: this.usname,
//             password: password,
//           }
//         }).then(res => {
//           if (res.data == "") {
//             setTimeout(()=>{
//               this.$message({
//                 showClose: true,
//                 message: '用户名或密码错误',
//                 type: 'error'
//               });
//             },1);
//           }
//           else {
//             localStorage.setItem('user', JSON.stringify(res.data));
//             this.$router.push({
//               path:'/Home',
//               query: {
//                 accountid: res.data.accountId,
//                 usename: res.data.name,
//                 // projects:res.data.projects
//               }
//             })
//           }
//         }).catch(err => {
//           console.log(err);
//         })
//         //     this.$router.push({
//         //       //name: 'home',
//         //       path:'/',
//         //       query: {
//         //         accountid:1,
//         //         usename:"papa",
//         //       }
//         //     })
//       }
//     },
//     checkusernull(){
//       // let usname = document.getElementById('name').value;
//       if(this.usname==""){
//         this.$message({
//           showClose: true,
//           message: '用户名不能为空',
//           type: 'error'
//         });
//       }
//     },
//     checkpasswordnull(){
//       let password = document.getElementById('password').value;
//       if(password==""){
//         this.$message({
//           showClose: true,
//           message: '密码不能为空',
//           type: 'error'
//         });
//       }
//     }
//   }
//   // setup () {
//   //   const ws = useWebSocket(handleMessage);
//   //   const router = useRouter();
//   //   const login = () => {
//   //     let uname = document.getElementById("name");
//   //     let pw = document.getElementById("password");
//   //     ws.send(JSON.stringify({
//   //       usename: uname,
//   //       password: pw
//   //     }));
//   //   }
//   //   function handleMessage(e) {
//   //     router.push('/');
//   //   }
//   //   return{
//   //     login
//   //   }
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