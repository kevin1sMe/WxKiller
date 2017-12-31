// pages/show_identity/show_identity.js
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        room_id: 13,
        identity_img: "",
        //userInfo: wx.getStorageSync('userInfo')
        userInfo: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (options.room_id != undefined) {
            this.setData({room_id: options.room_id})
            console.log("show param room_id:", options.room_id)
        }

        this.setData({userInfo: wx.getStorageSync('userInfo')})
        //拉取qr码url
        var room_id = this.data.room_id

        var that = this
//        wx.getStorage({
//            key: 'userInfo',
//            success: res=> {
//                console.log("111111 getStorage succ, ", res)
//                that.setData({userInfo: res.data})
//                //that.setData({userInfo: "test....."})
//                console.log("userInfo", that.data.userInfo)
//                console.log("show my identity, room_id:", that.data.room_id, " nickName:", that.data.userInfo.nickName)
//            },
//    fail: res=> {
//    console.log("getStorage failed, ", res)
//}
//}) ;

        var that = this
        wx.request({
            // 调用接口C
            url: app.globalData.game_url + "/game/show_identity",
            method: 'POST',
            data: {
                room_id: that.data.room_id,
                nickName: that.data.userInfo.nickName
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success(res)
        {
            console.log("get resp succ, ", res.data)
            if (res.data.ret == 0) {
                that.setData({
                    identity_img: app.globalData.game_url + res.data.identity_img
                })
                console.log("set Data, img: ", that.data.identity_img)
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

}
,

/**
 * 生命周期函数--监听页面显示
 */
onShow: function () {

}
,

/**
 * 生命周期函数--监听页面隐藏
 */
onHide: function () {

}
,

/**
 * 生命周期函数--监听页面卸载
 */
onUnload: function () {

}
,

/**
 * 页面相关事件处理函数--监听用户下拉动作
 */
onPullDownRefresh: function () {

}
,

/**
 * 页面上拉触底事件的处理函数
 */
onReachBottom: function () {

}
,

/**
 * 用户点击右上角分享
 */
onShareAppMessage: function () {

}
})