<!--
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-11 11:48:30
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-19 15:15:07
 -->
<template>
  <div class="dbv1">
    <megReturn
      @click="jump('statistical')"
    >
      返回统计表
    </megReturn>
    <div class="db mb20">
      <div class="fx1"></div>
      <el-button
        v-if="isAdmin"
        size="medium"
        type="primary"
        @click="addStatistical"
      >
        增加/减少授权
      </el-button>
    </div>
    <addStatistical
      :consumerId="consumerId"
      :contractId="softInfo.contract_id"
      :visible.sync="visibleStatical"
      @enter="getData"
    ></addStatistical>
    <div>
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
    </div>

    <megTitle class="mt20 mb20">
      授权变更详情
    </megTitle>
    <el-scrollbar>
      <el-table
        border
        :data="changeTableData"
      >
        <el-table-column
          label="日期"
          :formatter="formatterDateTime"
          prop="changed_time"
        >
        </el-table-column>
        <el-table-column
          label="授权变更情况"
          prop="changed_detail"
        >
        </el-table-column>
        <el-table-column
          label="变更原因"
          prop="changed_reason"
        >
        </el-table-column>
      </el-table>
    </el-scrollbar>
  </div>
</template>

<script>
import megReturn from '@/components/megReturn.vue';
import megTitle from '@/components/megTitle.vue';
import mixins from '@/common/mixins/util.js';
import addStatistical from './addStatistical';


export default {
  name: 'AuthChange',
  components: {
    megReturn,
    megTitle,
    addStatistical
  },
  mixins: [mixins],
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
    }
  },
  data() {
    return {
      changeTableData: [],
      visibleStatical: false
    };
  },
  computed: {
    tableData() {
      return [this.softInfo];
    },
    userType() {
      return this.isAdmin ? 'admin' : 'user';
    },
  },
  mounted() {
    this.getData();
  },
  methods: {
    jump() {
      this.$emit('jump', 'statistic');
    },
    getData() {
      this.$service.statistical[`${this.userType}GetChangeHistory`]({
        consumer_id: this.consumerId,
        contract_id: this.softInfo.contract_id,
        admin_id: this.$store.getters['user/getUserInfo'].id
      }).then(data => {
        this.changeTableData = data.data || [];
      });
    },
    addStatistical() {
      this.visibleStatical = true;
    }
  }
};
</script>
