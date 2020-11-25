<template>
  <div class="in-wrap">
    <!-- 公共头引入 -->
    <header id="header">
      <section class="container">
        <h1 id="logo">
          <a href="#" title="在线教育">
            <img src="~/assets/img/logo.png" width="100%" alt="在线教育">
          </a>
        </h1>
        <div class="h-r-nsl">
          <ul class="nav">
            <router-link to="/" tag="li" active-class="current" exact>
              <a>首页</a>
            </router-link>
            <router-link to="/course" tag="li" active-class="current">
              <a>课程</a>
            </router-link>
            <router-link to="/teacher" tag="li" active-class="current">
              <a>名师</a>
            </router-link>
            <router-link to="/student" tag="li" active-class="current">
              <a>学生</a>
            </router-link>
            <router-link to="/test" tag="li" active-class="current">
              <a>测试</a>
            </router-link>
          </ul>
          <!-- / nav -->
          <ul class="h-r-login">
              <!-- 判断是否已经登陆，显示不同的东西 -->
              <!-- 还没登陆 -->
              <li v-if="loginInfo.id" id="no-login">
                  <a href="/login" title="登录">
                      <em class="icon18 login-icon">&nbsp;</em>
                      <span class="vam ml5">登录</span>
                  </a>
                  |
                  <a href="/register" title="注册">
                      <span class="vam ml5">注册</span>
                  </a>
              </li>
              <!-- 已经登陆 -->
              <li v-if="!loginInfo.id" id="is-login-one" class="mr10">
                  <a id="headerMsgCountId" href="#" title="消息">
                      <em class="icon18 news-icon">&nbsp;</em>
                  </a>
                  <q class="red-point" style="display: none">&nbsp;</q>
              </li>
              <li v-if="!loginInfo.id" id="is-login-two" class="h-r-user">
                  <a href="javascript:;" title id="username" @mouseenter="enter" @mouseleave="leave">
                      模拟已登陆
                      <!-- <div class="model" @mouseenter="enter" @mouseleave="leave">
                        <span>模拟已登陆</span>
                      </div> -->
                      <!-- <div class="popUp" v-show="seen" @mouseenter="enter" @mouseleave="leave"> -->
                        <!-- <ul id="username_list" v-show="seen" @mouseenter="enter" @mouseleave="leave">
                          <li><p><a href="/student">进入课室</a></p></li>
                          <li><p><a href="/student/info">个人中心</a></p></li>
                        </ul> -->
                      <!-- </div> -->
                      <img
                          :src="loginInfo.avatar"
                          width="30"
                          height="30"
                          class="vam picImg"
                          alt
                          @mouseenter="enter" 
                          @mouseleave="leave">
                      <span id="userName" class="vam disIb">{{ loginInfo.nickname }}</span>
                  </a>
                  <a id="username_list" v-show="seen" @mouseenter="enter" @mouseleave="leave">
                      <li><p><a href="/student/signin">进入课室</a></p></li>
                      <li><p><a href="/student/info">个人中心</a></p></li>
                  </a>
                  <a href="javascript:void(0);" title="退出" @click="logout()" class="ml5">退出</a>
              </li>
            <!-- /未登录显示第1 li；登录后显示第2，3 li -->
          </ul>
          <aside class="h-r-search">
            <form action="#" method="post">
              <label class="h-r-s-box">
                <input type="text" placeholder="输入你想学的课程" name="queryCourse.courseName" value>
                <button type="submit" class="s-btn">
                  <em class="icon18">&nbsp;</em>
                </button>
              </label>
            </form>
          </aside>
        </div>
        <aside class="mw-nav-btn">
          <div class="mw-nav-icon"></div>
        </aside>
        <div class="clear"></div>
      </section>
    </header>
    <!-- /公共头引入 -->
      
    <nuxt/>

    <!-- 公共底引入 -->
    <!-- <footer id="footer">
      <section class="container">
        <div class>
          <h4 class="hLh30">
            <span class="fsize18 f-fM c-999">友情链接</span>
          </h4>
          <ul class="of flink-list">
            <li>
              <a href="http://www.atguigu.com/" title="尚硅谷" target="_blank">尚硅谷</a>
            </li>
          </ul>
          <div class="clear"></div>
        </div>
        <div class="b-foot">
          <section class="fl col-7">
            <section class="mr20">
              <section class="b-f-link">
                <a href="#" title="关于我们" target="_blank">关于我们</a>|
                <a href="#" title="联系我们" target="_blank">联系我们</a>|
                <a href="#" title="帮助中心" target="_blank">帮助中心</a>|
                <a href="#" title="资源下载" target="_blank">资源下载</a>|
                <span>服务热线：010-56253825(北京) 0755-85293825(深圳)</span>
                <span>Email：info@atguigu.com</span>
              </section>
              <section class="b-f-link mt10">
                <span>©2018课程版权均归谷粒学院所有 京ICP备17055252号</span>
              </section>
            </section>
          </section>
          <aside class="fl col-3 tac mt15">
            <section class="gf-tx">
              <span>
                <img src="~/assets/img/wx-icon.png" alt>
              </span>
            </section>
            <section class="gf-tx">
              <span>
                <img src="~/assets/img/wb-icon.png" alt>
              </span>
            </section>
          </aside>
          <div class="clear"></div>
        </div>
      </section>
    </footer> -->
    <!-- /公共底引入 -->
  </div>
</template>
<script>
import "~/assets/css/reset.css";
import "~/assets/css/theme.css";
import "~/assets/css/global.css";
import "~/assets/css/web.css";


/* 引入js-cookie */
import cookie from 'js-cookie'

import loginApi from '@/api/login'

export default {
  data() {
    return {
      seen: false,
      token: '',
      loginInfo: {
        id: '',
        age: '',
        avatar: '',
        mobile: '',
        nickname: '',
        sex: ''
      }

    }

  },

  created(){
    //获取微信登录后,路径里面token值
    this.token = this.$route.query.token
    if(this.token){//判断路径中是否有token值
      this.wxlogin()
    }

    this.showInfo()
  },

  methods: {
    enter() {
      this.seen = true;
    },
    leave() {
      this.seen = false;
    },
    //微信登录显示的方法
    wxlogin(){
      //把token放到cookie里面
      cookie.set("ll_token", this.token, {domain:'localhost'})
      cookie.set("ll_userInfo",  '', {domain: 'localhost'})
      //调用接口,根据token获取用户信息
      loginApi.getLoginUserInfo()
        .then(response => {
          this.loginInfo = response.data.data.userInfo
          cookie.set("ll_userInfo", this.loginInfo, {domain: 'localhost'})
        })
    },

    //创建方法,从cookie获取用户信息
    showInfo(){
      //从cookie获取用户信息
      var userStr = cookie.get('ll_userInfo')
      // 把字符串转换成json对象
      // var str = "{'name':'ll', 'age':20}";
      if(userStr){
        //把字符串转换成json对象
        this.loginInfo = JSON.parse(userStr)
      }
    },

    //退出的方法
    logout(){
      //清空cookie值
      cookie.set("ll_token",  '', {domain: 'localhost'})
      cookie.set("ll_userInfo",  '', {domain: 'localhost'})

      //回到首页面
      window.location.href = "/";
      // this.$router.push({path:'/'}) //不能跳转到本页面
    }

  }

};
</script>



<style>
  #username{
    position: relative;
  }
  #username_list{
    position: absolute;
    background: #fff;
    /*height: 100px;*/
    width: 80px;
    list-style-type:none;
    z-index: 99;
    margin-left: -90px;
    margin-top: 36px;
    /*border: 1px solid;*/
  }
  #username_list>li{
    margin: 8px 0;
  }
</style>