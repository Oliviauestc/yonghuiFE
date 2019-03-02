<script>
export default {
  method: {
    login () {
      const that = this
      // 调用登录接口
      console.log('调用登录接口')
      wx.login({
        success (res) {
          if (res.code) {
            // 发起网络请求
            that.$get({'url': '/login', data: {code: res.code}}).then((res) => {
              wx.setStorage({
                key: 'openid',
                data: res.data.openid
              }, {
                key: 'session_key',
                data: res.data.session_key
              })
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    },
    checkLoginStatus () {
    }
  },
  created () {
    // 调用API从本地缓存中获取数据
    try {
      var value = wx.getStorageSync('openid')
      if (!value) {
        this.login()
      }
    } catch (e) {
      console.log('获取缓存失败', e)
    }
  }
}
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
