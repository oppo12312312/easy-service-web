<!--
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-11 11:48:30
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-20 10:44:23
 -->
<template>
  <div>
    <megReturn
      class="mb20"
      @click="jump('statistical')"
    >
      返回统计表
    </megReturn>
    <el-table
      border
      :data="tableData"
    >
      <el-table-column
        label="产品名称"
        width="300px"
        prop="sdk_type_name"
      >
      </el-table-column>
      <el-table-column
        label="产品类型"
        prop="contract_type"
      >
      </el-table-column>
      <el-table-column
        label="单次授权有效期（天）"
        prop="authorized_days"
      >
      </el-table-column>
      <el-table-column
        label="已激活次数"
        prop="activated_count"
      >
      </el-table-column>
      <el-table-column
        label="剩余激活次数"
        prop="remaining_count"
      >
      </el-table-column>
    </el-table>
    <div class="char">
      <div class="char-top mt20 mb20">
        <div class="left">
          <el-date-picker
            v-model="dates"
            @change="getData"
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
            v-model="type"
            @change="getData"
          >
            <el-radio label="days">
              日
            </el-radio>
            <el-radio label="weeks">
              周
            </el-radio>
            <el-radio label="months">
              月
            </el-radio>
          </el-radio-group>
        </div>
        <div class="right">
          <el-button
            class="mr20"
            size="medium"
            type="primary"
            @click="exportData"
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
        :data="chartData"
      ></veHistogram>
    </div>
  </div>
</template>

<script>
import veHistogram from 'v-charts/lib/histogram';
import megReturn from '@/components/megReturn.vue';
import periodTime from '@/common/mixins/periodTime.js';
import util from '@/common/mixins/util.js';
export default {
  name: 'Consumption',
  components: {
    veHistogram,
    megReturn
  },
  mixins: [periodTime, util],
  props: {
    softInfo: {
      type: Object,
      default() {
        return [];
      }
    },
    consumerId: {
      type: Number,
      default: null
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      dates: [],
      type: 'days',
      chartSettings: {
        labelMap: {
          authorization_application_count: '授权请求次数',
          authorization_application_failed_count: '授权成功次数',
          authorization_application_successful_count: '授权失败次数',
          authorization_deduction_count: '授权扣减次数',
        }
      },
      chartData: {
        columns: ['group_by', 'authorization_application_count', 
          'authorization_application_failed_count', 'authorization_application_successful_count', 'authorization_deduction_count'],
        rows: [
        ]
      },

    };
  },
  computed: {
    tableData() {
      return [this.softInfo];
    },
    userType() {
      return this.isAdmin ? 'admin' : 'user';
    },
    param() {
      return {
        consumer_id: this.consumerId,
        contract_id: this.softInfo.contract_id,
        group_by: this.type,
        start_time: this.dateToStr(this.dates[0]),
        end_time: this.dateToStr(this.dates[1]), 
        admin_id: this.$store.getters['user/getUserInfo'].id
      };
    }
  },
  mounted() {
    const end = new Date();
    const start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30 * 3);
    this.dates = [start, end];
    this.getData();
  },
  methods: {
    jump() {
      this.$emit('jump', 'statistic');
    },
    getData() {
      this.$service.statistical[`${this.userType}GetConsumption`](this.param).then(data => {
        this.chartData.rows = data.data;
      });
    },
    exportData() {
      this.$service.statistical[`${this.userType}ConsumeStatisticsExport`](this.param);
    }
  }
};


</script>

<style scoped>
    .h300{
        height: 100px;
    }


</style>
