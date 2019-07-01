<!--
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-10 14:24:27
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-18 14:51:15
 -->
<template>
  <div class="meg-log">
    <megTitle>日志审计</megTitle>

    <div class="top">
      <div class="fx1"></div>
      <div class="tc">
        操作类型过滤:
      </div>
      <el-select
        @change="query"
        v-model="actionType"
        placeholder="请选择"
      >
        <el-option
          v-for="item in options"
          :key="item.event_type_id"
          :label="item.event_type_name"
          :value="item.event_type_id"
        >
        </el-option>
      </el-select>
      <div class="mr20"></div>
      <el-input
        placeholder="请输入管理员名称/操作对象"
        v-model="text"
        class="input-text"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
        ></el-button>
      </el-input>
    </div>
    <div class="mt20"></div>
    <div class="buttom">
      <logTable :tableData="tableData"></logTable>
    </div>
  </div>
</template>

<script>
import megTitle from '@/components/megTitle';
import logTable from '@/page/log/logTable.vue';
export default {
  name: 'Log',
  components: {
    megTitle,
    logTable
  },
  data() {
    return {
      text: '',
      actionType: 0,
      tableData: [],
      options: []
    };
  },
  computed: {
    param() {
      return {
        name: this.text,
        type: this.actionType,
        amdin_id: this.adminId
      };
    },
    adminId() {
      return this.$store.getters['user/getAdminId'];
    }
  },
  watch: {
    text() {
      this.query();
    }
  },
  mounted() {
    this.getEventTypes();
    this.query();
  },
  methods: {
    query() {
      this.$service.log.getList(this.param).then(data => {
        this.tableData = data.data;
      });
    },
    getEventTypes() {
      this.$service.log.getEventTypes(this.param).then(data => {
        this.options = data.data;
      });
    }
  }

};
</script>

<style>

</style>
