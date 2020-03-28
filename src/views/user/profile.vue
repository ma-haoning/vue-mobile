<template>
  <div class="container">
    <van-nav-bar left-arrow @click-left="$router.back()" title="编辑资料" right-text="保存"  @click-right="saveUser"></van-nav-bar>
    <van-cell-group>
      <van-cell is-link title="头像"  center @click="showPhoto=true">
        <van-image
          slot="default"
          width="1.5rem"
          height="1.5rem"
          fit="cover"
          round
          :src="user.photo"
        />
      </van-cell>
      <van-cell is-link title="名称" :value="user.name" @click="showName=true" />
      <!-- 当user.gender是1的时候 说明是女 如果不是1则是男 -->
      <van-cell is-link title="性别" :value="user.gender===1?'女':'男'" @click="showGender=true" />
      <van-cell is-link title="生日" :value="user.birthday" @click="showBirth"/>
    </van-cell-group>

    <!-- 弹层组件 -->
    <van-popup v-model="showPhoto" style="width:80%">
      <!-- 内容 -->
      <!-- 1 本地相册选择图片 -->
      <!-- 2 拍照 -->
       <input ref="myFile" @change="upload()" type="file" style="display:none">
       <van-cell is-link title="本地相册选择图片" @click="openFileDialog"></van-cell>
       <van-cell is-link title="拍照"></van-cell>
    </van-popup>

     <!-- 弹昵称 -->
    <van-popup v-model="showName" style="width:80%" :close-on-click-overlay='false'>
       <!-- 编辑用户昵称  双向绑定用户的昵称-->
       <van-field v-model.trim="user.name" type='textarea'  rows="4" :error-message="errorNameMessage"></van-field>
       <van-button type="primary" block @click="btn">确认</van-button>
    </van-popup>

      <!-- 弹性别 -->
      <!-- select是action-sheet的一个事件 如果选中执行该函数 -->
    <van-action-sheet :actions="actions" v-model="showGender" cancel-text="取消" @select='selected'></van-action-sheet>

    <van-popup v-model="showBirthDay" position="bottom">
      <!-- 选择出生日期  出生日期应该小于现在时间-->
      <!-- type表示 当前的日期类型 年月日 -->
      <van-datetime-picker
      @confirm="queding"
           v-model="currentDate"
           type="date"
          :min-date="minDate"
          :max-date="maxDate"
         />
    </van-popup>
  </div>
</template>

<script>
import { getUserInfo, updatePhoto, saveUserInfo } from '@/api/user'
import dayjs from 'dayjs'// 引入时间模块
export default {
  name: 'profile',
  data () {
    return {
      errorNameMessage: '', // 昵称错误提示
      showPhoto: false, // 头像的默认弹层状态
      showName: false, // 昵称的默认弹层状态
      showGender: false, // 性别的默认弹层状态
      showBirthDay: false, // 生日的默认弹层状态
      actions: [{ name: '男' }, { name: '女' }], // 性别数据
      minDate: new Date(1900, 1, 1), // 最小时间
      maxDate: new Date(), // 生日最大时间 永远是小于等于当前时间的
      currentDate: new Date(), // 当前时间
      user: {
        // 放置个人资料信息
        name: '', // 用户昵称
        gender: 1, // 性别默认值
        birthday: '1950-10-15', // 生日默认值
        photo: '' // 用户头像
      }

    }
  },
  methods: {
    // name弹层的按钮
    btn () {
      if (this.user.name.length < 1 || this.user.name.length > 7) {
        this.errorNameMessage = '用户昵称的长度应该是1-7的长度要求'
        return // 如果不满足则需要停止此函数的执行
      }
      this.errorNameMessage = ''
      this.showName = false
    },
    selected (item, index) {
      this.user.gender = index// 把当前点击的item的索引给了user.gender 渲染的时候根据user.gender而渲染
      this.showGender = false // 点击结束之后关闭遮罩
    },
    // 点击birthday表格的时候
    showBirth () {
      this.showBirthDay = true// 点击birthday表格先打开遮罩
      this.currentDate = new Date(this.user.birthday)// 只要一点开当前的表格 就把用户的生日给了date小插件的事件  并且转化格式
    },
    // 点击时间插件的确定按钮
    queding () {
      this.user.birthday = dayjs(this.currentDate).format('YYYY-MM-DD')// 把选择的时间转为字符串的格式双向绑定给用户修改的时间
      this.showBirthDay = false// 关闭当前的遮罩
    },
    async getUserInfo () {
      this.user = await getUserInfo()
      console.log(this.user)
    },
    // 打开选择文件的对话框 触发点击input:file的动作
    openFileDialog () {
      this.$refs.myFile.click() // 触发input:file的click事件 触发事件就会弹出文件对话框
    },
    // 修改头像
    async  upload () {
      //  当选择 完头像之后 就可以修改头像
      const data = new FormData()
      data.append('photo', this.$refs.myFile.files[0]) // 第二个参数 是 选择的图片文件 选择图片文件
      const result = await updatePhoto(data) // 上传头像
      this.user.photo = result.photo // 把成功上传的头像地址设置给当前data中的数据
      this.showPhoto = false // 关闭头像弹层
    },
    // 保存用户信息
    async saveUser () {
      try {
        await saveUserInfo(this.user) // 传入user对象
        this.$notify({ type: 'success', message: '保存成功', duration: 500 })
      } catch (error) {
        this.$notify({ message: '保存失败', duration: 500 })
      }
    }
  },
  created () { // 实例结束获取用户的数据
    this.getUserInfo()
  }
}
</script>

<style>

</style>
