const cloud = require('wx-server-sdk')
const request = require('request');

cloud.init()

exports.main = async (event,context) => {
  const wxContext = cloud.getWXContext()

  //获取用户的openid
  const {OPENID} = wxContext;

  try {
    const result = await cloud.openapi.wxacode.getUnlimited({
        scene: OPENID,
        is_hyaline:true
      })
    //console.log(result)
    return result
  } catch (err) {
    console.log(err)
    return err
  }

  //return res.result.access_token;
}
