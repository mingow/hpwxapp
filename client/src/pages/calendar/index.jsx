import Taro from '@tarojs/taro'
import { AtCalendar,AtCard,AtCheckbox,AtButton } from "taro-ui"
import { View, Text,Picker } from '@tarojs/components'
import './index.scss'

export default class ViewPage extends Taro.Component {

  state = {
    selector: ['福永-龙翔山庄'],
    selectorChecked: '福永-龙翔山庄',
    timeSel: '12:01',
    dateSel: '2018-04-22',
    checkedList: [],
    checkboxOption: [
      { value: 0, label: '周末白天场', desc: '每天10:00-16:00 共6小时',disabled: true},
      { value: 1, label: '周末夜间场', desc: '每天17:00-次日9:00 共16小时' ,disabled: true},
      { value: 2, label: '平日下午场', desc: '每天14:00-18:00 共4小时' ,disabled: true},
      { value: 3, label: '平日夜间场', desc: '每天19:00-23:00 共4小时' ,disabled: true}
    ],
  }

  config = {
    navigationBarTitleText: '场地预定'
  }

  handleCheckboxChange (value) {
    this.setState({
      checkedList: value
    })
  }

  render () {

    var validDate = [];
    var currentDate = new Date();
    currentDate = new Date(currentDate.getTime()+24*60*60*1000);
    var endDate = new Date();
    endDate.setMonth(currentDate.getMonth()+1);
    while(currentDate<endDate){
      var arr = [0,3,4,5,6]
      if(arr.indexOf(currentDate.getDay())!=-1){
        validDate.push({value:currentDate.getFullYear()+'/'+(currentDate.getMonth()+1)+'/'+currentDate.getDate()});
      };
      currentDate = new Date(currentDate.getTime()+24*60*60*1000)
    }

    return (
      <View className='page page-index'>
        <AtCard
          note='请选择需要预定的场馆'
          title='场馆选择'
          className='marginBottom'
        >
          <View className='page-section'>
            <View>
              <Picker mode='selector' range={this.state.selector} onChange={this.onChange}>
                <View className='picker'>
                  {this.state.selectorChecked}
                </View>
              </Picker>
            </View>
          </View>
        </AtCard>
        <AtCard
          note='需要至少提前1天预定'
          title='日期选择'
          className='marginBottom'
        >
          <AtCalendar validDates={validDate} isSwiper={false} />
        </AtCard>
        <AtCard
          note='可同时选择多项，如选项为灰色则为不可选择'
          title='时间段'
          className='marginBottom'
        >
          <View className='panel no-padding'>
            <View className='checkbox-container no-padding'>
              <AtCheckbox
                options={this.state.checkboxOption}
                selectedList={this.state.checkedList}
                onChange={this.handleCheckboxChange.bind(this)}
              />
            </View>
          </View>
        </AtCard>

        <AtButton className='margin-20' type='primary'>预定</AtButton>
      </View>
    )
  }

}
