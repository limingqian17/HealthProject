// pages/login/login.js
const app=getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        imageSrc:'',
        dialogShow: false,
        buttons: [{ text: '取消'}, { text: '确定'}],


        showDialog: false,
        actionSheetItems: ['查看头像', '更换头像'],

        userdate: '',
        username:'',
        userarea:'',
        useravatar:'',
        
        nickname:'',
        region: '',
        m:[],
        tempFilePaths: [],
        customItem: '全部'
    },
    /**
     * 修改地区
     */
    bindRegionChange: function (e) {
    //    let that=this
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
          region: e.detail.value,
          userarea:e.detail.value.join(',')
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
    /**
     * 修改日期
     */
    bindDateChange: function (e) {
        let that=this
        this.setData({
            userdate: e.detail.value,
            [`formData.date`]: e.detail.value
        })
        console.log(that.data.userdate)
    },
    /**
     * 修改头像
     */
    //选择图片
    ChooseImg: function () {
        let that = this;
        wx.chooseImage({
          count: 1, // 默认最多9张图片，可自行更改
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success(res){
            wx.showToast({
              title: '正在上传...',
              icon: 'loading',
              mask: true,
              duration: 1000
            })/** */
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            console.log(res.tempFilePaths)
            let tempFilePath = res.tempFilePaths;
            that.setData({
              tempFilePaths: tempFilePath
            });
            console.log(that.data.tempFilePaths);
            that.getLinkImg();
          }
        })
      },
      //获取图片链接
      getLinkImg:function () {
          let that=this;
          console.log(that.data.tempFilePaths);
          wx.uploadFile({
                filePath: that.data.tempFilePaths[0],
                name: 'files',
                url: 'http://47.120.14.52:8081/upload',
                header: {
                //  "Content-Type": "application/x-www-form-urlencoded"
                  "Content-Type": "multipart/form-data"
                },
                success(res){
                    that.data.m=res.data.split('"'),
                    that.data.m=that.data.m.splice(1, 1),
                    that.setData({
                        tempFilePaths:that.data.m,
                        useravatar:that.data.m[0],
                    });
                    console.log(that.data.tempFilePaths);
                    console.log(that.data.useravatar);
                 //   that.upLoadImg();
                }
              })
      },
     //预览图片
      PreviewImg: function (e) {
        let that = this;
        console.log(that.data.tempFilePaths)
        wx.previewImage({
          urls: that.data.tempFilePaths,
        })
        /**
         * 
        //let index = e.target.dataset.index;  //js内部函数间的调用为什么不行
        //current: that.data.tempFilePaths[index],        
        //console.log(that.data.tempFilePaths[index]);
        //console.log(that.data.tempFilePaths); */
      },  
    showActionSheet: function() {
        var that=this;
        wx.showActionSheet({
          itemList: this.data.actionSheetItems,
          success: function (res) {
            switch (res.tapIndex) {
              case 0: 
                // 选项1的功能实现
                that.PreviewImg();
                break;
              case 1:
                // 选项2的功能实现
                that.ChooseImg();
                break;
            }
          },
          fail: function (res) {
            console.log(res)
          }
        })
    },
    /**
     * 昵称
     */
    openConfirm: function () {
        this.setData({
            dialogShow: true
        })
    },
    handleInput(event) {
        // 获取用户输入的昵称
         this.setData({
          nickname: event.detail.value,
        });    
        console.log(this.data.nickname)
      },
      tapDialogButton(e) {
        let that=this
        const btn = e.detail.item.text;
/**        success:function (btn) {
            switch(btn){
                case '确定':
                    this.setData({
                        username:that.data.nickname
                    });
                    break;
                case '取消':
                    this.setData({
                        username:that.data.username
                    });
                    break;
            }
        },
        fail{

        } */
        if(btn == '确定'){   
            this.setData({
                username:that.data.nickname
            })
        //    this.handleSubmit();
        }else{
            console.log(that.data.username)
            this.setData({
                username:that.data.username
            })
        }
        this.setData({
            dialogShow: false,
          })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    save:function(){
        let that=this
        wx.request({
            url: 'http://47.120.14.52:8081/updatauser',
            method: 'POST',
            data: {
                "userarea":that.data.userarea,
                "userdate":that.data.userdate,
                "useravatar":that.data.useravatar,
                "username": that.data.username,
            },
            header: {
              "Content-Type": "application/json; charset=UTF-8",
              "sessionid":app.globalData.sessionid
            },
            success: (res) => {
              // 修改成功后的处理逻辑
              wx.showToast({
                title: '信息修改成功！',
                icon: 'success',
              });
              console.log(res.data)
              app.globalData.userdate=that.data.userdate
              app.globalData.useravatar=that.data.useravatar
              app.globalData.username=that.data.username
              app.globalData.userarea=that.data.userarea
              console.log(app.globalData.username)
            },
            fail: (error) => {
              // 修改失败后的处理逻辑
              wx.showToast({
                title: '信息修改失败！',
                icon: 'none',
              });
              console.error(error);
            },
          });
    },
    onLoad(options) {
        let that=this
        this.setData({
            userdate: app.globalData.userdate,
            useravatar:app.globalData.useravatar,
            username:app.globalData.username,
            userarea:app.globalData.userarea,
            nickname:app.globalData.username,
            region:app.globalData.userarea.split(',')  
        })
        that.data.tempFilePaths=[that.data.useravatar]
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