import Taro, { Component } from '@tarojs/taro'
import PropTypes from 'prop-types'
import { View,Text,Icon } from '@tarojs/components'
import { AtIcon,AtBadge  } from 'taro-ui'

import './index.scss'

export default class GridItem extends Component {


  componentWillMount () { }

  componentDidMount () {

  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  gotoPanel = e => {
    if(this.props.navigateTo){
      Taro.navigateTo({url: this.props.navigateTo})
    }
    else if(this.props.event){
      this.props.event();
    }
  }

  render () {

    const { title,icon,size,color,badge } = this.props

    return (
      <View className='grid' onClick={this.gotoPanel}>
        <View className='at-row border' >
          <AtBadge value={badge}>
            <AtIcon prefixClass='icon' value={icon}  size={size} color={color}></AtIcon>
          </AtBadge>
        </View>
        <View className='at-row' >
          <Text style={{color:color,fontSize:(size/2)+'px'}}>{title}</Text>
        </View>
      </View>
    )
  }
}

GridItem.defaultProps = {
  title: '标题',
  icon: 'youhuiquan',
  size: 40,
  navigateTo:'',
  color:'#000',
  badge:''
}

GridItem.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  size: PropTypes.int,
  navigateTo: PropTypes.string,
  color: PropTypes.string,
  badge: PropTypes.string,
}
