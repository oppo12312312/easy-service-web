/*
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-20 17:01:13
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-28 15:19:12
 */
export default {
  select: {
    contractType: [
      {
        label: '正式',
        value: 1
      }, {
        label: '测试',
        value: 0
      }
    ],
    sdkStatus: [
      {
        label: '是',
        value: 'RELEASED'
      }, {
        label: '否',
        value: 'UNRELEASED'
      }],
    sdkType: [
      {
        label: '测试',
        value: 'TEST'
      }, {
        label: '正式',
        value: 'RELEASE'
      }]
  }

};
