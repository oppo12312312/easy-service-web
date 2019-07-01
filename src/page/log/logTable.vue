<!--
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-11 15:06:53
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-19 10:52:35
 -->
<template>
  <el-scrollbar>
    <el-table
      border
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="master_name"
        label="管理员名称"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="created_at"
        label="操作时间"
        :formatter="formatterDateTime"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="edit_type"
        width="180"
        label="操作类型"
      >
      </el-table-column>
      <el-table-column
        width="100"
        prop="slave_id"
        label="操作对象"
      >
      </el-table-column>
      <el-table-column
        prop="edit_details"
        label="操作详情"
      >
      </el-table-column>
    </el-table>
  </el-scrollbar>
</template>

<script>
import mixins from '@/common/mixins/util.js';

export default {
  name: 'LogTable',
  mixins: [mixins],
  props: {
    tableData: {
      type: Array,
      default() {
        return [];
      }
    },
  }

};
</script>

<style>

</style>
