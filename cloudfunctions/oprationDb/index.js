// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const db = cloud.database()
// 云函数入口函数
db.collection('data').add({
  data:{
    filed1:8888
  }
})
exports.main = async (event, context) => {
  try {
    return await db.collection('data').add({
      data:{
        filed1
      }
    })
  } catch (e) {
    console.log(e)
  }
}