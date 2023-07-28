Page({
  data: {
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
  },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        
    },
    toFood:function(opotions){
        wx.navigateTo({
          url: '../food_menu/food_menu',
        })
    },
    toList:function(opotions){
        wx.navigateTo({
          url: '../list/list',
        })
    },
    toRubbish:function(opotions){
        wx.navigateTo({
          url: '../rubbish_sorting/rubbish_sorting',
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
