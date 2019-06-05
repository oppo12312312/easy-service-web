<!--
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-05 13:44:21
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-05 17:35:21
 -->
<template>
  <div class="meg-download-center">
    <megTitle class="mb20">
      授权统计
    </megTitle>
    <el-scrollbar>
      <el-table
        :data="tableData"
        border
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-tabs
              v-model="props.row.activeName"
              @tab-click="handleClick"
            >
              <el-tab-pane
                label="授权变更详情"
                name="first"
              >
                <el-table
                  :data="tableData"
                  border
                  class="change-details"
                >
                  <el-table-column
                    label="date"
                    prop="id"
                  >
                  </el-table-column>
                  <el-table-column
                    label="授权变更情况"
                    prop="shop"
                  >
                  </el-table-column>
                  <el-table-column
                    label="变更原因"
                    prop="shop"
                  >
                  </el-table-column>
                </el-table> 
              </el-tab-pane>
              <el-tab-pane
                label="授权消耗"
                name="second"
              >
                <div class="char">
                  <div class="char-top mt20 mb20">
                    <div class="left">
                      <el-date-picker
                        v-model="props.row.date"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions"
                      >
                      </el-date-picker>
         
                      <el-radio-group
                        class="mr20 ml20"
                        v-model="props.row.type"
                      >
                        <el-radio :label="1">
                          日
                        </el-radio>
                        <el-radio :label="2">
                          月
                        </el-radio>
                        <el-radio :label="3">
                          年
                        </el-radio>
                      </el-radio-group>
                    </div>
                    <div class="right">
                      <el-button
                        class="mr20"
                        size="medium"
                        type="primary"
                      >
                        导出
                      </el-button>
                      <el-tooltip
                        effect="light"
                        content="请联系商服，申请激活次数对账详单"
                        placement="top-start"
                      >
                        <span class="c-info">对于数量有疑问？</span>
                      </el-tooltip>
                    </div>
                  </div>


                  <veHistogram
                    :settings="chartSettings"
                    v-if="props.row.activeName === 'second'"
                    :data="props.row.chartData"
                  ></veHistogram>
                </div>
              </el-tab-pane>
            </el-tabs>
          </template>
        </el-table-column>
        <el-table-column
          label="产品名称"
          prop="id"
        >
        </el-table-column>
        <el-table-column
          label="产品类型"
          prop="shop"
        >
        </el-table-column>
        <el-table-column
          label="单次授权有效期（天）"
          prop="desc"
        >
        </el-table-column>
        <el-table-column
          label="已激活次数"
          prop="id"
        >
        </el-table-column>
      </el-table>
    </el-scrollbar>
  </div>
</template>

<script>
import megTitle from '@/components/megTitle';
import veHistogram from 'v-charts/lib/histogram';


export default {
  name: 'Download',
  components: {
    megTitle,
    veHistogram
  },
  data() {
    return {

      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      chartSettings: {
        labelMap: {
          date: '日期',
          count: '授权请求次数',
          xxx: '授权成功次数',
          tttt: '授权失败次数'
        }
      },
      tableData: [{
        date: '',
        type: 1,
        id: '12987122',
        activeName: 'first',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333',
        chartData: {
          columns: ['date', 'count', 'xxx', 'tttt'],
          rows: [
            {
              'date': '1/1', 'count': 1393, 'xxx': 1093, 'tttt': 32 
            },
            {
              'date': '1/2', 'count': 3530, 'xxx': 3230, 'tttt': 26 
            },
            {
              'date': '1/3', 'count': 2923, 'xxx': 2623, 'tttt': 76 
            },
            {
              'date': '1/4', 'count': 1723, 'xxx': 1423, 'tttt': 49 
            },
            {
              'date': '1/5', 'count': 3792, 'xxx': 3492, 'tttt': 323 
            },
            {
              'date': '1/6', 'count': 4593, 'xxx': 4293, 'tttt': 78 
            }
          ]
        },
      }, {
        id: '12',
        activeName: 'second',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }]
    };
  },
  methods: {
    handleClick() {}
  }

};
</script>

<style>

</style>
