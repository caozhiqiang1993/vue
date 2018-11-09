<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view ref="chile" :contentkey="contentIndex" :userAllMsg="userAllMsg" :userHistory="userHistory" :groupingFriendList="groupingFriendList" :friendsList="friendsList" @onuserid="onuser_id" @f_jsJbNum="jsJbNum" @findUserApplyDeal="chileApplyDeal"></router-view>
    </transition>
  </div>
</template>

<script>
import './css/ionicons/ionicons.min.css'
export default {
  name: 'App',
  data(){
    return {
      user_id:this.Global.user_id,
      contentIndex:0,
      transitionName:'',
      friendsList:{}, //好友列表
      groupingList:[], //分组信息
      groupingFriendList:[
          /*{
              id:1,
              name:'知名人物',
              show:false,
              num:'5',
              users:[
                  {
                      user_id:1,
                      img:'http://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg',
                      user_name:'张三',
                      autograph:'这些都是测试数据，实际使用请严格按照该格式返回'
                  },
                  {
                      user_id:2,
                      img:'http://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg',
                      user_name:'张三',
                      autograph:'这些都是测试数据，实际使用请严格按照该格式返回'
                  },
              ]
          },
          {
              id:2,
              name:'知名人物2',
              show:false,
              num:'5',
              users:[
                  {
                      user_id:3,
                      img:'http://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg',
                      user_name:'张三',
                      autograph:'这些都是测试数据，实际使用请严格按照该格式返回'
                  },
                  {
                      user_id:4,
                      img:'http://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg',
                      user_name:'张三',
                      autograph:'这些都是测试数据，实际使用请严格按照该格式返回'
                  },
              ]
          },
          {
              id:3,
              name:'知名人物3',
              show:false,
              num:'5',
              users:[
                  {
                      user_id:5,
                      img:'http://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg',
                      user_name:'张三',
                      autograph:'这些都是测试数据，实际使用请严格按照该格式返回'
                  },
                  {
                      user_id:6,
                      img:'http://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg',
                      user_name:'张三',
                      autograph:'这些都是测试数据，实际使用请严格按照该格式返回'
                  },
              ]
          },*/
      ],
      userAllMsg:{
        charlog:{},
        history:{}
          /*'2':[
              {
                  user_id:1,
                  user_name:'张三',
                  img:'http://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg',
                  msg:'嗨，欢迎体验LayIM。演示标记：1530843285035'
              }
          ]*/
      }, //用户所有的聊天记录
      userHistory:[]
    }
  },
  methods:{
    slip(slip_box,_this, left_range) {
      var startX,startY,moveEndX,moveEndY,X,Y;
      slip_box.addEventListener("touchstart", function(e) {

        startX = e.changedTouches[0].pageX,

        startY = e.changedTouches[0].pageY;

      });

      slip_box.addEventListener("touchmove", function(e) {

        moveEndX = e.changedTouches[0].pageX;

        moveEndY = e.changedTouches[0].pageY;

        X = moveEndX - startX;

        Y = moveEndY - startY;

        // if (Math.abs(X)<60) {break;}
        // if (Math.abs(Y)<50) {return false;}

        if (Math.abs(X) > Math.abs(Y) && X > 60) {
          if(_this.contentIndex != 0){
            _this.contentIndex--
          }
          console.log(_this);
          // console.log("left : right");

        } else if (Math.abs(X) > Math.abs(Y) && X < -60) {
          if(_this.contentIndex != 2){
            _this.contentIndex++
          }

          console.log(_this.contentIndex);
          // console.log("right : left");
        } else if (Math.abs(Y) > Math.abs(X) && Y > 0) {

          // console.log("top : bottom");

        } else if (Math.abs(Y) > Math.abs(X) && Y < 0) {

          // console.log("bottom : top");

        } else {

          // console.log("just touch");

        }

      });
    },
    dealGroupingFriend() {
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
    userFriend() {
        var _this = this
        this.$http.post(this.Global.apiUrl+'/index/friend/getFriend', {user_id: this.user_id},{emulateJSON:true}).then((msg) => {
          if (msg.body.status == 0) {
            for(var i=0;i<msg.body.data.grouping.length;i++){
                msg.body.data.grouping[i].show = false
            }
            _this.friendsList = msg.body.data.friend
            _this.groupingList = msg.body.data.grouping
            _this.dealGroupingFriend()
            //获取聊天记录
            var userAllmsg = this.storage.get(this.user_id+'-allMsg')
            if(userAllmsg != "undefined" && userAllmsg){
              this.userAllMsg = JSON.parse(userAllmsg);
              this.historySort()
            }
          }else{
            this.$messagebox.alert(msg.body.msg, 'error');
          }
        }, response => {
          console.log('error', response)
        })
    },
    onuser_id(user_id){
      this.user_id = user_id
    },
    chileApplyDeal(item,type){
      this.$refs.chile.applyDeal(item,type)
    },
    historySort(){
      var obj = this.userAllMsg.history
      var history = [];
      var num = 0;
      for (var i in obj) {
          num += obj[i].num
          history.push(obj[i]);
      }
      history.sort(function (obj1, obj2) {
          var val1 = obj1.time;
          var val2 = obj2.time;
          if (val1 < val2) {
              return 1;
          } else if (val1 > val2) {
              return -1;
          } else {
              return 0;
          }
      })
      this.userHistory = history
      if(this.$refs.chile.footerInfo != undefined){
        this.$set(this.$refs.chile.footerInfo[0],'num',num)
      }
    },
    jsJbNum(){
      var num = 0;
      if(this.userAllMsg.history != undefined){
        for(var k in this.userAllMsg.history){
          num += this.userAllMsg.history[k].num
        }
        this.Global.footerInfo[0].num = num
      }
    }
  },
  mounted(){
    // this.slip(document.body,this);
      if(this.user_id > 0){
        this.socket.connectSocket(this)
        this.userFriend() //获取好友
      }
  },
  watch:{
    $route(to, from) {
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if(to.meta.index > from.meta.index){
        //设置动画名称
        this.transitionName = 'slide-left';
      }else{
        this.transitionName = 'slide-right';
      }
    },
    contentIndex(){
      console.log(this.contentIndex)
    },
    user_id(){
        this.socket.connectSocket(this)
        this.userFriend() //获取好友
    },
    userAllMsg:{
      handler(newVal, oldVal){
          this.historySort()
          // this.jsJbNum()
      },
      deep:true
    }
  }
}
</script>

<style>
#app{
  background: #eee;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

</style>
