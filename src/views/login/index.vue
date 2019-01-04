/*
 * @Author: xgw 
 * @Date: 2018-12-24 14:53:09 
 * @Last Modified by:   xgw 
 * @Last Modified time: 2018-12-24 14:53:09 
 */

<template>
  <div class="login-container" :style="imgbg">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <h3 class="title">后台管理系统</h3>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" name="username" type="text" auto-complete="on" placeholder="username" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password" name="password" auto-complete="on" placeholder="password" @keyup.enter.native="handleLogin" />
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
          登陆
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";
export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("请输入正确的用户名"));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error("密码不能小于5位"));
      } else {
        callback();
      }
    };
    return {
      //图片资源
      imgbg: {
        backgroundImage: "url(" + require("@/assets/images/login-bg.jpg") + ")",
        backgroundRepeat: "no-repeat"
      },
      loginForm: {
        username: "admin",
        password: "admin"
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [{ required: true, trigger: "blur", validator: validatePass }]
      },
      loading: false
    };
  },
  methods: {
    handleLogin() {
      this.loading = true;
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = false;
          localStorage.setItem("ms_username", this.loginForm.username);
          this.$router.push("/");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.login-container {
  position: relative;
  width: 100%;
  height: 100%;
  background-size: 100%;
}
.title {
  text-align: center;
  margin-bottom: 30px;
}
.login-form {
  position: absolute;
  top: 300px;
  right: 260px;
  background: #fff;
  padding: 40px;
  width: 300px;
  height: 310px;
  border-radius: 8px;
}
</style>