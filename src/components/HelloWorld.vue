<template>
  <div class="hello">
    <div id="header">
      <p>
        <span>
          {{title}}
        </span>
      </p>
    </div>
    <div style="height: 2.2rem;"></div>

    <div id="content">
      <!-- 聊天记录列表start -->
      <div id="chat_log" v-show="contentIndex == 0">
        <ul>
            <li v-for="item,key in userHistory" v-if="friendsList[item.fuid] != undefined" @click="sendMsg(item)">
              <div class="img_box">
                <span><img :src="friendsList[item.fuid].img"></span>
                <div class="jiaobiao" v-show="item.num > 0" v-text="item.num"></div>
              </div>
              <div class="info_box">
                <span v-text="friendsList[item.fuid].user_name"></span>
                <p v-text="item.msg" class="oneRow"></p>
              </div>
            </li>
        </ul>
      </div>
      <!-- 聊天记录列表end -->

      <!-- 好友列表start -->
      <div id="friends" v-show="contentIndex == 1">
        <ul class="friends_h">
          <template v-for="item,index in friendsHeader">
            <li v-if="index == 0" @click="handleRouter('find')">
              <div class="fh_img 2">
                <i :class="item.iconName"></i>
              </div>
              <div class="fh_text">
                <span v-text="item.text"></span>
                <div v-show="item.num > 0" class="jiaobiao xiaojiaobiao"></div>
              </div>
            </li>
            <li v-else>
              <div class="fh_img">
                <i :class="item.iconName"></i>
              </div>
              <div class="fh_text">
                <span v-text="item.text"></span>
              </div>
            </li>

          </template>
        </ul>

        <ul class="friends_f">
          <li v-for="item,index in groupingFriendList">
            <h5 @click="item.show = !item.show">
              <i class="iconfont icon-htbarrowright02" :class="{rotate90 : item.show}"></i>
              <span v-text="item.name"></span>
              <em>
                (<span v-text="item.num"></span>)
              </em>
            </h5>
            <ul class="friends_info" v-show="item.show">
              <template v-for="user,key in item.users">
                <li v-show="user.user_id != user_id" @click="handleRouter('info',user)" :class="{'gray':user.isOnline==0}">
                  <div class="friends_img_box">
                    <span><img :src="user.img"></span>
                  </div>
                  <div class="friends_info_box">
                    <span v-text="user.user_name"></span>
                    <p class="oneRow">
                      <template v-if="user.isOnline == 1">[在线]</template>
                      <template v-else>[离线]</template>
                      {{user.explain}}
                    </p>
                  </div>
                </li>
              </template>
            </ul>
          </li>
        </ul>
      </div>
      <!-- 好友列表end -->

      <!-- 更多start -->
      <div id="more" v-show="contentIndex == 2">
        <ul>
          <template v-for="item,key in more">
            <li v-if="key == 0" @click="handleRouter('user')">
              <div class="more_img">
                <i :class="item.icon"></i>
              </div>
              <div class="more_text">
                <span v-text="item.name"></span>
              </div>
            </li>
            <li v-else>
              <div class="more_img">
                <i :class="item.icon"></i>
              </div>
              <div class="more_text">
                <span v-text="item.name"></span>
              </div>
            </li>
          </template>
        </ul>
      </div>
      <!-- 更多end -->
      <div style="height: 2.2rem;"></div>
    </div>




    <div id="footer">
      <ul>
        <li v-for="(item,index) in footerInfo" @click="contentIndex = index" :class="{active : contentIndex == index}">
          <p><i :class="[item.iconName,{reversal : index == 0}]" class="icon"></i></p>
          <span v-text="item.text"></span>
          <div class="jiaobiao" v-if="index == 0" v-show="item.num > 0" v-text="item.num"></div>
          <div class="jiaobiao xiaojiaobiao" v-else v-show="item.num > 0"></div>
        </li>
      </ul>
    </div>
    <!-- <child ref="findUser"></child> -->

  </div>
</template>

<script>
  
import findUser from './FindUser.vue'
export default {
  name: 'HelloWorld',
  props: ['contentkey','groupingFriendList','userAllMsg','friendsList','groupingList','userHistory'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      title: '我的IM',
      contentIndex: this.Global.contentIndex,
      user_id: this.Global.user_id,
      user_name: 'test',
      footerInfo:this.Global.footerInfo,
      friendsHeader:this.Global.friendsHeader,
      more:this.Global.more,
      websock:null,
    }
  },
  components: {
    // child: findUser
  },
  methods:{
    handleChild:function(name){
      this.$refs.findUser.parentHandleclick("嘿嘿嘿");
    },
    sendMsg(item){
      this.userAllMsg.history[item.fuid].num = 0
      this.storage.set(this.user_id+'-allMsg',JSON.stringify(this.userAllMsg));
      this.Global.msg_friend = item.fuid
      router.push({path:'/msg'});
    },
    handleRouter(url,data){
      if(url == 'find'){
        this.$set(this.Global.friendsHeader[0],'num',0)
        this.jsjiaobiao();
      }
      router.push({path:'/'+url,query:data});
    },
    threadPoxi(){  // 实际调用的方法
        //参数
        const agentData = "mymessage";
        //若是ws开启状态
        if (this.socket.ws.readyState !== this.socket.ws.OPEN) {
            // this.websocketsend(agentData)
            console.log("已开启")
        }
        // 若是 正在开启状态，则等待300毫秒
        else if (this.socket.ws.readyState === this.socket.ws.CONNECTING) {
            let that = this.socket.ws;//保存当前对象this
            setTimeout(function () {
                // that.websocketsend(agentData)
                console.log("发送")
            }, 300);
        }
        // 若未开启 ，则等待500毫秒
        else {
            this.socket.connectSocket;
            let that = this.socket.ws;//保存当前对象this
            setTimeout(function () {
                // that.websocketsend(agentData)
                console.log("发送2")
            }, 500);
        }
    },
    dealGroupingFriend:function () {
        var data =[]
      for(var i in this.groupingList){
          data[i] = this.groupingList[i]
          data[i].show = false
          data[i].users = []
          for(var j in this.friendsList){
              if(this.groupingList[i].id == this.friendsList[j].grouping && this.friendsList[j].id != this.user_id){
                  data[i].users.push(this.friendsList[j])
              }
          }
          data[i].num = data[i].users.length -1
      }
        this.groupingFriendList = data
    }, //处理分组好友
    userFriend:function () {
        var _this = this
        this.$http.post(this.Global.apiUrl+'/index/friend/getFriend', {user_id: this.user_id},{emulateJSON:true}).then(msg => {
          console.log(msg);
          if (msg.body.status == 0) {
            for(var i=0;i<msg.body.data.grouping.length;i++){
                msg.body.data.grouping[i].show = false
            }
            _this.friendsList = msg.body.data.friend
            _this.groupingList = msg.body.data.grouping
            _this.dealGroupingFriend()
          }else{
            this.$messagebox.alert(msg.body.msg, 'error');
          }
        }, response => {
          console.log('error', response)
        })
    },
    jsjiaobiao(){
      var num = 0;
      num += this.friendsHeader[0].num
      this.$set(this.Global.footerInfo[1],'num',num)
    }
  },
  mounted() {
    this.$emit('f_jsJbNum')
  },
  created:function () {
  },
  watch:{
    contentIndex(){
      this.Global.contentIndex = this.contentIndex
    },
    friendsHeader:{
      handler(newVal, oldVal){
          this.jsjiaobiao()
      },
      deep:true
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.gray{
    -webkit-filter: grayscale(100%);
    filter: grayscale(100%);
}

.hello{
  height: 100%;
  position: relative;
  background: #eee;
}
  .reversal{
    transform: scaleX(-1);
    display: inline-block;
  }
  .rotate90{
    transform: rotate(90deg);
  }
  #header{
    width: 100%;
    height: 2.2rem;
    line-height: 2.2rem;
    background: #36373C;
    position: fixed;
    top:0;
    z-index: 1;
  }
  #header p{
    /*margin-left: 0.5rem;*/
    text-align: center;
  }
  #header p span{
    color:#fff;
    font-size: 0.8rem;
  }
  #chat_log{
    background: rgb(0,0,0,.1);
  }
  #chat_log ul{
    background: #fff;
  }
  #chat_log ul li{
    height: 2.5rem;
    border-bottom: 1px solid #f2f2f2;
    position: relative;
  }
  .img_box{
    height: 100%;
    line-height: 100%;
    display: inline-block;
    margin:0 0.5rem;
  }
  #chat_log .img_box span{
    display: flex;
    height: 100%;
    width: 1.5rem;
    align-items: center;
  }
  .info_box{
    display: inline-block;
    height: 100%;
    vertical-align: top;
    margin-top: 0.3rem;
    max-width: 80%;

  }
  .info_box span{
    font-size: 0.8rem;
  }
  .info_box p{
    margin-top: 0.1rem;
    color: #999;
  }
  #chat_log ul li img,.friends_info li img{
    width: 1.5rem;
    height: 1.5rem;
    /*border-radius: 50%;*/
  }

  #footer{
    width: 100%;
    height: 2.2rem;
    background: #fff;
    position: fixed;
    bottom: 0;
  }
  #footer ul li{
    margin-top: 0.2rem;
    width: 33%;
    text-align: center;
    float: left;
    color: #666;
    position: relative;
  }
  #footer ul li .jiaobiao{
    top: 0;
    left: 3rem;
  }
  #footer ul li i{
    font-size: 1.1rem;

  }
  #footer ul li.active{
    color: #3FDD86;
  }
  #friends ul{
    background: #fff;
  }
  #friends>ul>li{
    border-bottom: 1px solid #f2f2f2;
  }
  #friends ul li,#more ul li{
    height: 2.1rem;
    line-height: 2.1rem;
  }
  #friends .fh_img{
    position: absolute;
  }
  #friends .fh_text{
    margin-left: 1.9rem;
    position: relative;
  }
  #friends .fh_text .jiaobiao{
    left: 3rem;
    top: 0.6rem;
  }
  #friends ul li i{
    font-size: 1rem;
  }
  .friends_h li i{
    color: #36373C;
    margin:0 0.5rem;

  }
  #friends ul li span{
    font-size: 0.7rem;
  }
  .friends_f {
    margin-top: 0.5rem;
  }
  .friends_f > li{
    height: auto !important;
  }
  .friends_f li i{
    color: #C9BDBB;
    margin-left:0.7rem;
    margin-right:0.4rem;
  }
  .friends_f li h5{
    font-weight: 500;
    display: flex;
    align-items: center;
  }
  .friends_f li h5 em{
    font-style: normal;
    padding-left: 0.3rem;
    color: #999;
    font-size: 0.7rem;
  }
  .friends_info li{
    border-top: 1px solid #f2f2f2;
    line-height: normal !important;
  }
  .friends_img_box{
    display: inline-block;
    height: 100%;
    width: 1.5rem;
    margin:0 0.5rem;
  }
  .friends_img_box span{
    display: flex;
    align-items: center;
    height: 100%;
  }
   .friends_info_box{
    display: inline-block;
    vertical-align: top;
    width:80%;
  }
  .friends_info_box p{
    color:#999;
  }
  #friends .friends_info_box span{
    font-size: 0.8rem;
  }
  #more ul li{
    height: 2.1rem;
    background: #fff;
    border-bottom: 1px solid #f2f2f2;
  }
  #more .more_img{
    position: absolute;
    left: 0.5rem;
  }
  #more .more_img i{
    font-size: 1rem;

  }
  #more .more_text{
    margin-left: 1.9rem;
  }
  #more .more_text span{
    font-size: 0.7rem;
  }
</style>
