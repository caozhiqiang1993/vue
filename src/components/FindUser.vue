<template>
  <div id="findUser" v-loading="loading_q">
    <div class="findUserHeader">
      <i class="iconfont icon-left" @click="handleRouter('')"></i>
      <span>添加好友</span>
    </div>
    <div class="findUserButton">
      <i></i><input type="text" placeholder="用户名" v-model="findUserText"><span @click="findUser()">搜索</span>
    </div>
    <div class="applyTest">
      <span>新的好友</span>
    </div>
    <div class="applyList" v-loading="loading">
      <ul>
        <li v-for="item in findApplyList" @click="checkUserInfo(item,2)">
          <div class="img_box">
            <span>
              <img :src="item.img">
            </span>
          </div>
          <div class="info_box">
            <span v-text="item.user_name"></span>
            <p v-text="item.memo" v-if="item.fuid == user_id"></p>
            <p v-else>已发送验证消息</p>
          </div>
          <div class="info_botton">
            <span v-if="item.status == 0 && item.fuid == user_id" @click.stop="applyDeal(item,1)" class="botton_color">接受</span>
            <span v-else-if="item.status == 0 && item.fuid != user_id">待验证</span>
            <span v-else-if="item.status == 1">已接受</span>
            <span v-else-if="item.status == 2">已拒绝</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import { Indicator } from 'mint-ui';
export default {
  name: 'findUser',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      user_id: this.Global.user_id,
      findUserText: '',
      findApplyList: {},
      findUserInfo: {},
      loading: false,
      loading_q: false,
    }
  },
  props:[''],
  methods:{
    handleRouter(url,data){
      router.push({path:'/'+url,query:data});
    },
    checkUserInfo:function (user,type) {
        this.findUserInfo=user
        if(type == 2 && user.fuid != this.user_id){
          type = 1
        }
        this.findUserInfo.type = type
        // this.findUserInfo.user_id = this.findUserInfo.id
        this.handleRouter('info',this.findUserInfo)
    },//查看用户
    applyDeal:function (item,type) {
      this.$http.post(this.Global.apiUrl+'/index/apply/applyDeal', {id:item.id,type:type},{emulateJSON:true}).then(msg => {
          console.log(msg);
          if (msg.body.status == 0) {
            if(type ==1){
              alert('添加成功')
            }else{
              alert('已拒绝')
            }
            item.status = type
          }else if(msg.body.status == 1000){
            item.status = 1
            alert('已经是好友啦')
          }else{
            console.log('添加失败')
          }
        }, response => {
          console.log('error', response)
        })
    },//好友申请处理
    appayList:function () {
      this.loading = true
      var _this = this
      this.$http.post(this.Global.apiUrl+'/index/apply/applyList', {'user_id':this.Global.user_id},{emulateJSON:true}).then(msg => {
          this.loading = false
          if (msg.body.status == 0) {
            _this.findApplyList = msg.body.data.list;
          }else{
            console.log(msg.body.msg, 'error');
          }
        }, response => {
          this.loading_q = false
          console.log('error', response)
        })
    },//好友申请列表
    findUser:function () {
        this.loading_q = true
        var _this = this
        this.$http.post(this.Global.apiUrl+'/index/user/getUserInfo', {user_id:this.Global.user_id,'username':this.findUserText},{emulateJSON:true}).then(msg => {
          this.loading_q = false
          if (msg.body.status == 0) {
            msg.body.data.user_id = msg.body.data.id
            _this.checkUserInfo(msg.body.data,1);
          }else{
            alert('用户不存在');
          }
        }, response => {
          this.loading_q = false
          console.log('error', response)
        })
    },//好友信息
  },
  mounted(){
    this.appayList();
  },
  updated(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#findUser{
    position: absolute;
    top:0;
    z-index: 1;
    background: #eee;
    transition: 0.3s;
    width: 100%;
    height:100vh;
}
#findUser .findUserButton{
    line-height: 2rem;
    background: #fff;
    margin-top: 0.8rem;
    border-radius: 0.6rem;
}
#findUser .findUserButton i{
    display: inline-block;
    width:2rem;
}
#findUser .findUserButton input{
    border: none;
    outline: none;
}
#findUser .findUserButton span{

    float: right;
    padding: 0 0.8rem;
}
#findUser .findUserHeader{
    width:100%;
    height: 2.2rem;
    line-height: 2.2rem;
    background: #36373C;
}
#findUser .findUserHeader i{
    color: #fff;
    font-size: 1rem;
    margin-left: 0.5rem;
}
#findUser .findUserHeader span{
    color: #fff;
    vertical-align: top;
    font-size:0.7rem;
}

#findUser .applyTest{
    margin: 0.6rem 0 0.2rem 0.4rem;
}

#findUser .applyList{
    background: #fff;
    height: calc(100vh - 2.2rem - 2.8rem - 1.2rem);
    /*height: 100%;*/
    overflow-y: scroll;
}
#findUser .applyList .info_botton{
    position: absolute;
    height:100%;
    line-height: 2.5rem;
    display: inline-block;
    text-align: center;
    width: 3rem;
}
#findUser .applyList .info_botton span{
    padding: 0.2rem 0.5rem;
    border-radius: 0.1rem;
    color: #999;
}
.botton_color{
    color: #fff !important;
    background: #15c139 !important;
}
#findUser .applyList .img_box{
      display: inline-block;
    height: 100%;
    margin: 0 0.5rem;
}
#findUser .applyList .info_box{
    width: calc(100vw - 2.5rem - 3rem);
    display: inline-block;
    vertical-align: top;
}
#findUser .applyList .info_box span{
    display: inline-block;
    margin: 0.3rem 0;
}
#findUser .applyList .info_box p{
      color: #999;
}
#findUser .applyList p{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
#findUser .applyList ul li{
    height: 2.5rem;
    min-height: 2.5rem;
    margin-bottom: 0.5rem;
    position: relative;
    border-bottom: 1px solid #eee;
}
#findUser .applyList .img_box span{
    display: flex;
    height: 100%;
    width: 1.5rem;
    align-items: center;
}
#findUser .applyList img{
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
}
</style>
