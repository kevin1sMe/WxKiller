// pages/game/game.js
const app = getApp()


Page({

  /**
   * 页面的初始数据
   */

  data: {
    room_id: 13,
    room_info: null,
    itemList: ['杀手', '警察', '平民'],
  },

    longPress: function (e) {
       console.log("long press, ", e)
        console.log("long press, ", e.currentTarget.dataset.nickname)
        var who =  e.currentTarget.dataset.nickname
        var that = this
        wx.showActionSheet({
            itemList: this.data.itemList,
            success: function(res) {
                var sel = that.data.itemList[res.tapIndex]
                var title = [who, ' => ', sel].join("")
                console.log("press idx:", res.tapIndex, " itemList", that.data.itemList, " sel:", sel, " title:", title)
                wx.showToast({title: title, icon: 'success', duration: 1000})
            },
            fail: function(res) {
                console.log(res.errMsg)
            }
        })
    },
    //查看身份
  showMyIdent : function(){
      wx.navigateTo({
          url: '../show_identity/show_identity?room_id=' + this.data.room_id
      })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
            console.log("show param room_id:", options.room_id)
        if (options.room_id != undefined) {
            this.setData({room_id: options.room_id})
        }
        var that = this

        console.log("try get room info, room_id:", that.data.room_id)

        //拉取这个room的信息
        wx.request({
            url: app.globalData.game_url + "/game/get_room",
            method: 'POST',
            data: {
                room_id: that.data.room_id
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
                console.log(res.data)
                if(0 == res.data.ret) {
                    that.setData({room_info: JSON.parse(res.data.room_info)})
                    console.log("set room_info:", that.data.room_info)
                }
            },
            fail: function (res) {
                console.log("拉取房间信息失败")
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