// pages/loading/loading.js

const app = getApp()

function _next() {
    var that = this
    if (that.data.value >= 99 && this.data.finished) {
        that.setData({
            value: 100
        });

        console.log("create finished, loading end..")
        wx.navigateTo({
            url: '../game/game?room_id=' + that.data.room_id
        })
        return true;
    }

    if (that.data.value < 99) {
        that.setData({
            value: ++that.data.value
        });
    }

    //console.log("value:", this.data.value)
    setTimeout(function () {
        _next.call(that);
    }, 20);
}

Page({

    /**
     * 页面的初始数据
     */
    data: {
        finished: false,
        room_id: 0,
        value: 50
    },


    ToGame: function (room_id) {
        console.log("ToGame(), room_id:", room_id)
        var that = this
        this.setData({
            room_id: room_id
        })
        //创建对局
        wx.request({
                url: app.globalData.game_url + "/game/start_game",
                method: 'POST',
                data: {
                    room_id: room_id,
                    nickName: app.globalData.userInfo.nickName
                },
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                success: function (res) {
                    console.log(res.data)
                    if (0 == res.data.ret) {
                        that.setData({
                            finished: true
                        })
                    }

                },
            fail : function (res) {
                console.log("开始游戏失败, room_id", room_id)
            }
        })
},


/**
 * 生命周期函数--监听页面加载
 */
onLoad: function (args) {
    console.log("loading...show param args:", args)
    if (args.room_id != undefined) {
        this.ToGame(args.room_id)
    }
},

/**
 * 生命周期函数--监听页面初次渲染完成
 */
onReady: function () {
    if (this.data.finished) return;

    console.log("onReady, finshed:", this.data.finished)

    this.setData({
        value: 0,
        finished: false
    });

    _next.call(this);
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