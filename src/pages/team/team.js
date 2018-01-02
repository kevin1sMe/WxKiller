// pages/team/team.js
const app = getApp()


Page({

    /**
     * 页面的初始数据
     */

    data: {
        room_id: 13,
        room_info: null,
        //killer_array: ['0','1','2','3','4'],
        killer_array: [],
        killer_index: 0,
        police_index: 0,
        judge_index: 0,

        player_list: [],
        total_player: 0,
        killer_num:0,
        police_num:0,
        civilian_num:4,
        judge_name: '大法官'
    },

    bindKillerChange: function(e) {
        console.log("杀手picker idx为：", e.detail.value)
        var killer_num = this.data.killer_array[e.detail.value]
        var civilian_num = this.data.total_player - killer_num - this.data.police_num
        this.setData({
            killer_index: e.detail.value,
            civilian_num: civilian_num,
            killer_num: killer_num

        })
    },
    bindPoliceChange: function(e) {
       console.log("警察picker idx为：", e.detail.value)
        var police_num = this.data.killer_array[e.detail.value]
        var civilian_num = this.data.total_player - police_num - this.data.killer_num
        this.setData({
           police_index: e.detail.value,
           police_num: police_num,
            civilian_num: civilian_num
        })
    },
    bindJudgeChange: function(e) {
       console.log("法官picker idx为：", e.detail.value)
        this.setData({
           judge_index: e.detail.value,
           judge_name: this.data.player_list[e.detail.value]
        })
    },


    ToPreview: function () {

        //var post_data = {
        //    room_id: this.data.room_id,
        //        total_player: this.data.total_player,
        //        killer_num: this.data.killer_num,
        //        police_num: this.data.police_num,
        //        civilian_num: this.data.civilian_num,
        //        judge_name: this.data.judge_name
        //}
        //
        //var post_data_str = JSON.parse(JSON.stringify(post_data))
        var post_data = 'room_id=' + this.data.room_id + '&total_player=' + this.data.total_player
                + '&killer_num=' +  this.data.killer_num
                + '&police_num=' + this.data.police_num
                + '&civilian_num=' + this.data.civilian_num
                + '&judge_name=' +  encodeURIComponent(this.data.judge_name)

        console.log("post_data:", post_data)

        wx.navigateTo({
            url: '../start_preview/preview?' + post_data
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
                    var room_info =  JSON.parse(res.data.room_info)
                    var members =  room_info.members
                    var player_list = []
                    for(var i=0; i < members.length; ++i) {
                        console.log("memers[", i, "] = ", members[i])
                       player_list.push(members[i].nickName)
                    }
                    var rnd_idx = Math.floor(Math.random(0, player_list.length) * player_list.length)
                    var judge_name = player_list[rnd_idx]

                    //杀手，警察人数上限，为n/3
                    var killer_max = (player_list.length - 1) /3
                    console.log("rnd_idx:", rnd_idx, " judge_name:", judge_name, "killer_max:", killer_max)
                    var killer_range = []
                    for(var i=0; i < killer_max; ++i) {
                       killer_range.push(i)
                    }

                    that.setData({
                        room_info: room_info,
                        player_list: player_list,
                        judge_index: rnd_idx,
                        judge_name: judge_name,
                        killer_array: killer_range,
                        total_player: player_list.length - 1,
                        civilian_num: player_list.length - 1
                    })
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

        console.log("onPullDownRefresh")
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