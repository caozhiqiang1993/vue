<template>
	<div v-loading="loading" class="loginPage" ref="loginPage">
		<div class="L_enter">
			<p class="l_same_P">
				<input type="text" placeholder="用户名" v-model="username">
			</p>
			<p class="l_same_P">
				<input type="password" placeholder="密码" v-model="userpsd">
			</p>
			<div class="loginBtn" @click="loginSubmit">
				注册
			</div>
		</div>
	</div>
</template>

<script>


//创建ajax函数

export default {
	data() {
		return {
			username: '',
			userpsd: '',
			loading: false,
			ws:{}
		}
	},
	methods: {
		loginSubmit() {
			if(this.username == ''){
				alert('用户名不能为空')
				return false
			}
			if(this.userpsd == ''){
				alert('密码不能为空')
				return false
			}
			this.loading = true
			this.$http.post(this.Global.apiUrl+'/index/login/reg', {username: this.username,userpsd: this.userpsd},{emulateJSON:true}).then(msg => {
				this.loading = false
				if (msg.body.status == 0) {
					this.storage.set('key',msg.body.data)
					this.storage.set('user_id',msg.body.data)
					this.Global.user_id = msg.body.data
					this.$emit("onuserid",msg.body.data);
					router.push({path:'/'})
				}else if(msg.body.status == 2){
					this.$message({
			          showClose: true,
			          message: '账号已存在',
			          type: 'warning',
			          center:true
			        })
					// alert('账号已存在', 'error');
				}
			}, response => {
				console.log('error', response)
			})
		}
	},
	mounted() {
		// router.push({path:'/index'})
	},
	created(){

	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="css">
.loginPage{
	min-height: calc(100vh + 1px);
	background: #0094da;
	padding: 0 2rem;
}
.L_enter{
	padding-top: 5rem;
}

.L_enter input::-webkit-input-placeholder{
    color:#fff;
}

.L_enter input::-moz-placeholder{   /* Mozilla Firefox 19+ */
    color:#fff;
}

.L_enter input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
    color:#fff;
}

.L_enter input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
    color:#fff;
}

.L_enter .l_same_P{
	padding: 0.8rem 0 0.4rem;
	border-bottom:0.2rem solid #007ec5;
}

.L_enter .l_same_P	input{
	background:#0094da;
	width:100%;
	font-size:0.75rem;
	color: white;
	outline: none;
}

.L_enter .l_same_OR{
	text-align:center;
	color:#fff;
	padding-top:0.5rem;
}




.loginBtn{
	text-align: center;
	color: #555;
	padding: 0.4rem;
	margin-top: 0.4rem;
	background: #fff;
	font-size: 0.65rem;
    box-shadow: 0 0 1px 1px #ababab;
}

.rORf{
	padding:0.8rem 0 0.4rem;
	color: #fff;
}
.rORf span:last-child{
	float:right;
}
.rORf span{
	font-size:0.5rem;
}

.l_third{
	text-align:center;
}


.l_third img{
	width: 1.6rem;
	margin: 0.7rem;
}

</style>