export default(url,data={},method="GET")=>{
    return new Promise((resolve,reject)=>{
        wx.request({
          url,
          data,
          method,
          success: res => {
              console.log("请求成功");
              resolve(res.data);
          },
          fail : err=> {
              console:log("请求失败");
              reject(err);
          }
        })
    })
}