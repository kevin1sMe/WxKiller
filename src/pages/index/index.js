//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },


  joinRoom: function (room_id) {
    wx.request({
      url: app.globalData.game_url + "/game/join_room",
      method: 'POST',
      data: {
        nickName: this.data.userInfo.nickName,
        avatarUrl: this.data.userInfo.avatarUrl,
        gender: this.data.userInfo.gender,
        room_id: room_id
      },
      header: {
         'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data)
        wx.navigateTo({
          url: '../team/team?room_id=' + res.data.room_id
        })
      },
      fail: function( res) {
        console.log("加入房间失败, room_id:", room_id)
      }
    })
  },
  //注册扫码函数
  bindScanCode: function(){
    var that = this
    wx.scanCode({
      scanType: "qrCode",
      success: (res) => {
        //FIXME 这里扫不出来有用的返回值，是因为没上线的缘故吗
        console.log(res)
        wx.showModal({
          title: '扫描出了个啥呢',
          content: '快加入这个对局吧。。',
          success: res=>{
            if (res.confirm) {
              console.log("确认加入")
              //发送加入请求 FIXME
              that.joinRoom(13)
            } else {
              console.log("取消加入")
            }
          }
        })
      }
    })
  },

  bindCreate: function () {
    wx.request({
      url: app.globalData.game_url + "/game/create_room",
      method: 'POST',
      data: {
        nickName: this.data.userInfo.nickName,
        avatarUrl: this.data.userInfo.avatarUrl,
        gender: this.data.userInfo.gender
      },
      header: {
         'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data)
        wx.navigateTo({
          url: '../team/team?room_id=' + res.data.room_id
        })
      },
      fail: function( res) {
        console.log("创建对局失败")
      }
    })
   
  },

  onLoad: function () {
    wx.getStorage({
      key: 'userInfo',
      success: res => {
        console.log("get userInfo from storage succ, ", res.data)
        this.setData({userInfo : res.data})
      },
      fail: res => {
        console.log("get userInfo from storage failed ")
      }
    })

    if (app.globalData.userInfo) {
      console.log("has globalData")
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log("2222")
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          console.log("2222")
          app.globalData.userInfo = res.userInfo
          wx.setStorageSync('userInfo', res.userInfo);
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
