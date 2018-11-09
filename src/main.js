// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
window.router = router;

import Resource from 'vue-resource'
Vue.use(Resource)
window.resource = Resource;
// console.log(resource("get"))

import i_cookie from './js/i_cookie.js'
Vue.prototype.i_cookie=i_cookie

import sessionStorage from './js/sessionStorage.js'
Vue.prototype.sessionStorage=sessionStorage

import storage from './js/storage.js'
Vue.prototype.storage=storage

import socket from './js/socket.js'
// Vue.use(socket)
Vue.prototype.socket=socket

import Global from './components/Global.vue'
Vue.prototype.Global=Global

/*import axios from 'axios'
Vue.prototype.http = axios*/

// import MintUI from 'mint-ui'
// import 'mint-ui/lib/style.css'
// import './css/my-mint.css'
// Vue.use(MintUI)

// Vue.prototype.MintUI = MintUI;
import './css/style.css'
if(storage.get('user_id') != "undefined" && storage.get('user_id')){
  Global.user_id = storage.get('user_id')
}
//跳转判断
router.beforeEach((to, from, next) => {
  // console.log(from)
  //根据字段判断是否路由过滤
  if (to.meta.auth) {
    if (storage.get('key') > 0) {
      if(from.path == '/msg' && to.path == '/'){
        Global.contentIndex = 0
      }
		  next()
		  return
    } else {
      next({path:'/login'});
      return
    }
  } else {
    next()//若点击的是不需要验证的页面,则进行正常的路由跳转
  }
});

// Vue.http.headers.common['Authorization'] = storage.get('key');  //全局

Vue.http.interceptors.push((request, next) => {
  request.headers.set('Authorization', storage.get('key')); //setting request.headers
    next((response) => {
            return response
    })
})
Vue.prototype.msgName = '1';

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
