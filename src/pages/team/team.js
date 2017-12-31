// pages/team/team.js
const app = getApp()


Page({

    /**
     * 页面的初始数据
     */

    data: {
        room_id: 13,
        room_info: null
    },

    ToGame: function () {
        var that = this
        console.log("ToGame(), room_id:", that.data.room_id)
        //创建对局
        wx.request({
            url: app.globalData.game_url + "/game/start_game",
            method: 'POST',
            data: {
                room_id: that.data.room_id,
                nickName: app.globalData.userInfo.nickName
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
                console.log(res.data)
                if(0 == res.data.ret) {
                    wx.navigateTo({
                        url: '../game/game?room_id=' + that.data.room_id
                    })
                }
            },
            fail: function (res) {
                console.log("拉取房间信息失败")
            }
        })

    },

    ToInvite: function () {
        var that = this
        console.log("BindInviteFriend...., room_id:", that.data.room_id)
        wx.navigateTo({
            url: '../invite_code/invite_code?room_id=' + that.data.room_id
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