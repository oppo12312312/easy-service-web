<!--
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-05 11:12:48
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-18 15:55:38
 -->
<template>
  <el-dialog
    class="meg-down-soft-dialog"
    title="选择添加版本"
    :visible.sync="visible"
    width="1000px"
    :before-close="handleClose"
  >
    <downSoft
      softType="userManage"
      push="unpushed"
      :adminId="adminId"
      :consumerId="consumerId"
      @handleSelectionChange="handleSelectionChange"
      :check="true"
    >
      <el-alert
        style="width: 400px;"
        title="已存在于客户列表中的版本将不显示"
        type="warning"
        class="mb20"
        :closable="false"
      >
      </el-alert>
    </downSoft>

    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="handleClose">取 消</el-button>
      <el-button
        type="primary"
        @click="enter"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import downSoft from '@/page/downloadCenter/downSoft.vue'; 
export default {
  name: 'DownSoftDialog',
  components: {
    downSoft
  },
  props: {
    adminId: {
      type: Number,
      default: null
    },
    consumerId: {
      type: Number,
      default: null
    },
    visible: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      select: []
    };
  },
  methods: {
    handleClose() {
      this.$emit('update:visible', false);
    },
    handleSelectionChange(val) {
      this.select = val;
    },
    enter() {
      if (this.select.length === 0) {
        this.$message({
          message: '请选择',
          type: 'warning'
        });
      } else {
        this.handleClose();
        this.$emit('enter', this.select);
        console.log(this.select);
      }
    }
  }

};
</script>
