// pages/home/home.js
Page({
    data: {
        nbFrontColor: '#000000',
        nbBackgroundColor: '#ffffff',
        /*登录 */
        isLogin:false,
        userInfo: {},
        username:'',
        /**弹出 */
        typeF: false
    },
    
    getUserInfo: function(e) {
        let that = this;
        // console.log(e)
        // 获取用户信息
        wx.getSetting({
          success(res) {
            // console.log("res", res)
            if (res.authSetting['scope.userInfo']) {
              console.log("已授权=====")
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称
              wx.getUserInfo({
                success(res) {
                  console.log("获取用户信息成功", res)
                  that.setData({
                    username: res.userInfo.nickName,
                    userInfo: res.userInfo,
                    isLogin:true
                  })
                },
                fail(res) {
                  console.log("获取用户信息失败", res)
                }
              })
            } else {
              console.log("未授权=====")
            }
          }
        })
      },
      register(){
          this.getUserInfo();
      },


    toLogin:function(opotions){
        wx.navigateTo({
          url: '../login/login',
        })
    },
    openTypeF: function () {
        this.setData({
            typeF: true
        })
    },
    
    /**
     * 页面的初始数据
     */
    
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            nbTitle: '个人信息',
            nbFrontColor: '#ffffff',
            nbBackgroundColor: '#00dd77',
      })
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