<template>
    <div id="aCoursesList" class="bg-fa of">
        <section class="container">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="进入教室" name="first">
              <el-row>
                <el-button type="primary" round @click="signin()">签到</el-button>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="课程管理" name="second">课程管理</el-tab-pane>
            <el-tab-pane label="课室管理" name="third">课室管理</el-tab-pane>
            <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
          </el-tabs>
        </section>
    </div>
</template>


<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        activeName: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      signin(){
        axios({
          url:'http://localhost:3000/',
          methods:'post'
        })
        .then(response => {//请求成功
          if (response.data==0) {
            alert('000');
          } else {
            alert('111');
          }
        })
      }
    }
  };
</script>



<style>
</style>