// index.js
import request from "../../utils/request";
const app=getApp()
Page({
    data:{
        charts:[],
        sessionid:'',
        username:'',
        useravatar:'',
        id:0,
        treecount:0,

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getDataFromServer();
        this.setData({
            sessionid:app.globalData.sessionid,
            username:app.globalData.username,
            useravatar:app.globalData.useravatar
        })
        this.postS()
    },
    async getDataFromServer(){
        let result=await request('http://47.120.14.52:8081/all');
        console.log(result);
        this.setData({charts:result})
    },
    postS:function(opotions) {
        console.log(app.globalData.sessionid),
        this.setData({
            sessionid:app.globalData.sessionid,
        })
        console.log(this.data.sessionid)
        
    },
    toCharts:function(opotions){
        wx.navigateTo({
          url: '../charts/charts',
        })
    },
    onShow() {
        let that=this
        that.setData({
            username:app.globalData.username,
            useravatar:app.globalData.useravatar,
            sessionid:app.globalData.sessionid,

        })
    },
})

