import util from '../../utils/util'
Page({
    data: {
        latitude: 30.280867,
        longitude: 120.001851,
    },
    onReady(e) {
        // 使用 wx.createMapContext 获取 map 上下文
        this.mapCtx = wx.createMapContext('myMap')
        // this.moveToLocation() //移动到当前位置 //demo EFC
        this.getMaprengion() //获取当前地图的视野范围
        this.setLocMarkerIcon()//设置定位点图标
        // this.addMarkers() //添加mark
    },
    fromScreenLocation() {
        this.mapCtx.fromScreenLocation({
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
    fromCenterLocation() {
        this.mapCtx.getCenterLocation({
            success: res => {
                console.log(`当前屏幕中心坐标经度：${res.longitude},纬度${res.latitude}`)
                util.toast(`当前屏幕中心坐标经度：${res.longitude},纬度${res.latitude}`)
            },
            fail: error => {
                console.log(error)
            },
            complete: comp => {
                console.log(comp)
            }
        })
    },
    mapGetRotate() {
        this.mapCtx.getRotate({
            success: res => {
                util.toast(`旋转角:${res.rotate}`)
                console.log(`旋转角：${res.rotate}`)
            },
            fail: error => {
                console.log(error)
            },
            complete: comp => {
                console.log(comp)
            }
        })
    },
    addMarkers() {
        const marker = {
            id: 1,
            iconPath: '../../images/icon1s.png',
            width: 50,
            height: 50,
            joinCluster: true, // 指定了该参数才会参与聚合
            label: {
                width: 50,
                height: 30,
                borderWidth: 1,
                borderRadius: 10,
                bgColor: '#ffffff'
            }
        }

        const positions = [
            {
                latitude: 30.280867,
                longitude: 120.003851,
            },
            {
                latitude: 30.280867,
                longitude: 120.001851,
            }, {
                latitude: 30.282867,
                longitude: 120.001851,
            }
        ]
        const markers = []
        positions.forEach((p, i) => {
            const newMarker = Object.assign(marker, p)
            newMarker.id = i + 1
            newMarker.label.content = `label ${i + 1}`
            markers.push(newMarker)
            this.mapCtx.addMarkers({
                markers,
                clear: false,
                complete(res) {
                    console.log('addMarkers', res)
                }
            })
        })
    },

    removeMarkers() {
        this.mapCtx.addMarkers({
            clear: true,
            markers: []
        })
    },
    getCenterLocation() {
        this.mapCtx.getCenterLocation({
            success: res => {
                console.log(`经度${res.longitude},纬度${res.latitude}`)
                util.toast(`经度${res.longitude},纬度${res.latitude}`)
            }
        })
    },
    getMaprengion() {
        // 获取当前地图的视野范围
        this.mapCtx.getRegion({
            success: res => {
                console.log(`东北角经纬度${res.northeast.longitude},纬${res.northeast.latitude}`)
                console.log(`西南角经纬度${res.southwest.longitude},纬${res.southwest.latitude}`)
            }
        })
    },
    openMapAppAPI() {
        // 唤起地图app
        this.mapCtx.openMapApp({
            longitude: 120.10871664976683,
            latitude: 30.300497069454014,
            destination: '西溪银泰',
            success: res => {
                console.log(`东北角经纬度${res.northeast.longitude},纬${res.northeast.latitude}`)
                console.log(`西南角经纬度${res.southwest.longitude},纬${res.southwest.latitude}`)
            },
            fail: error => {
                console.log(error)
            }
        })
    },
    setLocMarkerIcon() {
        // 设置定位点图片
        this.mapCtx.setLocMarkerIcon({
            iconPath: '../../images/icon4s.png',
            success: res => {
                console.log(222, res)
            },
            fail: error => {
                console.log(333, error)
            }
        })
    },
    moveToLocation() {
        // 将地图中心移置当前定位点，此时需设置地图组件 show-location 为true。'2.8.0' 起支持将地图中心移动到指定位置。
        // 移动坐标范围 +-50
        this.mapCtx.moveToLocation({
            longitude: 120.001851,
            latitude: 30.280867,
            success: res => {
                // console.log(res)
            },
            fail: error => {
                // console.log(error)
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