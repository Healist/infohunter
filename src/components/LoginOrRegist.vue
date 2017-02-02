<template>
  <!-- 这里是页面内容区 -->
  <div>
    <div class="buttons-tab">
      <a href="#tab1" class="tab-link active button">登陆</a>
      <a href="#tab2" class="tab-link button">注册</a>
    </div>
    <div class="content-block">
      <div class="tabs">
        <div id="tab1" class="tab active">
          <div class="content-block">
            <div class="list-block">
              <ul>
                <!-- Text inputs -->
                <li>
                  <div class="item-content">
                    <div class="item-media"><i class="icon icon-form-name"></i></div>
                    <div class="item-inner">
                      <div class="item-title label">昵称</div>
                      <div class="item-input">
                        <input type="text" placeholder="Your name"  v-model="logName">
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="item-content">
                    <div class="item-media"><i class="icon icon-form-password"></i></div>
                    <div class="item-inner">
                      <div class="item-title label">密码</div>
                      <div class="item-input">
                        <input type="password" placeholder="Password" class=""  v-model="logPassword">
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="content-block">
            <div class="row">
              <div class="col-100"><a class="button button-big button-fill button-success" @click="login">登陆</a></div>
            </div>
          </div>
        </div>
        <div id="tab2" class="tab">
          <div class="content-block">
            <div class="list-block">
              <ul>
                <!-- Text inputs -->
                <li>
                  <div class="item-content">
                    <div class="item-media"><i class="icon icon-form-name"></i></div>
                    <div class="item-inner">
                      <div class="item-title label">昵称</div>
                      <div class="item-input">
                        <input type="text" placeholder="Your name" v-model="regName">
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="item-content">
                    <div class="item-media"><i class="icon icon-form-email"></i></div>
                    <div class="item-inner">
                      <div class="item-title label">邮箱</div>
                      <div class="item-input">
                        <input type="email" placeholder="E-mail" v-model="regEmail">
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="item-content">
                    <div class="item-media"><i class="icon icon-form-password"></i></div>
                    <div class="item-inner">
                      <div class="item-title label">密码</div>
                      <div class="item-input">
                        <input type="password" placeholder="Password" class="" v-model="regPassword">
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="item-content">
                    <div class="item-media"><i class="icon icon-form-gender"></i></div>
                    <div class="item-inner">
                      <div class="item-title label">性别</div>
                      <div class="item-input">
                        <select v-model="regSelected">
                          <option>男</option>
                          <option>女</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="content-block">
            <div class="row">
              <div class="col-100"><a class="button button-big button-fill button-success" @click="register">注册</a></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

    export default{
        data(){
            return{
              regSelected: "",
              regPassword: "",
              regName: "",
              regEmail: "",
              logName: "",
              logPassword: ""
            }
        },
        methods:{
          'register': function () {
            //校验数据
            if(this.regName=="" || this.regPassword=="" || this.regSelected=="" || this.regEmail=="") {
              $.toast("字段不允许有空值");
              return;
            }
            $.ajax({
              url: 'http://localhost:8080/user/register',
              data: {
                username: this.regName,
                password: this.regPassword,
                email: this.regEmail,
                sex: this.regSelected
              },
              type: 'POST',
              success: function (data) {
                //console.log(data);
                if(data.code == 100) {
                  $.toast("注册成功，正在自动登陆");
                  //跳转到个人页面
                  this.$router.push({ name: 'userinfo'});
                }
              },
              error: function (xhr, errorType, error) {
                console.log(error);
                $.toast("通信失败");
              }
            })
          },
          'login': function () {
            //校验数据
            var self = this;
            if(this.logName=="" || this.logPassword=="") {
              $.toast("字段不允许有空值");
              return;
            }
            $.ajax({
              url: 'http://localhost:8080/tokens',
              data: {
                username: this.logName,
                password: this.logPassword
              },
              type: 'POST',
              success: function (data) {
                //console.log(data);
                if(data.code == 100) {
                  $.toast("登陆成功");
                  //存储token和username
                  window.localStorage.setItem("token",data.content.token);
                  window.localStorage.setItem("username", self.logName);
                  //console.log(data.content.token);
                  //跳转到个人页面
                  self.$router.replace({ name: 'userinfo'});
                }
              },
              error: function (xhr, errorType, error) {
                console.log(error);
                $.toast("通信失败");
              }
            })
          }
        },
        components:{

        }
    }
</script>
