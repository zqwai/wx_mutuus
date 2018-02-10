//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // console.log('登录成功');
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    });
    wx.getSystemInfo({
      success: res => {
        // 手机品牌 手机型号
        // this.globalData.brand = res.brand;
        // this.globalData.model = res.model;
        // 设备像素比 屏幕宽度 屏幕高度
        this.globalData.pixelRatio = res.pixelRatio;
        this.globalData.screenHeight = res.screenHeight;
        this.globalData.screenWidth = res.screenWidth;
        // 可使用窗口宽度
        this.globalData.windowWidth = res.windowWidth;
        this.globalData.windowHeight = res.windowHeight;
        // 状态栏的高度
        this.globalData.statusBarHeight = res.statusBarHeight;

        // this.globalData.language = res.language;
        // this.globalData.version = res.version;
        // this.globalData.system = res.system;
        // this.globalData.platform = res.platform;
        // this.globalData.fontSizeSetting = res.fontSizeSetting;
        // this.globalData.SDKVersion = res.SDKVersion;

        // console.log(app.globalData.brand);
        // console.log(app.globalData.model);
        // console.log(app.globalData.pixelRatio);
        // console.log(app.globalData.screenWidth);
        // console.log(app.globalData.screenHeight);
        // console.log(app.globalData.windowWidth);
        // console.log(app.globalData.windowHeight),
        // console.log(app.globalData.statusBarHeight),
        // console.log(app.globalData.language),
        // console.log(app.globalData.version),
        // console.log(app.globalData.system),
        // console.log(app.globalData.platform),
        // console.log(app.globalData.fontSizeSetting),
        // console.log(app.globalData.SDKVersion)
        
      }
    })
    
  },
  globalData: {
    userInfo: null,
  }
})

// app.json 时效设置
// "networkTimeout": {
//   "request": 10000,
//     "connectSocket": 10000,
//       "uploadFile": 10000,
//         "downloadFile": 10000
// },