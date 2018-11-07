import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Message from '@/components/Message'
import Login from '@/components/Login'
import FindUser from '@/components/FindUser'
import UserInfo from '@/components/UserInfo'
import User from '@/components/User'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      meta:{auth:true,index:0}
    },
    {
      path: '/msg',
      name: 'Message',
      component: Message,
      meta:{auth:true,index:3}
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta:{auth:false}
    },
    {
      path: '/find',
      name: 'FindUser',
      component: FindUser,
      meta:{auth:true,index:1}
    },
    {
      path: '/info',
      name: 'UserInfo',
      component: UserInfo,
      meta:{auth:true,index:2}
    },
    {
      path: '/user',
      name: 'User',
      component: User,
      meta:{auth:true,index:1}
    }
  ]
})
