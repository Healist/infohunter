<template>
    <div>
      <header class="bar bar-nav">
        <a class="icon icon-left pull-left" @click="back"></a>
        <h1 class="title">个人资料</h1>
      </header>
      <div class="content">
        <div class="content-block-title">个人资料</div>
        <div class="list-block">
          <ul>
            <li class="item-content">
              <div class="item-inner">
                <div class="item-title">用户昵称</div>
                <div class="item-after">{{ user.username }}</div>
              </div>
            </li>
            <li class="item-content">
              <div class="item-inner">
                <div class="item-title">用户邮箱</div>
                <div class="item-after">{{ user.email }}</div>
              </div>
            </li>
            <li class="item-content">
              <div class="item-inner">
                <div class="item-title">用户性别</div>
                <div class="item-after">{{ user.sex }}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                username:this.$route.params.username,
                user: ""
            }
        },
        methods: {
          'back': function () {
            this.$router.go(-1);
          }
        },
        mounted: function () {
          //$.toast("通信失败");
          var self = this;
          $.ajax({
            url: 'http://localhost:8080/user/userInfo',
            type: 'POST',
            data: {
              username:self.username,
              token: window.localStorage.getItem("token")
            },
            success: function (data) {
              //console.log(data);
              if(data.code == 100) {
                //存储token和username
                self.user = data.content;
              }
            },
            error: function (xhr, errorType, error) {
              console.log(error);
              $.toast("登陆已经过期，请重新登陆");
              window.localStorage.setItem("username", "");
              window.localStorage.setItem("token", "");
              self.$router.replace({name:'label'});
            }
          })
        },
        components:{

        }
    }
</script>
