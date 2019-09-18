import Taro, { Component } from '@tarojs/taro'
import PropTypes from 'prop-types'
import { View,Text,Icon } from '@tarojs/components'
import { AtIcon,AtBadge  } from 'taro-ui'

import './index.scss'

export default class WmCard extends Component {

  constructor(props){
    super(props);
  }

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
  }

  render () {

    const { title,icon,size,color,badge } = this.props

    return (
      <View className={this.props.className +' grid'} onClick={this.gotoPanel}>
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

WmCard.defaultProps = {
  title: '标题',
  icon: 'youhuiquan',
  size: 40,
  navigateTo:'',
  color:'#000',
  badge:'',
  className:'default'
}

WmCard.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  size: PropTypes.int,
  navigateTo: PropTypes.string,
  color: PropTypes.string,
  badge: PropTypes.string,
  className: PropTypes.string
}
