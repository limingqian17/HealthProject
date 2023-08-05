Page({
    data: {
      foodName: "",
      calories: null
    },
  
    inputFoodName(event) {
      this.setData({
        foodName: event.detail.value
      });
    },
  
    inputCalories(event) {
      this.setData({
        calories: parseFloat(event.detail.value)
      });
    },
  
    calculateCalories() {
      const { foodName, calories } = this.data;
  
      if (!foodName || isNaN(calories)) {
        wx.showToast({
          title: "请输入有效的食物名称和卡路里数值",
          icon: "none"
        });
        return;
      }
  
      const data = {
        foodName: foodName,
        calories: calories
      };
  
      this.sendDataToBackend(data);
    },
  
    sendDataToBackend(data) {
      // 这里使用示范的URL，实际应替换为您的后端接口URL
      const backendURL = "https://your-backend-api.com/save-calories";
  
      wx.request({
        url: backendURL,
        method: "POST",
        header: {
          "Content-Type": "application/json"
        },
        data: data,
        success: (res) => {
          wx.showToast({
            title: "数据已保存到后端",
            icon: "success"
          });
        },
        fail: (error) => {
          console.error("保存数据时出错：", error);
          wx.showToast({
            title: "保存数据时出错，请稍后再试",
            icon: "none"
          });
        }
      });
    }
  });
  