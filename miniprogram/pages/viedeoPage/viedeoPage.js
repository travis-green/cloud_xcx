// pages/viedeoPage/viedeoPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  chooseMedia() {
    wx.chooseMedia({
      count: 1, //最多可以选择几张图片。max 9
      mediaType: ['video'], //所选的图片的尺寸 original原图 compressed压缩
      sourceType: ['album', 'camera'], //选择图片的来源
      maxDuration: 10, //拍摄时长
      sizeType: ['compressed'],//仅对 mediaType 为 image 时有效，是否压缩所选文件
      success: res => {
        console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})