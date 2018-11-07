<template>
  <div id="message">
    <div id="msg_header" ref="header">
      <div class="header_img">
        <i class="iconfont icon-left" @click="handleRouter('')"></i>
      </div>
      <div class="header_text">
        <span v-text="msgTitle.user_name"></span>
      </div>
    </div>
    <div id="msg_content">
      <div class="msg_info" ref="msg_info" @click="isShowEmoji=0">
        <ul>
          <li v-for="(item,index) in userMsg" class="" v-bind:class="{ 'msg_info_li_right': user_id == item.user_id}">
            <div class="msg_user_info" v-bind:class="{ 'msg_user_info_right': user_id == item.user_id}">
              <img :src="friendsList[item.user_id].img">
              <span v-text="friendsList[item.user_id].user_name" class="" v-bind:class="{ 'msg_user_info_text_right': user_id == item.user_id}"></span>
            </div>
            <div class="msg_msg" v-bind:class="{ 'msg_msg_right': user_id == item.user_id}">
              <p v-text="item.msg"></p>
            </div>
          </li>
          <!--<li class="interval_time">
            <span>07-07 14:28</span>
          </li>-->

        </ul>
      </div>
      <div class="input_box">
        <div class="input_text">
          <input type="text" v-model="Message" id="send_message" @click="editMessage()">
          <button v-if="Message != ''" @click="senMessage()" class="botton_color">发送</button>
          <button v-else>发送</button>
        </div>
        <div class="more_function">
          <span class="iconfont icon-smile biaoqing" @click="isShowEmoji=!isShowEmoji"></span>
          <span class="iconfont icon-tupian"></span>
          <span class="iconfont icon-iconset0196"></span>
        </div>
        <div id="biaoqing" v-show="isShowEmoji">
          <table>
            <tr v-for="item,key in emoji">
              <td v-for="val,index in item" v-text="val" @click.stop="addEmoji(key,index)"></td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { Indicator } from 'mint-ui';
var emoji = '😀 😁 😂 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 😗 😙 😚 😇 😐 😑 😶 😏 😣 😥 😮 😯 😪 😫 😴 😌 😛 😜 😝 😒 😓 😔 😕 😲 😷 😖 😞 😟 😤 😢 😭 😦 😧 😨 😬 😰 😱 😳 😵 😡 😠';
  var emoji_arr = []
  emoji_arr = emoji.split(' ');
  var emoji_data = {}
  var start = 0;
  var end = 0
  var row = 10;
  for(var i=1;i<=5;i++){
      start = (i-1)*row
      end = row*i
      emoji_data[i] = emoji_arr.slice(start,end);
  }
export default {
  name: 'Message',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      title: '',
      user_id:this.Global.user_id,
      Message:'',
      userMsg:[],
      msgTitle:{},
      isShowEmoji:0,
      emoji:emoji_data
    }
  },
  props:['friendsList','userAllMsg'],
  methods:{
    handleRouter(url){
      router.push({path:'/'+url});
    },
    addEmoji:function (key,index) {
      this.Message = this.Message+this.emoji[key][index]
        this.isShowEmoji = 0
    },
    editMessage:function () {
      this.$nextTick(() => {
          var container = this.$el.querySelector("#message .msg_info");
          container.scrollTop = container.scrollHeight;
      })
    },
    senMessage:function () {
        var data = '{"type":"msg","info":"'+this.Message+'","fuid":'+this.msgTitle.user_id+',"uid":'+this.user_id+'}';
        this.socket.ws.send(data);
        var msg = {
            user_id:this.user_id,
            f_user_id:this.msgTitle.user_id,
            user_name:this.friendsList[this.user_id].user_name,
            img:this.friendsList[this.user_id].img,
            msg:this.Message
        }
        if(this.userAllMsg[this.msgTitle.user_id] == undefined){
            this.userAllMsg[this.msgTitle.user_id] = []
            this.userMsg = this.userAllMsg[this.msgTitle.user_id]
        }
        this.userAllMsg[this.msgTitle.user_id].push(msg)
        this.Message = ''
    },//发送消息
  },
  mounted(){
    if(this.Global.msg_friend > 0){
      this.msgTitle = this.friendsList[this.Global.msg_friend]
      this.userMsg = this.userAllMsg[this.msgTitle.user_id]
    }else{
      router.push({path:'/'});
    }
  },
  updated(){

  },
  watch: {  //监听
      userMsg() {
          this.$nextTick(() => {
              var container = this.$el.querySelector("#message .msg_info");
              container.scrollTop = container.scrollHeight;
          })
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#message{
    position: absolute;
    top:0;
    z-index: 3;
    background: #eee;
    transition: 0.3s;
    width: 100%;
}
#msg_header{
    height: 2.2rem;
    line-height: 2.2rem;
    background: #36373C;
}
#msg_header span{
    color: #fff;
    font-size: 0.8rem;
}
#msg_header .header_img {
    position:absolute;
    left: 1.1rem;
}
#msg_header .header_text {
    margin-left: -1.1rem;
    text-align: center;
}
#msg_header i{
    color: #fff;
    font-size: 1.2rem;
}
#msg_content .msg_info{
    height: calc(100vh - 2.2rem - 1.2rem - 1.7rem - 1.6rem);
    padding: 0.4rem;
    overflow-y: scroll;
}
#msg_content .msg_info ul li{
    min-height: 3rem;
    margin-bottom: 0.5rem;
    padding-left: 2.4rem;
    position: relative;
}

.msg_info_li_right{
    padding-right: 2.4rem;
    padding-left: 0 !important;
}

.msg_user_info_right{
    right: 0.1rem;
    left: auto;
    text-align: right;
}
.msg_user_info_text_right{
    text-align: right;
    right: 2.4rem;
    left: auto !important;
}
.msg_msg_right{
    background: #5FB878 !important;
    float: right;
}

#msg_content .msg_info .msg_user_info{
    position: absolute;
    left: 0.1rem;
}
#msg_content .msg_info .msg_user_info span{
    position: absolute;
    left: 2.4rem;
    top: 0;
    display: inline-block;
    width: 10rem;
    color: #999;
    font-size: 0.3rem;
}
#msg_content .msg_info .msg_user_info img{
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
}
#msg_content .msg_info .msg_msg{
    min-height: 1rem;
    line-height: 1rem;
    background: #fff;
    border-radius: 0.15rem;
    padding: 0.3rem 0.4rem;
    display: inline-block;
    margin-top: 0.9rem;
    font-size: 0.65rem;
    color: #333;
    position:relative;
    max-width:calc(100vw - 6.5rem);
}
#msg_content .msg_info .interval_time{
    min-height: 0;
    padding-left: 0;
    text-align: center;
}
#msg_content .msg_info .interval_time span{
    padding: 0 0.7rem;
    line-height: 1.45rem;
    display: inline-block;
    background: #ddd;
    border-radius: 3px;
    color: #fff;
    font-size: 0.6rem
}
.msg_msg:after {
    msg_content: '';
    position: absolute;
    left: -0.43rem;
    top: 0.6rem;
    width: 0;
    height: 0;
    border-style: solid dashed dashed;
    border-color: #fff transparent transparent;
    overflow: hidden;
    border-width: 10px;
}
.msg_msg_right:after {
    right: -0.43rem;
    left:auto;
    border-color: #5FB878 transparent transparent;
}




.msg_left{
    text-align: left;
}

.msg_right{
    text-align: right;
}

#msg_content .input_box .input_text{
    display: flex;
    height: 1.7rem;
    margin-top: 0.3rem;
}
#msg_content .input_box .input_text input{
    background: #fff;
    flex: 1;
    height: 1.7rem;
    margin-left: 0.5rem;
    border-radius: 3px;
    padding-left: 0.2rem;
    outline:none;
}
#msg_content .input_box .input_text button{
    padding: 0 1rem;
    margin:0 0.4rem;
    height: 1.7rem;
    color:#fff;
    background: #d2d2d2;
    border-radius: 3px;
    border:none;
    outline: none;
}
#msg_content .input_box .more_function{
    height: 1.7rem;
    margin-left:0.8rem;
}
#msg_content .input_box .more_function span{
    font-size: 1.3rem;
    margin:0 0.6rem;
}


#biaoqing{
    position: fixed;
    bottom: 0;
    background: #fff;
    width:100%;
}
#biaoqing tr{
    height: 1.5rem;
}
#biaoqing tr td{
    width:10%;
    text-align: center;
}

.botton_color{
    color: #fff !important;
    background: #15c139 !important;
}
</style>
