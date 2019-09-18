import Taro from '@tarojs/taro'
import { AtCalendar,AtCard,AtCheckbox,AtButton } from "taro-ui"
import { View, Text,Picker } from '@tarojs/components'
import './index.scss'

export default class NaviMap extends Taro.Component {

  constructor(props){
    super(props);
    this.state = {
      height: 500,
      context:''
    };
  }

  componentDidMount () {

    wx.getLocation({//获取当前经纬度
      type: 'wgs84', //返回可以用于wx.openLocation的经纬度，官方提示bug: iOS 6.3.30 type 参数不生效，只会返回 wgs84 类型的坐标信息
      success: function (res) {
        wx.openLocation({//​使用微信内置地图查看位置。
          latitude: 22.625197,//要去的纬度-地址
          longitude: 114.067365,//要去的经度-地址
          name: "范屋轰趴馆",
          address:'十二橡树庄园B2-3A'
        })
      }
    })

    this.mapCtx = wx.createMapContext('container');
    this.mapCtx.getCenterLocation({
     success(res) {
       console.log(res.longitude)
       console.log(res.latitude)
     }
   })
   //移动到定位到的位置
   this.mapCtx.moveToLocation()

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



  componentWillMount () {
    console.log(this.state.height);
  }

  render () {
    return (
      <map className='' id = 'container' longitude="114.067365" latitude="22.625197" style={this.state.context}></map>
    )
  }

}
