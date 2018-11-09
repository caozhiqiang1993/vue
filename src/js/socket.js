import Vue from 'vue'
import Resource from 'vue-resource'
Vue.use(Resource)
var socket = {
	ws:{},
	name:{},
	uid:{},
	fuid:{},
	vue:{},
	connectSocket:function(vue){
		// if(!window.localStorage.getItem('key')){
        socket.vue = vue;
			// 创建websocket
        socket.ws = new WebSocket("ws://192.168.2.52:7272");
			// 当socket连接打开时，输入用户名
        socket.ws.onopen = this.onOpen
			// 当有消息时根据消息类型显示不同信息
        socket.ws.onmessage = this.onmessage;
        socket.ws.onclose = function() {
		  socket.connectSocket(socket.vue);
		};
        socket.ws.onerror = function() {
		  console.log("出现错误");
		};
		// }
	},
	onOpen:function(){
		var login_data = '{"type":"login","uid":'+socket.vue.user_id+'}';
        console.log("websocket握手成功，发送登录数据:"+login_data);
        socket.ws.send(login_data);
	},
	onmessage:function(e){
        var data = eval("("+e.data+")");
        var time =  (new Date()).getTime();
        console.log(e.data);
        if(data.type == 'login'){

        }else if(data.type == 'msg'){
            var msg = {
                user_id:data.uid,
                f_user_id:data.fuid,
                // user_name:socket.vue.friendsList[data.uid].user_name,
                // img:socket.vue.friendsList[data.uid].img,
                msg:data.info
            }
            if(socket.vue.userAllMsg.charlog[data.uid] == undefined){
                socket.vue.$set(socket.vue.userAllMsg.charlog, data.uid, [])
            }
            socket.vue.userAllMsg.charlog[data.uid].push(msg)

            var num = 0;
            if(socket.vue.$router.currentRoute.path != '/msg' || socket.vue.$refs.chile.msgTitle.user_id != data.uid){
                if(socket.vue.userAllMsg.history[data.uid] != undefined){
                  num = socket.vue.userAllMsg.history[data.uid].num
                }
                num++
            }
            socket.vue.userAllMsg.history[data.uid] = {
              msg:data.info,
              time: time,
              fuid: data.uid,
              num: num,
            }
            socket.vue.storage.set(socket.vue.user_id+'-allMsg',JSON.stringify(socket.vue.userAllMsg));
		}else if(data.type == 'addUser'){
            if(socket.vue.friendsList[data.user.user_id] == undefined){
                socket.vue.$set(socket.vue.friendsList, data.user.user_id, data.user)
                socket.vue.dealGroupingFriend();
                if(data.msg != undefined){
                    var msg = {
                        user_id:data.msg.uid,
                        f_user_id:data.msg.fuid,
                        // user_name:socket.vue.friendsList[data.msg.uid].user_name,
                        // img:socket.vue.friendsList[data.msg.uid].img,
                        msg:data.msg.info
                    }
                    if(socket.vue.userAllMsg.charlog[data.msg.fuid] == undefined){
                        socket.vue.userAllMsg.charlog[data.msg.fuid] = []
                    }
                    socket.vue.userAllMsg.charlog[data.msg.fuid].push(msg)
                    socket.vue.userAllMsg.history[data.msg.fuid] = {
                      msg:data.msg.info,
                      time: time,
                      fuid: data.msg.fuid,
                      num:0
                    }
                    socket.vue.storage.set(socket.vue.user_id+'-allMsg',JSON.stringify(socket.vue.userAllMsg));
                    var data = '{"type":"msg","info":"'+data.msg.info+'","fuid":'+data.msg.fuid+',"uid":'+data.msg.uid+'}';
                    socket.ws.send(data);
                }
            }
        }else if(data.type == 'apply'){
            socket.vue.$set(socket.vue.Global.friendsHeader[0],'num',1)
        }
        socket.vue.historySort()
	}
}

export default socket;