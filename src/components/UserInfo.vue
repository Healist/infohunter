<template>
  <div>
    <div class="banner">
      <div class="info_title">
        <span style="    position: absolute;margin-left: 40%;font-size: 1.5rem;color: white;">{{ username }}</span>
      </div>
    </div>

    <div class="list-block user-list">
      <ul>
        <li>
          <a class="item-content item-link" @click="personProfile">
            <div class="item-media"><span class="icon icon-star"></sapn></div>
            <div class="item-inner">
              <div class="item-title">个人资料</div>
            </div>
          </a>
        </li>
      </ul>
      <ul>
        <li>
          <a class="item-content item-link"  @click="myFocus">
            <div class="item-media"><span class="icon icon-star"></sapn></div>
            <div class="item-inner">
              <div class="item-title">我的关注</div>
            </div>
          </a>
        </li>
      </ul>
      <ul>
        <li>
          <a class="item-content item-link"  @click="changeEmail">
            <div class="item-media"><span class="icon icon-star"></sapn></div>
            <div class="item-inner">
              <div class="item-title">更改邮箱</div>
            </div>
          </a>
        </li>
      </ul>
      <ul>
        <li>
          <a class="item-content item-link"  @click="changeSubject">
            <div class="item-media"><span class="icon icon-star"></sapn></div>
            <div class="item-inner">
              <div class="item-title">更换主题</div>
            </div>
          </a>
        </li>
      </ul>
      <ul>
        <li>
          <a class="item-content item-link"  @click="quit">
            <div class="item-media"><span class="icon icon-star"></sapn></div>
            <div class="item-inner">
              <div class="item-title">退出登陆</div>
            </div>
          </a>
        </li>
      </ul>
      <br>
    </div>
  </div>
</template>

<script>
    export default{
        data(){
            return{
                username: window.localStorage.getItem("username")
            }
        },
        methods: {
          'personProfile': function () {
            let name = window.localStorage.getItem("username");
            this.$router.push({name: 'profile', params: { username: name }});
          },
          'myFocus': function () {

          },
          'changeEmail': function () {

          },
          'changeSubject': function () {

          },
          'quit': function () {
            window.localStorage.setItem("username", "");
            window.localStorage.setItem("token", "");
            this.$router.replace({name:'label'});
          }
        },
        components:{

        }
    }
</script>

<style scoped>
  .banner {
    width: 100%;
    background-color: #fff;
    padding: 12.7999992px;
  }
  .info_title {
    background-color: #ed8e07;
    border-radius: 10px;
    width: 100%;
    height: 110px;
    padding: 20.2666654px 21.333332px 5.333333px;
    box-shadow: 0 0 .8rem rgba(0,0,0,.3);
  }
</style>
