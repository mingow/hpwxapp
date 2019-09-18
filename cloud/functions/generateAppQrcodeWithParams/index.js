const cloud = require('wx-server-sdk')
const request = require('request');

cloud.init()

exports.main = async () => {
  const wxContext = cloud.getWXContext()

  const res = await cloud.callFunction({
    name:'getAccessToken',
    data:{}
  });

  try {
    const result = await cloud.openapi.wxacode.getUnlimited({
        scene: 'a=1'
      })
    //console.log(result)
    return result
  } catch (err) {
    console.log(err)
    return err
  }

  //return res.result.access_token;
}
