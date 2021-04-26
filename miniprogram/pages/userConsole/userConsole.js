// pages/userConsole/userConsole.js
Page({

  data: {
    openid: ''
  },

  onLoad(options) {
    this.setData({
      openid: getApp().globalData.openid
    })
  },
  handleOpen(e) {
    // console.log(e.target.dataset.clicknum)
    switch (Number(e.currentTarget.dataset.clicknum)) {
      case 1:
        this.handleOpenMapPage()
        break;
      case 2:
        this.handleOpenMovable()
        break;
      case 3:
        this.handlePagecontainer()
        break;
      case 4:
        this.handleOpenShareElement()
        break;
      case 5:
        this.handleOpenSwiper()
        break;
    }
  },
  handleOpenMapPage() {
    wx.navigateTo({
      url: '/pages/mapPage/mapPage'
    })
  },
  handleOpenSwiper() {
    wx.navigateTo({
      url: '/pages/swiper/swiper'
    })
  },
  handleOpenShareElement() {
    wx.navigateTo({
      url: '/pages/shareelement/shareelement'
    })
  },
  handleOpenMovable() {
    wx.navigateTo({
      url: '/pages/movable/movable',
      success: (result) => {
        console.log(result)
      },
      fail: () => {},
      complete: () => {}
    })
  },
  handlePagecontainer() {
    wx.navigateTo({
      url: '/pages/pagecontainer/pagecontainer',
      success: (result) => {
        console.log(result)
      },
      fail: () => {},
      complete: () => {}
    })
  }
})