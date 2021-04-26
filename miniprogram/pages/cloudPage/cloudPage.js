const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {

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
  async handleOpen() {
    // wx.cloud.callFunction({
    //   name: "oprationDb",
    //   success: res => {
    //     console.log(res)
    //   }
    // })
    // wx.cloud.callFunction({
    //   name: 'oprationDb',
    //   data: {},
    //   success: res => {
    //     console.log(222)
    //     console.log(res)
    //   },
    //   fail: err => {
    //     console.error('[云函数] [login] 调用失败', err)
    //     // 失败业务处理
    //   }
    // })
    db.collection('data').where({
      filed1: "1123123"
    }).get({
      success: res => {
        console.log(res)
      }
    })
    // get({
    //   success: res => {
    //     console.log(222, res)
    //   }
    // })
    // db.collection('data').add({
    //   // data 字段表示需新增的 JSON 数据
    //   data: {
    //     done: '1111'
    //   },
    //   success: function (res) {
    //     // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
    //     console.log(111, res)
    //   }
    // })
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