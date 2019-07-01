<!--
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-05 11:12:48
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-28 13:44:16
 -->
<template>
  <el-dialog
    title="增加/减少授权"
    :visible.sync="visible"
    width="600px"
    :before-close="handleClose"
  >
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item
        label="变更次数"
        prop="changeNum"
      >
        <el-input
          type="number"
          placeholder="正数增加/负数减少"
          v-model="ruleForm.changeNum"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="变更原因"
        prop="changeReason"
      >
        <el-input v-model="ruleForm.changeReason"></el-input>
      </el-form-item>
    </el-form>
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

export default {
  name: 'AddStatistical',
  props: {
    visible: {
      type: Boolean,
      default() {
        return false;
      }
    },
    consumerId: {
      default: 0,
      type: Number
    },
    contractId: {
      default: 0,
      type: Number
    }
  },
  data() {
    return {
      ruleForm: {
        changeNum: null,
        changeReason: '' 
      },
      rules: {
        changeReason: [
          { required: true, message: '请输入变更原因', trigger: 'blur' },
        ],
        changeNum: [
          { required: true, message: '请输入变更次数', trigger: 'blur' },
        ]
      }
    };
  },
  computed: {
    adminId() {
      return this.$store.getters['user/getUserInfo'].id;
    },
  },
  methods: {
    handleClose() {
      this.$emit('update:visible', false);
    },
    enter() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$service.statistical.addStatistical({
            admin_id: this.adminId,
            consumer_id: this.consumerId,
            contract_id: this.contractId,
            change_num: Number(this.ruleForm.changeNum),
            change_reason: this.ruleForm.changeReason
          }).then(() => {
            this.$message.success('修改成功！');
            this.$emit('enter');
          });
          this.handleClose(valid);
        }
      });
    }
  }

};
</script>
