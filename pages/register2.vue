<template>
  <div class="main">
    <div class="title">
      <a href="/login">登录</a>
      <span>·</span>
      <a class="active" href="/register">注册</a>
    </div>

    <div class="sign-up-container">
        <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="活动名称">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="活动区域">
    <el-select v-model="form.region" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="活动时间">
    <el-col :span="11">
      <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
    <el-col :span="11">
      <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
    </el-col>
  </el-form-item>

   <!-- 所属分类 TODO -->
      <el-form-item label="课程分类">
        <el-select
          v-model="courseInfo.subjectParentId"
          placeholder="年份"
          @change="subjectLevelOneChanged">

          <el-option
            v-for="subject in subjectOneList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"/>
        </el-select>

        <!-- 二级分类 -->
        <el-select v-model="courseInfo.subjectId" placeholder="系别">
          <el-option
            v-for="subject in subjectTwoList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"/>
        </el-select>

        <!-- 三级分类 -->
        <el-select v-model="courseInfo.subjectId" placeholder="班级">
          <el-option
            v-for="subject in subjectTwoList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"/>
        </el-select>
      </el-form-item>

  <el-form-item label="活动形式">
    <el-input type="textarea" v-model="form.desc"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">注册</el-button>
    
  </el-form-item>
</el-form>
    </div>
  </div>
</template>

<script>
  import '~/assets/css/sign.css'
  import '~/assets/css/iconfont.css'

  import registerApi from '@/api/register'

  export default {
    layout: 'sign',

    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        courseInfo: {
        title: '',
        subjectId: '', // 二级分类id
        subjectParentId: '', // 一级分类id
        teacherId: '',
        lessonNum: 0,
        description: '',
        cover: 'https://edu-526.oss-cn-shenzhen.aliyuncs.com/2020/10/27/01.jpg',
        price: 0
      },
      courseId: '',
      BASE_API: process.env.BASE_API,
      teacherList: [], // 封装所有讲师数据
      subjectOneList: [], // 一级分类
      subjectTwoList: [], // 二级分类

        params: { //封装注册输入数据
          mobile: '', //手机号
          code: '',  //验证码
          nickname: '', //昵称
          password: '' //密码
        },
        sending: true,      //是否发送验证码
        second: 60,        //倒计时间
        codeTest: '获取验证码'
      }
    },

    methods: {
      //注册提交的方法
      submitRegister(){
        registerApi.registerMember(this.params)
          .then(response => {
            //提示
              this.$message({
                type: 'success',
                message: "注册成功"
              })

            //跳转登录页面
            this.$router.push({path:'/login'})
          })
          .catch(error => { // 请求失败
          //提示
              this.$message({
                type: 'success',
                message: "注册失败"
              })
          })

      },

      //通过输入手机号发送验证码
      getCodeFun(){
        registerApi.sendCode(this.params.mobile) 
          .then(response => {
            //是否发送
            this.sending = false
            //调用倒计时方法
            this.timeDown()
          })
      },

      //倒计时
       timeDown() {
        //setInterval 定时器 每隔1000毫秒执行一次
        let result = setInterval(() => {
          --this.second; //每一次减一
          this.codeTest = this.second
          if (this.second < 1) {
            clearInterval(result);
            this.sending = true;
            //this.disabled = false;
            this.second = 60;
            this.codeTest = "获取验证码"
          }
        }, 1000);
       },

        checkPhone (rule, value, callback) {
        //debugger
        if (!(/^1[345678]\d{9}$/.test(value))) {
          return callback(new Error('手机号码格式不正确'))
        }
        return callback()
      },
      // 点击某个一级分类,触发change,显示对应二级分类
    subjectLevelOneChanged(value) {
      console.log('subjectLevelOneChanged value: ' + value)
      // value就是一级分类id值
      // 遍历所有分类,里面包含一级和二级
      for (var i = 0; i < this.subjectOneList.length; i++) {
        // 每个一级分类
        var oneSubject = this.subjectOneList[i]
        // 判断: 所有一级分类的id 和 点击一级分类id 是否一样
        if (value === oneSubject.id) {
          // 从一级分类获取所有二级分类
          this.subjectTwoList = oneSubject.children
          // 把二级分类id值清空
          this.courseInfo.subjectId = ''
        }
      }
    },
    }
  }
</script>
