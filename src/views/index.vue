<template>
    <div class="page">
      <!-- 标题栏 -->
      <header class="bar bar-nav">
        <h1 class="title">招聘会信息</h1>
      </header>

      <navbar :active="active"></navbar>

      <!-- 这里是页面内容区 -->
      <div class="content pull-to-refresh-content infinite-scroll infinite-scroll-bottom" data-ptr-distance="55">
        <!-- 默认的下拉刷新层 -->
        <div class="pull-to-refresh-layer">
          <div class="preloader"></div>
          <div class="pull-to-refresh-arrow"></div>
        </div>
        <div class="content-block">
          <div class="card" v-for="item in data">
            <div class="card-header">{{ item.title }}</div>
            <div class="card-content">
              <div class="card-content-inner">
                <p><b>地点：</b>{{ item.places }}</p>
                <p><b>时间：</b>{{ item.dates }}</p>
              </div>
            </div>
            <div class="card-footer">
              <a class="link po" @click="focus(item.id)" v-show="username=='' || focusList.indexOf(item.id)<0">关注</a>
              <a class="link po" @click="cancelFocus(username, item.id)" v-show="username!='' && focusList.indexOf(item.id)>=0">已关注</a>
              <a :href="item.url" class="link">更多</a>
            </div>
          </div>
        </div>
        <!-- 加载提示符 -->
        <div class="infinite-scroll-preloader">
          <div class="preloader"></div>
        </div>
      </div>
    </div>
</template>

<script>
    import navbar from '../components/navbar.vue'
    export default{
        data(){
            return{
              active: 'advertise',
              username: window.localStorage.getItem("username"),
              token: window.localStorage.getItem("token"),
              hasFocused: [],
              update: false,
              update_cancel: false,
              offset: 0,
              limit: 20,
              loading: false,
              data: ""
            }
        },
        computed: {
          'focusList': function () {
            var arr = [];
            var jsonArr = this.hasFocused;
            $.each(jsonArr,function(index, content){
              var value = content.reportId;
              arr.push(value);
            });
            return arr;
          }
        },
        watch: {
          'update': function (val, oldVal) {
            var self = this;
            if(val == true) {
              //更新操作
              $.ajax({
                url: 'http://localhost:8080/user/focuslist',
                type: 'POST',
                data: {
                  token: window.localStorage.getItem("token"),
                  username: window.localStorage.getItem("username")
                },
                success: function (data) {
                  if(data.code == 100) {
                    //该用户关注的reportId列表
                    self.hasFocused = data.content;
                    self.update = false;
                  }
                },
                error: function (xhr, errorType, error) {
                  console.log(error);
                  $.toast("获取关注列表失败");
                }
              });
            }
          }
        },
        methods: {
          'changeActive': function (value) {
            this.active = value;
          },
          'focus': function (reportId) {
            var self = this;
            $.ajax({
              url: 'http://localhost:8080/user/focus',
              type: 'POST',
              data: {
                token: window.localStorage.getItem("token"),
                username: window.localStorage.getItem("username"),
                reportId: reportId
              },
              success: function (data) {
                if(data.code == 100) {
                  self.update = true;
                }
              },
              error: function (xhr, errorType, error) {
                console.log(error);
                $.toast("关注失败");
              }
            });
          },
          'cancelFocus':function(username, reportId) {
            var self = this;
            $.ajax({
              url: 'http://localhost:8080/user/cancelfocus',
              type: 'POST',
              data: {
                token: window.localStorage.getItem("token"),
                username: window.localStorage.getItem("username"),
                reportId: reportId
              },
              success: function (data) {
                if(data.code == 100) {
                  self.update = true;
                }
              },
              error: function (xhr, errorType, error) {
                console.log(error);
                $.toast("取关失败，服务器开小差了");
              }
            });
          },
          'refresh':function () {
            var self = this;
            $.ajax({
              url: 'http://localhost:8080/user/jobInfo',
              type: 'POST',
              data: {
                offset: this.offset,
                limit: this.limit
              },
              success: function (data) {
                self.data = data;
              },
              error: function (xhr, errorType, error) {
                console.log(error);
                $.toast("刷新失败");
              }
            });
          },
          'infinite': function () {
            var self = this;
            this.offset = this.offset + 5;
            $.ajax({
              url: 'http://localhost:8080/user/jobInfo',
              type: 'POST',
              data: {
                offset: this.offset,
                limit: this.limit
              },
              success: function (data) {
                if(data == self.data) {
                  self.offset = self.offset - 5;
                  // 重置加载flag
                  self.loading = false;
                  return;
                }
                self.data = self.data + data;
                // 重置加载flag
                self.loading = false;
              },
              error: function (xhr, errorType, error) {
                console.log(error);
                $.toast("刷新失败");
                // 重置加载flag
                self.loading = false;
              }
            });
          }
        },
        mounted: function () {
          var self = this;
          $.init();
          //获取json数据
          $.ajax({
            url: 'http://localhost:8080/user/jobInfo',
            type: 'POST',
            data: {
              offset: this.offset,
              limit: this.limit
            },
            success: function (data) {
              self.data = data;
            },
            error: function (xhr, errorType, error) {
              console.log(error);
              $.toast("通信失败");
            }
          });
          //获取focus列表
          if(this.username != "" && this.token != "") {
            $.ajax({
              url: 'http://localhost:8080/user/focuslist',
              type: 'POST',
              data: {
                token: window.localStorage.getItem("token"),
                username: window.localStorage.getItem("username")
              },
              success: function (data) {
                if(data.code == 100) {
                  //该用户关注的reportId列表
                  self.hasFocused = data.content;
                }
              },
              error: function (xhr, errorType, error) {
                console.log(error);
                $.toast("获取关注列表失败");
              }
            });
          }
        },
        created: function () {
          // 添加'refresh'监听器
          var self = this;
          $(document).on('refresh', '.pull-to-refresh-content',(e)=>{
            //显示中间的加载指示器
            $.showIndicator();
            setTimeout(()=>{
              //更新数据操作
              self.refresh();
              // 加载完毕需要重置
              $.pullToRefreshDone('.pull-to-refresh-content');
              $.hideIndicator();
            }, 1500);
          });

//          // 最多可加载的条目
//          var maxItems = 100;
//          var lastIndex = 5;
//          // 注册'infinite'事件处理函数
//          $(document).on('infinite', '.infinite-scroll-bottom',function() {
//
//            // 如果正在加载，则退出
//            if (self.loading) return;
//
//            // 设置flag
//            self.loading = true;
//
//            // 模拟1s的加载过程
//            setTimeout(function() {
//              if (lastIndex >= maxItems) {
//                // 加载完毕，则注销无限加载事件，以防不必要的加载
//                $.detachInfiniteScroll($('.infinite-scroll'));
//                // 删除加载提示符
//                $('.infinite-scroll-preloader').remove();
//                return;
//              }
//
//              // 添加新条目
//              self.infinite();
//              // 更新最后加载的序号
//              lastIndex = $('.list-container li').length;
//              //容器发生改变,如果是js滚动，需要刷新滚动
//              $.refreshScroller();
//            }, 1000);
//          });
        },
        components:{
          navbar
        }
    }
</script>

<style scoped>
  .po {
    cursor: pointer;
  }
</style>
