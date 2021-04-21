//index.js
//获取应用实例
const app = getApp()
import util from '../../utils/util'

Page({
  data: {
    btntype: 4, //按钮类型,修改此类型 查看不同的button 类型1 获取openid-云函数， 2获取用户信息-旧， 3获取用户信息新， 4授权手机号
    visible: false, //actionsheet
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    actions: [{
      name: '拍照'
    },
    {
      name: '从最近聊天中选择'
    },
    {
      name: '从文件中选择'
    },
    {
      name: '图片/视频预览'
    },
    {
      name: '保存图片'
    },
    {
      name: '压缩保存图片'
    },
    ],
    hasUserInfo: false,
    logged: false,
    takeSession: false,
    requestResult: '',
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') // 如需尝试获取用户信息可改为false
  },

  onLoad: function () {
    // console.log(app.globalData)
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true,
      })
    }
  },
  demoajax() {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'http://49.232.88.52/BS-server/VerificationServlet',
        data: {
          key: '1111'
        },
        method: "GET",
        success(res) {
          if (res.statusCode === 200) {
            success && success.apply(this, arguments);
            resolve(res.data)
          } else {
            fail && fail.apply(this, arguments);
            reject(res);
          }
        }
      });
    });
  },
  verify(e) {
    this.demoajax().then(res => {
      console.log(res)
    })
    // wx.request({
    //   url: 'http://49.232.88.52/BS-server/VerificationServlet',
    //   method: 'POST',
    //   data: {
    //     username: this.data.value,
    //     loginMethod: 'miniapp'
    //   },
    //   header: {
    //     //设置参数内容类型为x-www-form-urlencoded
    //     'content-type': 'application/x-www-form-urlencoded',
    //     'Accept': 'application/json'
    //   },
    //   success: function (res) {
    //     console.log("Verification:", res.data)
    //     if (res.data === true) {
    //       glodata.username = that.data.value
    //       console.log("login successfully, username:", that.data.value)
    //       wx.reLaunch({
    //         url: '/pages/main/main',
    //       })
    //     }

    //   }
    // })
    console.log("globalusername:", getApp().globalData.username)
  },
  getUserProfile() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          avatarUrl: res.userInfo.avatarUrl,
          userInfo: res.userInfo,
          hasUserInfo: true,
        })
      }
    })
  },

  onGetUserInfo: function (e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo,
        hasUserInfo: true,
      })
    }
  },
  getPhoneNumber(e) {
    if (e.detail.errMsg === 'getPhoneNumber:ok') {
      console.log(e)
      let { cloudID, encryptedData, iv } = e.detail
      wx.cloud.callFunction({
        name: 'getPhoneNumber',
        data: {
          phoneNumber: wx.cloud.CloudID(e.detail.cloudID)
        },
        success: res => {
          // getPhoneNumber
          console.log(res)
          // util.toast(`${res.result.userInfo.openId}`)
          //业务处理
          // app.globalData.openid = res.result.userInfo.openId
        },
        fail: err => {
          console.error('[云函数] [login] 调用失败', err)
          // 失败业务处理
        }
      })
      //授权了手机号
      // iv endat 给后端解密 返回手机号
    } else {
      //取消了授权
    }
  },
  queryUserInfoold(e) {
    if (e.detail.errMsg === "getUserInfo:ok") {
      console.log(e.detail)
      util.toast(`获取匿名信息成功,${e.detail.userInfo.nickName}`)
      //如果无信息，看下基础库
      //授权成功
      // e.detail 获取iv ，encryptedData
    }
  },
  queryUserInfo(e) {
    //获取新版用户信息
    console.log('获取新版用户信息')
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (userres) => {
        console.log(userres)
        util.toast(`新授权,用户${userres.userInfo.nickName}`)
      },
      fail: (res) => {
        util.toast(res.msg || '获取用户信息失败')
      }
    })
  },
  onGetOpenid() {
    // 调用云函数，登陆
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log(typeof (res.result.userInfo.openId))
        util.toast(`${res.result.userInfo.openId}`)
        //业务处理
        app.globalData.openid = res.result.userInfo.openId
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        // 失败业务处理
      }
    })
  },
  //打开actionsheet
  handleOpen() {
    this.setData({
      visible: true
    })
  },
  jumpToCaramContent() {
    wx.navigateTo({
      url: '../cameraContent/cameraContent'
    })
  },
  //关闭actionsheet
  handleCancel(e) {
    //关闭sheet
    this.setData({
      visible: false
    })
  },
  chooseImageWechatFile() {
    //需要在真机调试
    wx.chooseMessageFile({
      count: 10,
      type: 'image', //type- video, file, image
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFiles[0] //临时地址，记得后端存起来
      }
    })
  },
  onShow() {
    // const performance = wx.getPerformance()
    // const observer = performance.createObserver((entryList) => {
    //   //返回的是list
    //   console.log('性能\n', entryList.getEntries())
    //   // console.log('route: 路由性能；appLaunch: 小程序启动耗时\n', entryList.getEntriesByName("appLaunch", "navigation")[0])
    //   // console.log('firstRender: 页面首次渲染耗时\n', entryList.getEntriesByName("firstRender", "render")[0])
    //   // console.log('evaluateScript: 注入脚本耗时\n', entryList.getEntriesByName("evaluateScript", "script")[0])
    // })
    // observer.observe({ entryTypes: ['render', 'script', 'navigation'] })
  },
  uploadImage() {
    //上传图片-使用云函数
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        wx.showLoading({
          title: '上传中',
        })
        const filePath = res.tempFilePaths[0]
        // 上传图片
        const cloudPath = `my-image${filePath.match(/\.[^.]+?$/)[0]}`
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath

            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })
      },
      fail: e => {
        console.error(e)
      }
    })
  },
  chooseImageNative() {
    wx.chooseImage({
      count: 1, //最多可以选择几张图片。max 9
      sizeType: ['compressed'], //所选的图片的尺寸 original原图 compressed压缩
      sourceType: ['album', 'camera'], //选择图片的来源
      success: res => {
        console.log(res)
      },
      fail: () => {
        console.log('取消上传')
      }
    })
  },
  previewPage() {
    wx.navigateTo({
      url: '../previewHome/previewHome'
    })
  },
  previewImage() {
    wx.previewImage({
      current: '', // 当前显示图片的http链接
      showmenu: false, //是否显示菜单，默认true，不必填
      urls: ['https://n.sinaimg.cn/spider2021219/265/w1280h585/20210219/1c44-kkciesr6557948.png', 'https://n.sinaimg.cn/spider2021219/265/w1280h585/20210219/1c44-kkciesr6557948.png'], // 需要预览的图片http链接列表
      success: res => {
        console.log(res)
      },
      fail: error => {
        console.log(error)
      },
      complete: comp => {
        console.log(comp)
      }
    })
  },
  compressImageAPI() {
    // 压缩并保存图片 慎用 问题不少
    wx.compressImage({
      src: '../../images/icon1.png', // 图片路径，图片的路径，支持本地路径、代码包路径,
      quality: 1, // 压缩质量，范围0～100，数值越小，质量越低，压缩率越高（仅对jpg有效）。
      success: res => {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: saveres => {
            console.log(saveres)
            wx.showToast({
              title: '保存成功',
              icon: 'none'
            })
          },
          fail: (err) => {
            wx.getSetting({
              success: item => {
                let authSetting = item.authSetting
                if (!authSetting['scope.writePhotosAlbum']) {
                  wx.showModal({
                    title: '提示',
                    content: '您未开启保存图片到相册的权限，请点击确定去开启权限！',
                    success(fng) {
                      if (fng.confirm) {
                        wx.openSetting()
                      }
                    }
                  })
                }
              }
            })
            setTimeout(error => {
              console.log(error)
              wx.hideLoading()
            }, 300)
          }
        })
      },
      fail: error => {
        console.log(error)
      },
      complete: comp => {
        console.log(comp)
      }
    })
  },
  savePhoto() {
    wx.getImageInfo({
      src: 'https://xsjy-1254153797.cos.ap-shanghai.myqcloud.com/onlineEdu/66module.png',
      success: res => {
        console.log(res)
        wx.saveImageToPhotosAlbum({
          filePath: res.path,
          success: todo => {
            wx.showToast({
              title: '保存成功',
              icon: 'none'
            })
          },
          fail: (err) => {
            wx.getSetting({
              success: item => {
                let authSetting = item.authSetting
                if (!authSetting['scope.writePhotosAlbum']) {
                  wx.showModal({
                    title: '提示',
                    content: '您未开启保存图片到相册的权限，请点击确定去开启权限！',
                    success(fng) {
                      if (fng.confirm) {
                        wx.openSetting()
                      }
                    }
                  })
                }
              }
            })
            setTimeout(error => {
              console.log(error)
              wx.hideLoading()
            }, 300)
          }
        })
      },
      fail: err => {
        console.log(err)
        wx.showToast({
          title: '生成分享图失败，请稍后重试',
          icon: 'none'
        })
      }
    })
  },
  handleClickItem(e) {
    console.log('点了', e.detail.index)
    switch (e.detail.index) {
      //选了actionsheet的第一个，以此类推
      case 0:
        this.jumpToCaramContent()
        break;
      case 1:
        //从聊天中选择
        this.chooseImageWechatFile()
        break;
      case 2:
        //从微信相册中选择
        this.chooseImageNative()
        break;
      case 3:
        //预览图片/视频
        this.previewPage()
        break;
      case 4:
        //保存图片
        this.savePhoto()
        break;
      case 5:
        //预览图片和视频
        this.compressImageAPI()
        break;
    }
  }
})