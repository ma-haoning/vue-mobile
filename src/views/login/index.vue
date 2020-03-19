<template>
    <div class='container'>
    <!-- 导航 显示返回箭头-->
    <!-- click-left点击左侧事件 -->
    <!-- $router.go(-1) $router.back() -->
    <van-nav-bar title='登录'  left-arrow @click-left="$router.back()"></van-nav-bar>
    <!-- 登录布局 -->
    <!-- 外层需要用cell-group组件来包裹提供 边框 -->
    <van-cell-group>
        <!-- 登录手机号 -->
          <van-field label="手机号"  placeholder="请输入手机号" v-model.trim="loginForm.mobile" @blur="validateMible" :error-message="validateError.mobile"></van-field>
        <!-- 验证码 -->
          <van-field label="验证码"  placeholder="请输入验证码" v-model.trim="loginForm.code" @blur="validateCode" :error-message="validateError.code">
            <!-- 插槽内容 -->
              <van-button slot="button" size="small" type="primary">发送验证码</van-button>
          </van-field>
    </van-cell-group>
    <!-- 登录按钮 -->
    <div class='login-box'>
      <van-button type="info" round size="small" block @click="login">登录</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        mobile: '', // 手机号
        code: ''// 密码
      },
      validateError: {
        mobile: '', // 校验手机号错误的信息
        code: ''// 校验验证码错误的信息
      }
    }
  },
  methods: {
    // 校验手机号
    validateMible () {
      if (!this.loginForm.mobile) {
        this.validateError.mobile = '手机号不能为空'
        return false // 说明验证失败
      }
      if (!/^1[3-9]\d{9}$/.test(this.loginForm.mobile)) {
        this.validateError.mobile = '手机号格式不正确'
        return false
      }
      // 如果验证成功了 让提示消息为空
      this.validateError.mobile = ''
      return true // true 说明验证校验成功
    },
    // 校验验证码
    validateCode () {
      if (!this.loginForm.code) {
        this.validateError.code = '验证码不能为空'
        return false
      }
      if (!/^\d{6}$/.test(this.loginForm.code)) {
        this.validateError.code = '验证码格式不正确'
        return false
      }
      this.validateError.code = '' // 如果验证正确  直接清空错误信息
      return true // true 验证校验成功
    },
    // 登录按钮
    login () {
      const valiMobile = this.validateMible()
      const valiCode = this.validateCode()
      if (valiMobile && valiCode) { // 当前的valiMobile和valiCode是存在的  才会就去分支
        // console.log('手动校验')
      }
    }
  }
}
</script>

<style>
.login-box {
  padding: 20px
}
</style>
