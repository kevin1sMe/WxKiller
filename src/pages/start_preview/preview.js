// pages/start_preview/preview.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    room_id: 13,
    total_player: 10,
    killer_num:2,
    police_num:2,
    civilian_num:6,
    judge_name: '我是大法官'
  },

    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (args) {
        console.log("show param args:", args)
        if (args.room_id != undefined) {
            this.setData({room_id: args.room_id })
        }

        if (args.total_player != undefined) {
            this.setData({total_player: args.total_player})
        }
        if (args.killer_num != undefined) {
            this.setData({killer_num: args.killer_num})
        }
        if (args.police_num != undefined) {
            this.setData({police_num: args.police_num})
        }
        if (args.civilian_num != undefined) {
            this.setData({civilian_num: args.civilian_num})
        }
        if (args.judge_name != undefined) {
            this.setData({judge_name: decodeURIComponent(args.judge_name)})
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