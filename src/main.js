// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'

Vue.use(VueRouter);
//Vue.directive('pullToRefresh', pullToRefresh);

const routes = [
  {
    path: '/',
    name: 'home',
    component : resolve => require(['./views/index.vue'], resolve)
  },
  {
    path: '/notice',
    name: 'notice',
    component: resolve => require(['./views/notice.vue'], resolve)
  },
  {
    path: '/self',
    name: 'me',
    component: resolve => require(['./views/me.vue'], resolve),
    children: [
      {
        name: "userinfo",
        path: 'info',
        component: resolve => require(['./components/UserInfo.vue'], resolve),
      },
      {
        name: "label",
        path: 'label',
        component: resolve => require(['./components/LoginOrRegist.vue'], resolve),
      }
    ]
  },
  {
    path:'/profile/:username',
    name: 'profile',
    component: resolve => require(['./views/profile.vue'], resolve),
  }
];

const router = new VueRouter({
  routes
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  template: '<App/>',
  components: { App }
});
