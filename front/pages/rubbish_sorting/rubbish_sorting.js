// pages/rubbish_sorting/rubbish_sorting.js
// 假设这里有一些测试和手工专区的帖子内容数据
const testData = [
    { user: "用户A", content: "这是测试专区的帖子内容1" },
    { user: "用户B", content: "这是测试专区的帖子内容2" },
    // 可以继续添加更多帖子内容
  ];
  
  const manualData = [
    { user: "用户X", content: "这是手工专区的帖子内容1" },
    { user: "用户Y", content: "这是手工专区的帖子内容2" },
    // 可以继续添加更多帖子内容
  ];
  
  Page({
    data: {
      currentPosts: testData, // 默认显示测试专区的帖子内容
    },
  
    switchToTestArea() {
      this.setData({ currentPosts: testData });
    },
  
    switchToManualArea() {
      this.setData({ currentPosts: manualData });
    },
  });
  