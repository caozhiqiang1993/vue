<template>
  <div id="findUser">
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
    <div class="applyList">
      <ul>
        <li v-for="item in findApplyList.list" @click="checkUserInfo(item,2)">
          <div class="img_box">
            <span><img :src="item.img"></span>
          </div>
          <div class="info_box">
            <span v-text="item.user_name"></span>
            <p v-text="item.memo"></p>
          </div>
          <div class="info_botton">
            <span v-if="item.status == 0" @click.stop="applyDeal(item,1)" class="botton_color">接受</span>
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
      findUserText: '',
      findApplyList: [],
      findUserInfo: {},
    }
  },
  props:[''],
  methods:{
    handleRouter(url,data){
      router.push({path:'/'+url,query:data});
    },
    checkUserInfo:function (user,type) {
        console.log(user)
        this.findUserInfo=user
        this.findUserInfo.type = type
        this.userInfoLeft = 0
    },//查看用户
    applyDeal:function (item,type) {
        var msg = layer.load(2, {time: 10*1000}); //又换了种风格，并且设定最长等待10秒
        $.ajax({
            type:"POST",
            url:"/index/apply/applyDeal",
            data:{id:item.id,type:type},
            error: function() {
//                window.location.reload();
            },
            success: function(result){
                layer.close(msg);
                if(result.status == 0){
                    item.status = type
                    layer.msg('添加成功')
                }else if(result.status == 1000){
                    item.status = 1
                    layer.msg('已经是好友啦')
                }else{
                    layer.msg('添加失败')
                }
            }
        });
    },//好友申请处理
    appayList:function () {
      var _this = this
      if(this.findUserLeft == 100){
          this.findUserLeft = 0
          var msg = layer.load(2, {time: 10*1000}); //又换了种风格，并且设定最长等待10秒
          $.ajax({
              type:"POST",
              url:"/index/apply/applyList",
              data:{},
              error: function() {
//                window.location.reload();
              },
              success: function(result){
                  layer.close(msg);
                  if(result.status == 0){
                      _this.findApplyList.wCount = result.data.w_count;
                      _this.findApplyList.list = result.data.list;
                  }else{
                      layer.msg('添加失败')
                  }
              }
          });
      }else{
          this.findUserLeft = 100
      }
    },//好友申请列表
    addApply:function () {
        var _this = this
        var msg = layer.load(2, {time: 10*1000}); //又换了种风格，并且设定最长等待10秒
        $.ajax({
            type:"POST",
            url:"/index/apply/addApply",
            data:{'f_user_id':_this.findUserInfo.id},
            error: function() {
//                window.location.reload();
            },
            success: function(result){
                layer.close(msg);
                if(result.status == 0){
                    layer.msg('申请成功')
                    _this.userInfoLeft = 100
                }else{
                    layer.msg('申请失败')
                }
            }
        });
    },//申请添加好友
    findUser:function () {
        var _this = this
        this.$http.post('http://192.168.2.52:333/index/user/getUserInfo', {user_id:this.Global.user_id,'username':this.findUserText},{emulateJSON:true}).then(msg => {
          if (msg.body.status == 0) {
            _this.findUserInfo = msg.body.data
            _this.findUserInfo.type=1
            _this.handleRouter('info',_this.findUserInfo)
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
#findUser .applyList .info_box{
    width: calc(100vw - 2.5rem - 3rem);
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
