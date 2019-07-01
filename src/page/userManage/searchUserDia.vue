<!--
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-05 11:12:48
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-28 13:44:13
 -->
<template>
  <el-dialog
    title="选择用户"
    :visible.sync="visible"
    width="900px"
    :before-close="handleClose"
  >
    <searchUser
      :showPushType="true"
      :splitByPushedSdkId="splitByPushedSdkId"
      @handleSelectionChange="handleSelectionChange"
      :userManage="false"
    ></searchUser>
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
import searchUser from '@/page/userManage/searchUser.vue'; 
export default {
  name: 'SearchUserDia',
  components: {
    searchUser
  },
  props: {
    visible: {
      type: Boolean,
      default() {
        return false;
      }
    },
    splitByPushedSdkId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      select: []
    };
  },
  computed: {
    adminId() {
      return this.$store.getters['user/getAdminId'];
    },
  },
  methods: {
    handleSelectionChange(val) {
      this.select = val;
    },
    handleClose() {
      this.$emit('update:visible', false);
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
      }
    }
  }

};
</script>
