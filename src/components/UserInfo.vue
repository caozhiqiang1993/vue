<template>
  <div id="userInfo">
    <div class="userInfoHeader">
      <i class="iconfont icon-left" @click="backHandleRouter()"></i>
      <span>好友资料</span>
    </div>
    <div class="userImgName">
      <div class="userInfoImg">
        <img :src="findUserInfo.img">
      </div>
      <div class="userInfoName">
        <p v-text="findUserInfo.user_name"></p>
      </div>
    </div>
    <div class="addUser">
      <template v-if="friendsList[findUserInfo.user_id] == undefined">
        <div class="addUserButton" @click="addApply()">
          添加好友
        </div>
      </template>
      <template v-else>
        <template v-if="findUserInfo.status == 0">
          <div class="addUserButton" @click="applyDeal(findUserInfo,1)">
            通过申请
          </div>
          <div class="addUserButton rejectButton" @click="applyDeal(findUserInfo,2)">
            拒绝申请
          </div>
        </template>
        <template v-else>
          <div class="addUserButton" @click="sendMsg(findUserInfo.user_id)">
            发消息
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
import './../css/UserInfo.css'
// import { Indicator } from 'mint-ui';
export default {
  name: 'userInfo',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      findUserInfo: {},
    }
  },
  props: ['friendsList'],
  methods:{
    backHandleRouter(url){
      this.$router.go(-1);
    },
    handleRouter(url,data){
      router.push({path:'/'+url,query:{0:data}});
    },
    sendMsg(user_id){
      this.Global.msg_friend = user_id
      router.push({path:'/msg'});
    },
    checkUserInfo:function (user,type) {
        console.log(user)
        this.findUserInfo=user
        this.findUserInfo.type = type
    },//查看用户
    addApply:function () {
        var _this = this
        this.$http.post(this.Global.apiUrl+'/index/apply/addApply', {'f_user_id':this.findUserInfo.id},{emulateJSON:true}).then(msg => {
          console.log(msg);
          if (msg.body.status == 0) {
            alert('申请成功')
            _this.handleRouter('find')
          }else{
            this.$messagebox.alert(msg.body.msg, 'error');
          }
        }, response => {
          console.log('error', response)
        })
    },//申请添加好友
    findUserApplyDeal(item,type){
      this.$emit('findUserApplyDeal',{item:item,type:type})
    }
  },
  mounted(){
    this.findUserInfo = router.currentRoute.query
  },
  updated(){

  },
  created:function () {
  },
  beforeCreate:function () {

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
