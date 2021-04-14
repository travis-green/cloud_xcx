import util from '../../utils/util'
Page({
    onReady(e) {
        // 使用 wx.createMapContext 获取 map 上下文
        this.mapCtx = wx.createMapContext('myMap')
        this.moveToLocation()
    },
    getCenterLocation() {
        this.mapCtx.getCenterLocation({
            success: res => {
                console.log(`经度${res.longitude},纬度${res.latitude}`)
                util.toast(`经度${res.longitude},纬度${res.latitude}`)
            }
        })
    },
    moveToLocation() {
        // 将地图中心移置当前定位点，此时需设置地图组件 show-location 为true。'2.8.0' 起支持将地图中心移动到指定位置。
        // 移动坐标范围 +-50
        this.mapCtx.moveToLocation({
            longitude: 120.00185182647678,
            latitude: 30.28086784519639,
            success: res => {
                console.log(res)
            },
            fail: error => {
                console.log(error)
            }
        })
    },
    translateMarker: function () {
        this.mapCtx.translateMarker({
            markerId: 0,
            autoRotate: true,
            duration: 1000,
            destination: {
                latitude: 23.10229,
                longitude: 113.3345211,
            },
            animationEnd() {
                console.log('animation end')
            }
        })
    },
    includePoints: function () {
        this.mapCtx.includePoints({
            padding: [10],
            points: [{
                latitude: 23.10229,
                longitude: 113.3345211,
            }, {
                latitude: 23.00229,
                longitude: 113.3345211,
            }]
        })
    }
})