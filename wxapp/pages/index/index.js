//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    getHeadText:'获取头像昵称',
    mutuusUiDec:'MutuusUI 是一套基于WeUI原生样式开发的样式库，后续将推出过多配色方案。',
    
    list: [
      {
        id: 'form',
        name: '表单',
        open: false,
        pages: ['button', 'list', 'input', 'slider', 'uploader']
      },
      {
        id: 'widget',
        name: '基础组件',
        open: false,
        pages: ['article', 'badge', 'flex', 'footer', 'gallery', 'grid', 'icons', 'loadmore', 'panel', 'preview', 'progress']
      },
      {
        id: 'feedback',
        name: '操作反馈',
        open: false,
        pages: ['actionsheet', 'dialog', 'msg', 'picker', 'toast']
      },
      {
        id: 'nav',
        name: '导航相关',
        open: false,
        pages: ['navbar', 'tabbar']
      },
      {
        id: 'search',
        name: '搜索相关',
        open: false,
        pages: ['searchbar']
      }
    ]
  },
  kindToggle: function (e) {
    let id = e.currentTarget.id, list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list: list
    });
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  // 获取用户信息
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})








// 滚动到顶部

// <view class="floatbtn">
//   <view id="back-to-top" class="back-to-top">
//     <image class='arrow-up' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAkCAMAAADip6m2AAAAolBMVEUAAAAAAAAAAAAAAAAAAAABAQEAAAAAAAAHBwcAAAD////9/f37+/vt7e25ubn39/cKCgrz8/Pe3t7c3Nz+/v729vbW1tZra2tKSkoAAABpaWlgYGD9/f38/Pz5+fn5+fn39/fz8/Px8fHu7u7q6urm5ubj4+Pd3d3y8vLX19fJycnAwMC4uLisrKyhoaGVlZWGhoajo6MpKSkxMTGAgID///9oDYyzAAAANXRSTlMAAwcLFR0SGRAO+efJbSOcIqBDQvLNbTEpGxEQ9e3h29XDvLOsnJOJiIFpYVlNRkE7MiwfDLl52bwAAAGFSURBVEjH3ZXZboMwFERbHAMhC6EFQtrs+777/3+t98bGjmwqy32plHmLPYfMiYTy9nJ5F/kb693j+O4h7Y567SZjzbYHuDv72WCQxgfSjixpReyRqEWAdmK/YyaTfAHtpivjIo6TUReTZYxxcZzupju/XufP4g660aYD2USmuF13sKeP7Ae6uF13fKZBDRLQ81gTt+rOCmD9MPSBLmaauEV3hWidQOqIr57FLbrpDllCPAghSO9SU7xad3QCNiRQgwAeAn0a6eLVutOC4mRk+SCcToupIW7qsmWnByw25B3Svc6SaeKGbn9LA8UqGsW3fVMc2VJ3eJS6apcUPw5LcVmAq1J30qWBL1mN9gPanZTiUBE3pe5C6cpo4gtRjXkJjtf8cbnSlTHEcz5yTTwBh00UOVToVogfGvibhQq+pCyr0q0Wz1h6kTDsyZObPvn36bckh6qA8YE1eIUEa6GxyyeKEzhC1MLy6byL3yNP4BNn7TSWVRffHYHaI7qq7PB3qMr/mh8s20b2bOZlXQAAAABJRU5ErkJggg==' />
//   </view>
// </view>

// .floatbtn {
//   position: fixed;
//   right: 2%;
//   bottom: 20rpx;
//   width: 60rpx;
//   text-align: center;
//   z-index: 999;
// }
// .floatbtn .back-to-top{
//   cursor: pointer;
//   background: rgba(0,0,0,.5);
//   border-radius: 5rpx;
//   width: 60rpx;
//   height: 60rpx;
//   line-height: 60rpx;
//   color: rgba(255,255,255,.7);
//   display: block;
//   position: relative;
//   margin: .5rem 0;
// }
// .floatbtn .back-to-top .arrow-up{
//   width:40rpx;
//   height:25rpx;
//   position: relative;
// }





  // "pages/button/button",
  // "pages/list/list",
  // "pages/input/input",
  // "pages/slider/slider",
  // "pages/uploader/uploader",
  // "pages/article/article",
  // "pages/badge/badge",
  // "pages/flex/flex",
  // "pages/footer/footer",
  // "pages/gallery/gallery",
  // "pages/grid/grid",
  // "pages/icons/icons",
  // "pages/loadmore/loadmore",
  // "pages/panel/panel",
  // "pages/preview/preview",
  // "pages/progress/progress",
  // "pages/actionsheet/actionsheet",
  // "pages/dialog/dialog",
  // "pages/msg/msg",
  // "pages/msg/msg_success",
  // "pages/msg/msg_fail",
  // "pages/picker/picker",
  // "pages/toast/toast",
  // "pages/navbar/navbar",
  // "pages/tabbar/tabbar",
  // "pages/searchbar/searchbar"


  // ,
  // {
  //   id: 'log',
  //   name: '日志',
  //   open: false,
  //   pages: ['log']
  // }