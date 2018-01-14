//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
     var that = this
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log("login succ cb", res)
        wx.request({
          url: that.globalData.game_url + "/game/get_openid",
          method: 'POST',
          data: {
            code: res.code
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            if(res.statusCode == 200){
              console.log("获取openid成功, openid:", res.data.openid)
              that.globalData.openid = res.data.openid
            }else {
              console.log("获取openid失败, ret_code:", res.data.statusCode)
            }
           
          },
          fail: function (res) {
            console.log("获取openid失败", res)
          }
        })
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
              //wx.setStorageSync('userInfo', res.userInfo);
              wx.setStorage({
                key:"userInfo",
                data: res.userInfo,
                success : res => {
                  console.log("setStorage succ", res)
                },
                fail: res => {
                    console.log("setStorage failed, ", res)
                }
              });

              console.log("nickName:", res.userInfo.nickName)
              console.log("avatarUrl:", res.userInfo.avatarUrl)
              console.log("gender:", res.userInfo.gender)

              var saveUserInfo
              wx.getStorage({
                key: 'userInfo',
                success: res => {
                  console.log("getStorage succ, ", res)
                  saveUserInfo = res.data
                    console.log("saveUserInfo = , ", saveUserInfo)
                } ,
                fail: res => {
                  console.log("getStorage failed, ", res)
                }
              });
              //console.log("saveUserInfo.nickName", saveUserInfo.nickName)
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
    //game_url: 'https://game.gameapp.club',
    //game_url: 'https://122.152.220.73',
    openid: null
  }
})