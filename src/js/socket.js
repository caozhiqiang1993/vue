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
        console.log(e.data);
        if(data.type == 'login'){
        	/*var users = [];
        	var info = {}
            var n = 0;
        	for(var i=0;i<data.data.length;i++){
            	if(socket.vue.user_id != data.data[i].user_id){
                    info = {
                        name:data.data[i].user_name,
                        img:'http://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg',
                        msg:'您好',
                        user_id:data.data[i].user_id,
                    }
                    users[n] = info
                    n++
				}
			}
            socket.vue.msgInfo = users*/
        }else if(data.type == 'msg'){
            var msg = {
                user_id:data.uid,
                f_user_id:data.fuid,
                user_name:socket.vue.friendsList[data.uid].user_name,
                img:socket.vue.friendsList[data.uid].img,
                msg:data.info
            }
            if(socket.vue.userAllMsg[data.uid] == undefined){
                socket.vue.$set(socket.vue.userAllMsg, data.uid, [])
                // socket.vue.userAllMsg[data.uid] = []
            }
            socket.vue.userAllMsg[data.uid].push(msg)
		}
	}
}

export default socket;