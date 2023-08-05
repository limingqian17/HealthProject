// pages/home/home.js
const app=getApp()
Page({
    data: {
        nbFrontColor: '#000000',
        nbBackgroundColor: '#ffffff',
        /*登录 */
        isLogin:false,
        username:'',
        useravatar:'',
        userInfo:[],
        sessionid:'',
        code:'',
        /**弹出 */
        typeF: false,
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
                  }),
                  console.log('执行登录');
                  wx.login({
                      "provider": 'weixin',
                      "onlyAuthorize": true,
                      success: function(event) {
                          console.log('获取code成功');
                          const {
                              code
                          } = event
                          // 打印出code
                          console.log(code);
                          /**  */ 
                          console.log(code)
                            wx.request({
                            url: `http://47.120.14.52:8081/login?${code}`,
                            data: {
                                code: code,
                            },
                            header: {
                              "Content-Type": "application/x-www-form-urlencoded"
                            },
                            method: "POST",

                            success: function(res) {
                              console.log(code);
                              console.log('上传成功，返回内容是: ', res.data);
                              app.globalData.sessionid=res.data.sessionid;
                              app.globalData.username=res.data.username;
                              app.globalData.useravatar=res.data.useravatar;
                              app.globalData.userarea=res.data.userarea;
                              app.globalData.userdate=res.data.userdate;
                              that.setData({
                                username:res.data.username,
                                useravatar:res.data.useravatar,
                                sessionid:res.data.sessionid
                              })
                              console.log(app.globalData.username)
                              console.log(app.globalData.sessionid);
                              wx.showToast({
                                title: '登录成功'
                              });
                            },
                            fail: function(res) {
                              console.log("上传服务器失败", res);
                              wx.showToast({
                                title: '登录失败'
                              });
                            },
                            complete:function(){
                        }
                    }); 
                         },
                         fail: function(e) {
                             console.log(e.code);
                             
                         }
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

    toSet:function(opotions){
        wx.navigateTo({
          url: '../settings/settings',
        })
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
        let that=this
        that.setData({
            username:app.globalData.username,
            useravatar:app.globalData.useravatar,
            sessionid:app.globalData.sessionid
        })
        console.log(that.data.useravatar)
        console.log(that.data.username)
        /**        wx.request({
            url: 'http://47.120.14.52:8081/updatauser',
            method: 'POST',
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
          });*/
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
        /**if(app.globalData.sessionid){
            wx.request({
              url: 'url',
            })
        } */
        let that=this
        that.setData({
            username:app.globalData.username,
            useravatar:app.globalData.useravatar,
            sessionid:app.globalData.sessionid
        })
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