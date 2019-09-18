import Taro from '@tarojs/taro'
import { AtCalendar,AtCard,AtCheckbox,AtButton } from "taro-ui"
import { View, Text,Picker } from '@tarojs/components'
import './index.scss'

export default class Invitation extends Taro.Component {

  constructor(props){
    super(props);
    this.state = {
      height: 500,
      context:''
    };
  }

  generateQrcode(){
    wx.cloud.callFunction({
      name:'generateAppQrcodeWithParams',
      data:{},
      success: res => {
        console.log(res);
        if(!res.result.errCode){
          var fsm = wx.getFileSystemManager();
          var data = '';
          if(res.result.buffer instanceof ArrayBuffer){
            data = new Uint8Array(res.result.buffer);
          }else{
            data = res.result.buffer.data;
          }
          let base64Data = wx.arrayBufferToBase64(data);

          fsm.writeFile({
            filePath: wx.env.USER_DATA_PATH + '/test.png',
            data: base64Data,     //去除base64头部格式文字,我使用的是'data:image/png;base64', jpeg的话是slice(23)
            encoding: 'base64',
            success: res => {
              let nimgs = wx.env.USER_DATA_PATH + '/test.png';
              let qrPath = `${wx.env.USER_DATA_PATH}/qr_share.png`;
              // wx.downloadFile({
              //   url:nimgs,
              //   filePath:qrPath,
              //   success: res => {
              //     console.log(res);
              //   }
              // })


              console.log(nimgs);
              wx.getImageInfo({
                src: nimgs,
                success (res) {
                  console.log(res.path);
                  const ctx = wx.createCanvasContext('canvas')
                  ctx.drawImage(res.path, 0, 0, 240, 240);
                  ctx.draw();
                },
                fail:err => {
                  console.log(err);
                }
              })

              // const ctx = wx.createCanvasContext('canvas')
              // ctx.drawImage(nimgs, 340 * 0.5 - 46, 400 * 0.15, 105, 105)
              // ctx.draw()

            },
            fail: err => {
              console.log(err);
            }
          })
        }
      }
    })
  }

  componentDidMount () {
    this.generateQrcode();

  }

  action () {
    let nimgs = wx.env.USER_DATA_PATH + '/test.png';
    wx.getImageInfo({
      src: nimgs,
      success (res) {
        const ctx = wx.createCanvasContext('canvas')
        console.log(res.path);
        ctx.drawImage(res.path, 0, 0, 360, 360);
        ctx.draw();
      },
      fail:err => {
        console.log(err);
      }
    })
  }

  componentWillMount () {
    var own = this;

    wx.getSystemInfo({
      success:function(o){
        console.log(o);
        own.setState({
          height:o.windowHeight,
          context:'width:100%;height:'+o.windowHeight+'px'
        })
      }
    })
  }

  render () {
    return (
      <View>
        <canvas style={this.state.context} canvas-id="canvas"></canvas>
        <AtButton onClick={this.action} className='margin-20' type='primary'>预定</AtButton>
      </View>

    )
  }

}
