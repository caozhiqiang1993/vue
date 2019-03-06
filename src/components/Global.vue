<script type="text/javascript">
const contentIndex = 0
const user_id = 0
const msg_friend = 0
const apiUrl = 'http://192.168.2.52:333'
const footerInfo = [
		{
		  text:'消息',
		  iconName:'iconfont icon-cc-message',
		  num:0
		},
		{
		  text:'联系人',
		  iconName:'iconfont icon-user',
		  num:0
		},
		{
		  text:'更多',
		  iconName:'iconfont icon-more',
		  num:0
		}
	]
const friendsHeader = [
          {
              text:'新的朋友',
              iconName:'iconfont icon-plus',
              num:0
          },
          /*{
              text:'群聊',
              iconName:'iconfont icon-users'
          }*/
      ]
const more = [
          {
              icon:'iconfont icon-shezhi',
              name:'设置'
          },
          /*{
              icon:'iconfont icon-find',
              name:'分享'
          },
          {
              icon:'iconfont icon-iconset0103',
              name:'关于'
          },*/
      ]

export default
{
  contentIndex,
  user_id,
  msg_friend,
  apiUrl,
  footerInfo,
  friendsHeader,
  more,
}
</script>