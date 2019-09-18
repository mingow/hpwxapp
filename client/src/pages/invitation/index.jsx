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
          let base64Data = wx.arrayBufferToBase64(res.result.buffer.data);
          console.log(base64Data);

          fsm.writeFile({
            filePath: wx.env.USER_DATA_PATH + '/test.png',
            data: base64Data,     //去除base64头部格式文字,我使用的是'data:image/png;base64', jpeg的话是slice(23)
            encoding: 'base64',
            success: res => {
              let nimgs = wx.env.USER_DATA_PATH + '/test.png';
              console.log(wx.env);

              wx.getImageInfo({
                src: nimgs,
                success (res) {
                  const ctx = wx.createCanvasContext('canvas')
                  console.log(res.path);
                  ctx.setStrokeStyle("#00ff00")
                  ctx.setLineWidth(5)
                  ctx.rect(0, 0, 200, 200)
                  ctx.stroke()
                  ctx.setStrokeStyle("#ff0000")
                  ctx.setLineWidth(2)
                  ctx.moveTo(160, 100)
                  ctx.arc(100, 100, 60, 0, 2 * Math.PI, true)
                  ctx.moveTo(140, 100)
                  ctx.arc(100, 100, 40, 0, Math.PI, false)
                  ctx.moveTo(85, 80)
                  ctx.arc(80, 80, 5, 0, 2 * Math.PI, true)
                  ctx.moveTo(125, 80)
                  ctx.arc(120, 80, 5, 0, 2 * Math.PI, true)
                  ctx.stroke()
                  //ctx.draw()
                  ctx.drawImage(res.path, 0, 0, 360, 360);
                  ctx.draw();
                }
              })

              // const ctx = wx.createCanvasContext('canvas')
              // ctx.drawImage(nimgs, 340 * 0.5 - 46, 400 * 0.15, 105, 105)
              // ctx.draw()

            },
            fail: err => {
              rej(err)
            }
          })
        }
      }
    })
  }

  componentDidMount () {
    this.generateQrcode();

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
      <canvas style={this.state.context} canvas-id="canvas"></canvas>
    )
  }

}
