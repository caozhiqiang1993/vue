<template>
  <div id="user">
    <div class="userInfoHeader">
      <i class="iconfont icon-left" @click="handleRouter('')"></i>
      <span>个人信息</span>
    </div>
    <div class="userContent">
      <div class="userInfoButtonBox">
        <ul>
          <li>
            <div class="floarLeft">
              <span>头像</span>
            </div>
            <div class="floarRight">
              <img :src="friendsList[user_id].img" alt="">
              <input type="file" name="img" class="touxiang" @change="uploadImg(event)">
            </div>
          </li>
          <li>
            <div class="floarLeft">
              <span>用户名</span>
            </div>
            <div class="floarRight">
              <p v-text="friendsList[user_id].user_name">test</p>
            </div>
          </li>
          <li>
            <div class="floarLeft">
              <span>个人说明</span>
            </div>
            <div class="floarRight">
              <p>
                <input type="text"  v-model="friendsList[user_id].explain"  @blur="editUserInfo()">
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import './../css/UserInfo.css'
// import { Indicator } from 'mint-ui';
export default {
  name: 'user',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      user_id: this.Global.user_id
    }
  },
  props: ['friendsList'],
  methods:{
    handleRouter(url,data){
      router.push({path:'/'+url,query:data});
    },
    editUserInfo:function () {
      var _this = this
      var formData = {};
      formData.explain = this.friendsList[this.user_id].explain;
      _this.$http.post('http://192.168.2.52:333/index/user/editUserInfo', formData,{emulateJSON:true}).then(msg => {
        console.log(msg);
        if (msg.body.status == 0) {

        }else{
          alert(msg.body.msg, 'error');
        }
      }, response => {
        console.log('error', response)
      })
    }, //修改个人信息
    uploadImg:function (e) {
      console.log(e)
        var _this = this
        var fils = e.target.files["0"];
        if (fils.length == 0) return false
        var i_image = new Image();
        i_image.src = window.URL.createObjectURL(fils)
        i_image.onload = function () {
            var fordate = new FormData();
            fordate.append('img', fils);
            _this.$http.post('http://192.168.2.52:333/index/user/uploadImg', fordate,{emulateJSON:true}).then(msg => {
              console.log(msg);
              if (msg.body.status == 0) {
                _this.friendsList[_this.user_id].img = data.data
              }else{
                alert(msg.body.msg, 'error');
              }
            }, response => {
              console.log('error', response)
            })
        }
    }, //上传头像
  },
  mounted(){

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
#user{
    position: absolute;
    top:0;
    z-index: 3;
    background: #eee;
    transition: 0.3s;
    width: 100%;
    height: 100vh;
}

.userInfoButtonBox{
    margin-top: 0.6rem;
    background: #fff;
    position: relative;
}
.userInfoButtonBox .buttonLeft{
    display: inline-block;
}
.userInfoButtonBox .buttonRight{
    display: inline-block;
}
.userInfoButtonBox li{
    height: 1.7rem;
    line-height: 1.7rem;
    border-top: 1px solid #eee;
}
.userInfoButtonBox li:first-child{
    line-height: 3rem;
    height: 3rem;
}
.userInfoButtonBox li img{
    width:2.5rem;
    height:2.5rem;
    border-radius: 50%;
    vertical-align: middle;
}
.userInfoButtonBox .touxiang{
    position: absolute;
    top: 0.3rem;
    width: 2.5rem;
    height: 2.5rem;
    display: inline-block;
    opacity: 0;

}
.userInfoButtonBox .floarLeft{
    margin-left: 0.5rem;
}
.userInfoButtonBox .floarRight{
    margin-right: 1rem;
}
.userInfoButtonBox .floarRight p{
    color:#999;
}
.userInfoButtonBox .floarRight input{
    text-align: right;
    color:#999;
    outline: none;
}
</style>
