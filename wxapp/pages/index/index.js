//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    getHeadText:'获取头像昵称',
    mutuusUiDec:'MutuusUI 是一套基于WeUI原生样式开发的样式库，',
    
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








  // ,

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