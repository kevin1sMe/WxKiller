// pages/invite_code/invite_code.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    room_id: 13,
    img_url: "",
    userInfo: null
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
  addOne: function(){
    console.log("add one to game, room_id:", this.data.room_id)
    this.joinRoom(this.data.room_id)
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.room_id != undefined) {
      this.setData({ room_id: options.room_id })
      console.log("show param room_id:", options.room_id)
    }

    this.setData({userInfo: wx.getStorageSync('userInfo')})
    //拉取qr码url
    var room_id = this.data.room_id
      console.log("BindInviteFriend...., room_id:", this.data.room_id)
      var that = this
      wx.request({
        url: app.globalData.game_url + "/game/wx_qrcode",
        method: 'POST',
        data: {
          room_id : that.data.room_id
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success(res) {
          console.log("get resp succ, ", res.data)
          if (res.data.ret == 0) {
            that.setData({
              img_url: app.globalData.game_url + res.data.qr_png })
            console.log("set Data, img: ", that.data.img_url)
          } else {
            console.log("fail")
          }
        }
      })
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