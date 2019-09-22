import Taro, { Component } from '@tarojs/taro'
import { View, Text,Swiper, SwiperItem,Icon } from '@tarojs/components'
import GridItem from '../components/grid'
import WmCard from '../components/card'
import './index.scss'
//@import "~taro-ui/dist/style/components/flex.scss";

import { AtButton,AtTabBar,AtGrid,AtFab,AtIcon,AtCard,AtToast } from 'taro-ui'

import curtainPng from '../../assets/images/swiper-0.jpg'

export default class Index extends Component {

  constructor(props){
    super(props);
    this.state = {
      isLoading:false
    };
  }

  config = {
    navigationBarTitleText: '范屋轰趴馆',
    enablePullDownRefresh:false,
    backgroundColor:'#252525',
    backgroundColorTop:'#252525'
  }



  componentWillMount () { }

  componentDidMount () {

  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  makePhoneCall () {
    wx.makePhoneCall({
      phoneNumber: '1340000', //仅为示例，并非真实的电话号码
      fail: function () {

      }
    })
  }

  action = e => {
    this.setState({isLoading:true});
    var own = this;
    wx.getLocation({//获取当前经纬度
      type: 'wgs84', //返回可以用于wx.openLocation的经纬度，官方提示bug: iOS 6.3.30 type 参数不生效，只会返回 wgs84 类型的坐标信息
      success: function (res) {
        own.setState({isLoading:false});
        wx.openLocation({//​使用微信内置地图查看位置。
          latitude: 22.625197,//要去的纬度-地址
          longitude: 114.067365,//要去的经度-地址
          scale: 18,
          name: "范屋轰趴馆",
          address:'十二橡树庄园B2-3A'
        })
      }
    })
  }

  render () {
    return (
      <View className='index'>
        <AtToast isOpened={this.state.isLoading} text='疯狂加载中' status='loading'></AtToast>
        <View className='swiper'>
          <Swiper
            className='test-h swiper-item'
            indicatorColor='#999'
            indicatorActiveColor='#fff'
            circular
            autoplay>
            <SwiperItem>
              <Image
                style='width:100%'
                mode='widthFix'
                src={curtainPng}
              />
            </SwiperItem>
            <SwiperItem>
              <Image
                style='width:100%'
                mode='widthFix'
                src={curtainPng}
              />
            </SwiperItem>
            <SwiperItem>
              <Image
                style='width:100%'
                mode='widthFix'
                src={curtainPng}
              />
            </SwiperItem>
          </Swiper>
        </View>
        <View>
          <View className='topGridBorder'>
            <View className='at-row'>
              <View className='at-col'>
                <GridItem icon='youhuiquan' size='28' color='#000' title='优惠券'></GridItem>
              </View>
              <View className='at-col'>
                <GridItem icon='yuyue' size='28' color='#000' badge='HOT' title='预约' navigateTo='/pages/calendar/index'></GridItem>
              </View>
              <View className='at-col'>
                <GridItem icon='dizhi' size='28' color='#000' title='导航' event={this.action} ></GridItem>
              </View>
              <View className='at-col'>
                <GridItem icon='yaoqing' size='28' color='#000' badge='返现' title='邀请' navigateTo='/pages/invitation/index' ></GridItem>
              </View>
            </View>
          </View>

          <AtCard title='娱乐项目'>
            <View className='at-row'>
              <View className='at-col'>
                <GridItem icon='jiushui' color='#f9c00c' title='酒水' size='28'></GridItem>
              </View>
              <View className='at-col'>
                <GridItem icon='KTV' color='#f9c00c' title='KTV' size='28'></GridItem>
              </View>
              <View className='at-col'>
                <GridItem icon='majiang' color='#f9c00c' title='麻将' size='28'></GridItem>
              </View>
              <View className='at-col'>
                <GridItem icon='zhuoyou' color='#f9c00c' title='桌游' size='28'></GridItem>
              </View>
            </View>
            <View className='at-row'>
              <View className='at-col'>
                <GridItem icon='touying' color='#f9c00c' title='投影' size='28'></GridItem>
              </View>
              <View className='at-col'>
                <GridItem icon='youxiji' color='#f9c00c' title='游戏机' size='28'></GridItem>
              </View>
              <View className='at-col'>
                <GridItem icon='taiqiu' color='#f9c00c' title='台球' size='28'></GridItem>
              </View>
              <View className='at-col'>
                <GridItem icon='shejian' color='#f9c00c' title='射箭' size='28'></GridItem>
              </View>
            </View>
          </AtCard>

          <official-account></official-account>

          <AtTabBar
            backgroundColor='#252525'
            color='#ccc'
            fixed
            tabList={[
              { title: '活动', iconType: 'calendar', text: 'new' },
              { title: '我的', iconType: 'user' }
            ]}

          />
        </View>
        <View className='floatButton'>
          <AtFab onClick={this.makePhoneCall}>
            <AtIcon prefixClass='icon' value='tel-fill' color='black' size='28'></AtIcon>

          </AtFab>
          <Text className='floatText'>联系管家</Text>
        </View>



      </View>
    )
  }
}
