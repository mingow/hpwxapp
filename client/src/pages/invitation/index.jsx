import Taro from '@tarojs/taro'
import { AtCalendar,AtCard,AtCheckbox,AtButton,AtToast } from "taro-ui"
import { View, Text,Picker } from '@tarojs/components'
import './index.scss'

import shareBG from '../../assets/images/shareBG.jpg'

export default class Invitation extends Taro.Component {

  constructor(props){
    super(props);
    this.state = {
      height: 500,
      width:300,
      context:'',
      isLoading:true
    };
  }

  generateQrcode(){

    const ctx = wx.createCanvasContext('canvas')
    const imageRadio = 1;
    const width = this.state.width;
    const own = this;

    ctx.drawImage(shareBG, 0, 0, this.state.width, this.state.width*imageRadio);
    // ctx.draw();
    // ctx.save();

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

              console.log(nimgs);

              wx.getImageInfo({
                src: nimgs,
                success (res) {
                  console.log(res.path);
                  //const ctx = wx.createCanvasContext('canvas')
                  const codeWidth = 120;
                  ctx.drawImage(res.path, 50*width/800, (800-50)*width/800-codeWidth, codeWidth, codeWidth);
                  ctx.draw();
                  own.setState({isLoading:false});
                },
                fail:err => {
                  console.log(err);
                }
              })

              console.log(shareBG);



              // wx.getImageInfo({
              //   src: shareBG,
              //   success (res) {
              //     console.log(res.path);
              //
              //   },
              //   fail:err => {
              //     console.log(err);
              //   }
              // })
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
    //获取用户授权，获知用户的id

    wx.getSystemInfo({
      success:function(o){
        console.log(o);
        own.setState({
          height:o.windowHeight,
          width:o.windowWidth,
          context:'width:100%;height:'+o.windowHeight+'px'
        })
      }
    })
  }

  render () {
    return (
      <View>
        <canvas style={this.state.context} canvas-id="canvas"></canvas>
        <AtToast isOpened={this.state.isLoading} text='疯狂加载中' status='loading'></AtToast>
      </View>

    )
  }

}
