const cloud = require('wx-server-sdk')
const request = require('request');

cloud.init()

let appid ='wxf5d215ac1ad09a41';//微信公众号开发者id
let secret ='78348a332e161861a89d884802bbee60';//微信公众号开发者secret_key

let token_url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+appid+'&'+'secret='+secret;






exports.main = async () => {
  const wxContext = cloud.getWXContext()



  const rp = (url) =>
    new Promise((resolve, reject) => {
      request(url, (error, response, body) => {
        if (error) {
          reject(error);
        }
        resolve(response);
      });
    });
  const result = await rp(token_url);
  return (typeof result.body === 'object') ? result.body : JSON.parse(result.body);

}
