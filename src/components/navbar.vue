<template>
  <!-- 工具栏 -->
  <nav class="bar bar-tab">
    <a class="tab-item external" :class="{ active : active=='advertise' }" @click="advertise">
      <span class="icon icon-home"></span>
      <span class="tab-label">招聘</span>
    </a>
    <!--<a class="tab-item external" :class="{ active : active=='notice' }" @click="notice">-->
      <!--<span class="icon icon-menu"></span>-->
      <!--<span class="tab-label">公告</span>-->
    <!--</a>-->
    <a class="tab-item external" :class="{ active : active=='me' }" @click="me">
      <span class="icon icon-me"></span>
      <span class="tab-label">我</span>
    </a>
  </nav>
</template>

<script>
    export default{
        data(){
            return{
                token:""
            }
        },
        props: ['active'],
        components:{

        },
        methods: {
          advertise: function () {
            this.$emit("changeActive", 'advertise');
            this.$router.push({ name: 'home'});
          },
          notice: function () {
            this.$emit("changeActive", 'notice');
            this.$router.push({ name: 'notice'});
          },
          me: function () {
            var self = this;
            this.$emit("changeActive", 'me');
            //判断用户是否登陆      登陆->userinfo  未登陆->LoginOrRegist
            var token = window.localStorage.getItem("token");
            var username = window.localStorage.getItem("username");
            //console.log(token + "__" + username);
            if(token != null && username != null) {
              this.$router.push({ name: 'userinfo'});
            } else {
              this.$router.push({ name: 'label'});
            }
          }
        },
    }
</script>
