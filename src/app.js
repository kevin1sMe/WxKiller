//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log("login succ cb")
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log("nickName:", res.userInfo.nickName)
              console.log("avatarUrl:", res.userInfo.avatarUrl)
              console.log("gender:", res.userInfo.gender)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    game_url: 'http://127.0.0.1:8080',
    access_token: '5_Mj35wvTc6ADLof_04XXQ-YDk58YyAbW4YA3YwAvr7BdWnMR5QMYGkwqpkpfzMOQEMai4q6PIdp_o-jhK46jqZVlOG7VN8NZgQw8wfXQMTsYG3t1fuukzJbMAIo8sNhi8OfNhVfTnMltkwTTEPUNaADALQJ'
  }
})