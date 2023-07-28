// pages/login/login.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        imageSrc:'',
        userInfo: {
            avatarUrl: '',
            name: '',
            gender: ''
            // 其他个人信息字段,这些信息应该从数据库获取
          },
          files: [{
            url: 'http://mmbiz.qpic.cn/mmbiz_png/VUIF3v9blLsicfV8ysC76e9fZzWgy8YJ2bQO58p43Lib8ncGXmuyibLY7O3hia8sWv25KCibQb7MbJW3Q7xibNzfRN7A/0',
        }],
        showDialog: false,
        actionSheetItems: ['查看头像', '更换头像'],
        buttons: [{ text: '取消' }, { text: '确定' }],
        date: "2000-01-01",
        region: ['江苏省', '南京市', '栖霞区'],
        customItem: '全部'
    },
    bindRegionChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
          region: e.detail.value
        })
      },
    openConfirm: function () {
        this.setData({
            dialogShow: true
        })
    },
    tapDialogButton(e) {
        this.setData({
            dialogShow: false,
            showOneButtonDialog: false
        })
    },
    bindDateChange: function (e) {
        this.setData({
            date: e.detail.value,
            [`formData.date`]: e.detail.value
        })
    },
    bindDateChange: function (e) {
        this.setData({
            date: e.detail.value,
            [`formData.date`]: e.detail.value
        })
    },
    chooseImage: function() {
        var that = this;
        wx.chooseImage({
          count: 1, // 最多可以选择的图片张数
          sizeType: ['original', 'compressed'], // 选择图片的尺寸类型
          sourceType: ['album', 'camera'], // 选择图片的来源
          success: function(res) {
            // 选择图片成功后的操作
            var tempFilePaths = res.tempFilePaths;
            that.setData({
              imageSrc: tempFilePaths[0] // 更新 imageSrc 数据
            });
            that.uploadImage(tempFilePaths[0]); // 调用上传图片方法
          }
        })
    },
    uploadImage: function(filePath) {
        var that = this;
        wx.uploadFile({
          url: '上传图片的接口地址', // 要上传的服务器地址
          filePath: filePath, // 要上传文件资源的路径
          name: 'file', // 文件对应的 key 值
          success: function (res) {
            // 上传图片成功后的操作
            var data = res.data;
            // 处理返回的数据
          }
        })
    },
    /**chooseImage: function() {
        this.setData({
            selectFile: this.selectFile.bind(this),
            uplaodFile: this.uplaodFile.bind(this)
        });
        var that = this;
        wx.chooseImage({
          count: 1, // 最多可以选择的图片张数
          sizeType: ['original', 'compressed'], // 选择图片的尺寸类型
          sourceType: ['album', 'camera'], // 选择图片的来源
          success: function(res) {
            // 选择图片成功后的操作
            var tempFilePaths = res.tempFilePaths;
            that.setData({
                imageSrc: tempFilePaths[0] // 更新 imageSrc 数据
            });
            that.uploadImage(tempFilePaths[0]); // 调用上传图片方法
          }
        })
    },
    uploadImage: function(filePath) {
        var that = this;
        wx.uploadFile({
          url: '上传图片的接口地址', // 要上传的服务器地址
          filePath: filePath, // 要上传文件资源的路径
          name: 'file', // 文件对应的 key 值
          success: function (res) {
            // 上传图片成功后的操作
            var data = res.data;
            // 处理返回的数据
          }
        })
    }, */
    showActionSheet: function() {
        var that=this;
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
                that.chooseImage();
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
                imageSrc:res.userInfo.avatarUrl
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