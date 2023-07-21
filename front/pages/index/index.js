// index.js
import request from "../../utils/request";
Page({
    data:{
        charts:[]
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getDataFromServer();
    },
    async getDataFromServer(){
        let result=await request('http://47.120.14.52:8081/all');
        console.log(result);
        this.setData({charts:result})
    },
    
    toCharts:function(opotions){
        wx.navigateTo({
          url: '../charts/charts',
        })
    }
})

