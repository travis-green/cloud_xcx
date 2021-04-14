// pages/release/release.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    error: '',
    content: '',
    imgList: []
  },
  onLoad: function (options) {

  },
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

  },
  //详情输入框
  contentInput(e) {
    this.setData({
      content: e.detail.value
    })
  },
  //图片选择
  chooseImg(e) {
    wx.chooseMedia({
      success: res => {
        let tempArr = this.data.imgList;
        res.tempFiles.forEach(element => {
          let obj = {
            url: element.tempFilePath,
            type: res.type,
            poster: element.thumbTempFilePath
          }
          if (tempArr.length < 6) {
            tempArr.push(obj);
          }
        });
        this.setData({
          imgList: tempArr
        })
      }
    })
  },
  //删除图片
  delImg(event) {
    const idx = event.currentTarget.dataset.idx;
    let tempArr = this.data.imgList;
    tempArr.splice(idx, 1);
    this.setData({
      imgList: tempArr
    });
  },
  //图片展示
  showDynamicImg(event) {
    wx.previewMedia({
      current: event.target.dataset.num, // 当前显示图片的http链接
      sources: this.data.imgList // 需要预览的图片http链接列表
    })
  },
  //发表
  send() {
    //如果值为空
    if (!this.data.content) {
      this.setData({
        error: '请填写此刻心情'
      });
    } else {
      //发送网络请求 tosth

    }
    console.log("发表");
  }
})