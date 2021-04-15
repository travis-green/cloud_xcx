const cloud = require('wx-server-sdk')

cloud.init()
console.log(44)
// 云函数入口函数
exports.main = async (event) => {
  return {
    phoneData: event.phoneNumber.data
  }
}
