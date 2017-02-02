<template>
  <div>
    <!-- 标题栏 -->
    <header class="bar bar-nav">
      <h1 class="title">校公告信息</h1>
    </header>

    <!-- 工具栏 -->
    <navbar :active="active"></navbar>

    <div class="content infinite-scroll infinite-scroll-bottom" data-distance="120">
      <div class="list-block">
        <ul class="list-container">
          <li class="item-content item-link" v-for="item in num" style="margin-bottom:5px;">
            <div>
              <h2>关于召开寒假工作研讨会的通知</h2>
            </div>
          </li>
        </ul>
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
              active:'notice',
              num: 20,
              data: ""
            }
        },
        mounted: function () {
          //获取json数据  20条
          var self = this;
//          $.ajax({
//            url: 'http://localhost:8080/user/jobInfo',
//            type: 'POST',
//            success: function (data) {
//              self.data = data;
//            },
//            error: function (xhr, errorType, error) {
//              console.log(error);
//              $.toast("通信失败");
//            }
//          })
        },
        created: function () {
          // 加载flag
          var loading = false;
          // 最多可加载的条目
          var maxItems = 200;
          var lastIndex = 20;
          var offset = 20; //偏移量 初次默认已经更新为20
          var limit = 20; //每次更新的条数

          $(document).on('infinite', '.infinite-scroll-bottom',function() {

            // 如果正在加载，则退出
            if (loading) return;

            // 设置flag
            loading = true;

            // 模拟1s的加载过程
            setTimeout(function() {
              // 重置加载flag
              loading = false;

              if (lastIndex >= maxItems) {
                // 加载完毕，则注销无限加载事件，以防不必要的加载
                $.detachInfiniteScroll($('.infinite-scroll'));
                // 删除加载提示符
                $('.infinite-scroll-preloader').remove();
                return;
              }
              // 添加新条目
              this.newsRefresh(offset, limit);
              num = num + 20;
              alert(num);
              offset = offset + 1;
              // 更新最后加载的序号
              lastIndex = $('.list-container li').length;
              //容器发生改变,如果是js滚动，需要刷新滚动
              $.refreshScroller();
            }, 1000);
          });
        },
        methods: {
          'changeActive': function (value) {
            this.active = value;
          },
          'newsRefresh':function (offset, limit) {
            var self = this;
//            $.ajax({
//              url: 'http://localhost:8080/user/jobInfo',
//              type: 'POST',
//              success: function (data) {
//                self.data = data;
//              },
//              error: function (xhr, errorType, error) {
//                console.log(error);
//              }
//            });
          }
        },
        components:{
          navbar
        }
    }
</script>
