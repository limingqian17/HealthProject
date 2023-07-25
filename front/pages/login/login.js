// pages/login/login.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {
            avatarUrl: '',
            name: '',
            gender: '',
            age: '',
            // 其他个人信息字段,这些信息应该从数据库获取
          },
        showDialog: false,
        actionSheetItems: ['查看头像', '更换头像'],
    
    },
    showActionSheet: function() {
        wx.showActionSheet({
          itemList: this.data.actionSheetItems,
          success: function (res) {
            switch (res.tapIndex) {
              case 0: 
                // 选项1的功能实现
                wx.navigateTo({
                    url: '../hdimg/hgimg'
                })
                break;
              case 1:
                // 选项2的功能实现
                console.log('更换头像');
                break;
            }
          },
          fail: function (res) {
            console.log('close')
          }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.getUserInfo({
            success: res => {
              this.setData({
                'userInfo.avatarUrl': res.userInfo.avatarUrl,
                'userInfo.name': res.userInfo.nickName,
                'userInfo.gender': res.userInfo.gender === 1 ? '男' : '女',
                'userInfo.age': res.userInfo.age
                // 设置其他个人信息字段
              })
            }
          });
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})