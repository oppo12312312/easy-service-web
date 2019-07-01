<!--
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-06 11:20:42
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-27 14:35:59
 -->
<template>
  <el-card
    shadow="never"
    class="box-card"
  >
    <div
      slot="header"
      class="clearfix"
    >
      <span>选择版本</span>
    </div>
    <template>
      <el-scrollbar>
        <el-table
          border
          :data="tableData"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            v-if="check"
            type="selection"
            width="55"
          >
          </el-table-column>
          <el-table-column
            prop="sdk_version"
            label="版本号"
          >
          </el-table-column>
          <el-table-column
            prop="release_version_type"
            label="版本类型"
          >
          </el-table-column>
          <el-table-column
            prop="updated_time"
            :formatter="formatterDateTime"
            label="更新时间" 
          >
          </el-table-column>
          <el-table-column
            prop="sdk_download_url"
            label="下载地址"
          >
            <template slot-scope="scope">
              <span
                class="c-light pointer"
                @click="download(scope.row)"
                type="text"
              >
                点击下载
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="推送客户"
            v-if="pushToUser"
          >
            <template
              slot-scope="scope"
            >
              <span
                class="c-light pointer"
                @click="pushToUserFun(scope.row)"
                type="text"
              >
                点击推送
              </span>
            </template>
          </el-table-column>
        </el-table>
      </el-scrollbar>
    </template>
  </el-card>
</template>

<script>
import mixins from '@/common/mixins/util.js';

export default {
  name: 'Version',
  mixins: [mixins],
  props: {
    tableData: {
      type: Array,
      default() {
        return [];
      }
    },
    check: {
      type: Boolean,
      default: false
    },
    pushToUser: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      multipleSelection: [],
      version: 1
    };
  },
  computed: {
    adminId() {
      return this.$store.getters['user/getUserInfo'].id;
    }
  },
  methods: {
    download(row) {
      this.$service.downloadCenter.download({
        admin_id: this.adminId,
        sdk_id: row.id
      });
      //window.open(`${window.location.origin}/admin/${this.adminId}/api/v1/sdks/${row.id}/download`);
    },
    pushToUserFun(item) {
      this.$emit('pushToUserFun', item);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.$emit('handleSelectionChange', val);
    }
    
  }

};
</script>

<style>

</style>
