<!--
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-11 11:48:30
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-28 18:19:23
 -->
<template>
  <div class="meg-statistical">
    <megTitle
      v-show="showTitle"
      class="mb20"
    >
      授权统计
    </megTitle>
    <el-scrollbar>
      <el-table
        :data="tableData"
        border
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
          :formatter="formatter"
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
        <el-table-column
          label="授权消耗详情"
          prop="id"
        >
          <template slot-scope="scope">
            <span
              class="c-light pointer"
              @click="jump('consumption',scope.row)"
              type="text"
            >
              点击查看
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="授权变更详情"
          prop="id"
        >
          <template slot-scope="scope">
            <span
              class="c-light pointer"
              @click="jump('authChange',scope.row)"
              type="text"
            >
              点击查看
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="通信认证文件"
          prop="id"
        >
          <template slot-scope="scope">
            <span
              class="c-light pointer"
              @click="jump('certificate',scope.row)"
              type="text"
            >
              点击查看
            </span>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
  </div>
</template>

<script>
import megTitle from '@/components/megTitle';
import getLabelByVal from '@/common/mixins/getLabelByVal.js';

export default {
  name: 'Statistic',
  components: {
    megTitle,
  },
  mixins: [getLabelByVal],
  props: {
    showTitle: {
      type: Boolean,
      default: true
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
      thisPage: 'statistic',
      tableData: []
    };
  },
  computed: {
    adminId() {
      return this.$store.getters['user/getAdminId'];
    },
  },
  mounted() {
    this.getData();
  },
  methods: {
    formatter(value) {
      return this.getLabelByVal('contractType', value.contract_type);
    },
    handleClick() {
      console.log(123);
    },
    jump(name, param) {
      this.$emit('jump', name, param);
    },
    getData() {
      debugger;
      if (this.isAdmin) {
        this.$service.statistical.adminGetStatisticallist({
          consumer_id: this.consumerId,
          admin_id: this.adminId
        }).then(data => {
          this.tableData = data.data || [];
        });
      } else {
        this.$service.statistical.getStatisticallist({
          consumer_id: this.consumerId
        }).then(data => {
          this.tableData = data.data || [];
        });
      }
    }
  }
};
</script>

<style scoped>

</style>
