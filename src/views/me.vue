<template>
  <div>
    <!-- 标题栏 -->
    <header class="bar bar-nav">
      <h1 class="title">个人主页</h1>
    </header>

    <!-- 工具栏 -->
    <navbar :active="active"></navbar>

    <div class="content">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
  import navbar from '../components/navbar.vue'
  import LoginOrRegist from '../components/LoginOrRegist.vue'
    export default{
        data(){
            return{
                active:'me'
            }
        },

        mounted: function () {
          //判断用户是否登陆      登陆->userinfo  未登陆->LoginOrRegist
          var token = window.localStorage.getItem("token");
          var username = window.localStorage.getItem("username");
          if(token != null && username != null) {
            this.$router.replace({ name: 'userinfo'});
          } else {
            this.$router.replace({ name: 'label'});
          }
        },
        components:{
          navbar,
          LoginOrRegist
        },
        methods: {
          'changeActive': function (value) {
            this.active = value;
          }
        }
    }
</script>
