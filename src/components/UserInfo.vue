<template>
  <div id="userInfo">
    <div class="userInfoHeader">
      <i class="iconfont icon-left" @click="handleRouter('')"></i>
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
      <template v-if="findUserInfo.type == 1">
        <div class="addUserButton" @click="addApply()">
          添加好友
        </div>
      </template>
      <template v-else-if="findUserInfo.type == 2">
        <template v-if="findUserInfo.status == 0">
          <div class="addUserButton" @click="applyDeal(findUserInfo,1)">
            通过申请
          </div>
          <div class="addUserButton rejectButton" @click="applyDeal(findUserInfo,2)">
            拒绝申请
          </div>
        </template>
        <template v-else>
          <div class="addUserButton" @click="handleRouter(findUserInfo.user_id);">
            发消息
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
// import { Indicator } from 'mint-ui';
export default {
  name: 'userInfo',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      findUserInfo: {},
    }
  },
  props:[''],
  methods:{
    handleRouter(url){
      this.$router.go(-1);
      // router.push({path:'/'+url});
    },
    checkUserInfo:function (user,type) {
        console.log(user)
        this.findUserInfo=user
        this.findUserInfo.type = type
        this.userInfoLeft = 0
    },//查看用户
    applyDeal:function (item,type) {
      this.$http.post('http://192.168.2.52:333/index/apply/applyDeal', {id:item.id,type:type},{emulateJSON:true}).then(msg => {
          console.log(msg);
          if (msg.body.status == 0) {
            alert('添加成功')
            item.status = type
          }else if(msg.body.status == 1000){
            item.status = 1
            layer.msg('已经是好友啦')
          }else{
            alert('添加失败')
          }
        }, response => {
          console.log('error', response)
        })
    },//好友申请处理
    appayList:function () {
      var _this = this
      this.$http.post('http://192.168.2.52:333/index/apply/applyList', {'user_id':1},{emulateJSON:true}).then(msg => {
          console.log(msg);
          if (msg.body.status == 0) {
            _this.findApplyList.wCount = msg.body.data.w_count;
            _this.findApplyList.list = msg.body.data.list;
          }else{
            this.$messagebox.alert(msg.body.msg, 'error');
          }
        }, response => {
          console.log('error', response)
        })
    },//好友申请列表
    addApply:function () {
        var _this = this
        this.$http.post('http://192.168.2.52:333/index/apply/addApply', {'f_user_id':this.findUserInfo.id},{emulateJSON:true}).then(msg => {
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
    findUser:function () {
        var _this = this
        this.$http.post('http://192.168.2.52:333/index/user/getUserInfo', {'username':this.findUserText},{emulateJSON:true}).then(msg => {
          console.log(msg);
          if (msg.body.status == 0) {
            _this.findUserInfo = msg.body.data
          }else{
            this.$messagebox.alert(msg.body.msg, 'error');
          }
        }, response => {
          console.log('error', response)
        })
    },//好友信息
  },
  mounted(){
  },
  updated(){
    console.log(22)

  },
  created:function () {
    this.findUserInfo = router.currentRoute.query
  },
  beforeCreate:function () {

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#userInfo{
    position: absolute;
    top:0;
    z-index: 2;
    background: #eee;
    transition: 0.3s;
    width: 100%;
    height:100vh;
}
.userInfoHeader{
    width:100%;
    height: 2.2rem;
    line-height: 2.2rem;
    background: #36373C;
}
.userInfoHeader i{
    color: #fff;
    font-size: 1rem;
    margin-left: 0.5rem;
}
.userInfoHeader span{
    color: #fff;
    vertical-align: top;
    font-size:0.7rem;
}

#userInfo .userImgName{
    width:100%;
    margin-top: 0.8rem;
    height:3.3rem;
    /*line-height:3.3rem;*/
    background: #fff;
}
#userInfo .userInfoImg{
    display: inline-block;
    height: 100%;
    line-height: 3.3rem;
    margin:0 0.8rem;
}
#userInfo .userInfoImg img{
    width:2rem;
    height:2rem;
    vertical-align: middle;
}
#userInfo .userInfoName{
    display: inline-block;
    height: 100%;
    margin-top:0.5rem;
    vertical-align: top;
}
#userInfo .addUser{
    width:100%;
    height: 1.8rem;
    margin-top: 1rem;
}
#userInfo .addUserButton{
    width:94%;
    height: 100%;
    background: #15c139;
    margin: auto;
    border-radius: 0.1rem;
    color: #fff;
    text-align: center;
    line-height: 1.5rem;
    margin-bottom: 0.5rem;
}

.rejectButton{
    background: #fff !important;
    color:#000 !important;
}
</style>
