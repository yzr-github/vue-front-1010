  // <!-- 缩小窗口后,侧边栏收缩菜单 -->
// var test_html = function (){
//         function BeautifyMenu() {
//             /**
//              * 侧边栏展开美化效果。
//              * 展开菜单时，延迟显示侧边栏。
//              * 否则侧边栏错位情况严重
//              * */
//             $('#left-menu>ul').hide();
//             setTimeout(function () {
//                     $('#left-menu>ul').fadeIn(400);
//             }, 100);
//         }
     
//         var initSidebarToggle = function () {
//             /**
//              * 侧边栏收缩切换器
//              * */
//             $("#sidebarToggle").click(function (e) {
//                 //动画效果 animate 有空再添加。
//                 e.preventDefault();
//                 $("body").toggleClass("mini-sidebar");
//                 BeautifyMenu();
//             })
//         };
     
//         var initResizeWindows = function () {
//             /**
//              * 初始化页面样式
//              * 注册resize监听，判断浏览器宽度，调整页面样式。
//              * */
//             $(window).resize(function () {
//                 if ($(window).width() < 769) {
//                     $('body').addClass('body-small mini-sidebar');
//                 } else {
//                     $('body').removeClass('body-small');
//                     // $('#sidebarToggle').hide();
//                 }
//             });
//             $(window).resize();
//         };
     
//         return {
//             init:function () {
//                 initSidebarToggle();
//                 initResizeWindows();
//             }
//         }
//     }();
     
//     $(document).ready(function () {
//         test_html.init();
//     });

    // $(function(){
        $("#classroom").click(function(){
          //发送ajax请求
          $.ajax({
            url:"",
            type:"POST",
            dataType:"JSON",
            success:function(data){ //0 1
              //显示结果
              if(data==0){
                alert("进入课室失败，该时间不是上课时间！");
              }else if(data==1){//成功后把模态框显示出来
                alert("进入课室成功！");
                $("#myModal").modal("show");//显示模态框
              }
            }
          });
        });
      // });


      // $(function(){
        //签到
        $("#signin").click(function(){
          //发送ajax请求
          $.ajax({
            url:"",
            type:"POST",
            dataType:"JSON",
            success:function(data){ //0 1 2
              //显示签到的结果
              if(data==0){
                // $("#result").html("签到失败");
                alert("签到失败！");
              }else if(data==1){
                alert("签到成功！");
                window.location = "ChatBox";//签到成功后跳转
              }else {
                // $("#result").html("已经签到，不能重复签到");
                alert("已经签到，不能重复签到！");
              }
            }
          });
        });
      // });


      // $(function(){
        $("#exit").click(function(){
          //发送ajax请求
          $.ajax({
            url:"",
            type:"POST",
            dataType:"JSON",
            success:function(data){ //0 1 
              //显示签到的结果
              if(data==1){
                alert("退出成功！");
                window.location = "/";
              }else {
                alert("退出失败！");
              }
            }
          });
        });
      // });