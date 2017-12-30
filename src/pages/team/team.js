// pages/team/team.js
const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
 
  data: {
    userInfo: {},
    room_id: 0,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  ToGame: function () {
    wx.navigateTo({
      url: '../game/game',
    })
  },

  ToInvite: function () {
    console.log("BindInviteFriend...., room_id:", this.data.room_id)
    wx.request({
      // 调用接口C
      url: app.globalData.game_url + "/game/wx_qrcode",
      method: 'POST',
      data: {
        room_id: this.data.room_id
      },
      success(res) {
        // res是二进制流，后台获取后，直接保存为图片，然后将图片返回给前台
        // 后台二进制怎么转图片？我也不会后台，学会了再贴代码
        console.log("get resp succ, ", res)
      }
    })
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("show param room_id:", options.room_id)
    if(options.room_id != undefined) {
      this.setData({room_id: options.room_id})
    }
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})