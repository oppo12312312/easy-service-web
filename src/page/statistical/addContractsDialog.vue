<!--
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-05 11:12:48
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-28 13:44:16
 -->
<template>
  <el-dialog
    title="新增产品授权类型"
    :visible.sync="visible"
    width="500px"
    :before-close="handleClose"
  >
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item
        label="选择产品"
        prop="sdkTypeName"
      >
        <el-popover
          placement="right"
          width="400"
          v-model="popoverVisible"
          trigger="click"
        >
          <software
            @initSuccess="initNameSpaceSuccess"
            ref="software"
            :list="softList"
            :showNameSpace="true"
            @changeNameSpace="changeNameSpace"
            @clickItem="clickSoft"
          ></software>
          <el-input
            slot="reference"
            disabled
            v-model="ruleForm.sdkTypeName"
            placeholder="请点击选择产品"
          ></el-input>
        </el-popover>
      </el-form-item>

      <el-form-item
        label="产品类型"
        prop="contractType"
      >
        <el-radio-group v-model="ruleForm.contractType">
          <el-radio
            v-for="item in $t('select.contractType') "
            :label="item.value"
            :key="item.value"
          >
            {{ item.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        label="有效期(天)"
        prop="authorizedDays"
      >
        <el-input-number
          :min="1"
          v-model="ruleForm.authorizedDays"
          label="请输入"
        ></el-input-number>
      </el-form-item>

      <el-form-item
        label="授权个数"
        prop="purchasedCount"
      >
        <el-input-number
          placeholder="请输入"
          :min="1"
          v-model="ruleForm.purchasedCount"
          label="请输入"
        ></el-input-number>
      </el-form-item>

      <el-form-item
        label="备注"
        prop="changeReason"
      >
        <el-input
          type="textarea"
          v-model="ruleForm.node"
        ></el-input>
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
import software from '@/page/downloadCenter/software.vue';

export default {
  name: 'AddContractsDialog',
  components: {
    software
  },
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
    }
  },
  data() {
    return {
      popoverVisible: false,
      contractType: 1,
      softList: [],
      checkedSoft: {
        sdk_type_name: ''
      },
      nameSpaceId: 0,
      ruleForm: {
        sdkTypeName: '',
        contractType: 0,
        authorizedDays: 90,
        purchasedCount: 10,
        node: '' 
      },
      rules: {
        sdkTypeName: [
          { required: true, message: '请选择产品', trigger: 'blur' },
        ]
      }
    };
  },
  computed: {
    adminId() {
      return this.$store.getters['user/getUserInfo'].id;
    },
    sdkTypeId() {
      return this.checkedSoft.sdk_type_id;
    }
  },
  watch: {
    'ruleForm.contractType': function (val) {
      this.ruleForm.authorizedDays = val === 1 ? 36500 : 90;
    },
    checkedSoft(val) {
      this.ruleForm.sdkTypeName = val.sdk_type_name;
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    clickSoft(val) {
      this.checkedSoft = val;
      this.popoverVisible = false;
    },
    initNameSpaceSuccess(nameSpaces) {
      this.nameSpaceId = nameSpaces[0].id;
      this.getData();
    },
    addId(data) {
      data.forEach(element => {
        element.id = element.sdk_id || element.sdk_type_id;
      });
      return data;
    },
    changeNameSpace(val) {
      this.nameSpaceId = val;
      this.getData();
    },
    getData() {
      //查询客户的软件列表
      this.$service.softManage.getSdktTypesHis({
        admin_id: this.adminId,
        namespaces_id: this.nameSpaceId
      }).then(data => {
        this.softList = this.addId(data.data || []);
      });
    },
    handleClose() {
      this.$emit('update:visible', false);
    },
    enter() {
      console.log(this.ruleForm);
      const scope = this;
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$service.statistical.addContracts({
            admin_id: this.adminId,
            consumer_id: this.consumerId,
            'sdk_type_id': this.sdkTypeId, 
            'contract_type': this.ruleForm.contractType, 
            'authorized_days': this.ruleForm.authorizedDays, 
            'purchased_count': this.ruleForm.purchasedCount, 
            'node': this.ruleForm.node, 
          }).then(() => {
            this.$message.success('新增成功！');
            scope.$emit('enter');
            this.handleClose();
          });
        }
      });
    }
  }

};
</script>
