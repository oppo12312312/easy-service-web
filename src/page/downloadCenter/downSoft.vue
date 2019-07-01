<!--
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-10 15:40:47
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-28 13:41:38
 -->

<template>
  <div class="meg-down-soft">
    <div class="top">
      <el-radio-group
        v-model="version"
        size="medium"
      >
        <el-radio-button label="New">
          最新正式版本
        </el-radio-button>
        <el-radio-button label="NewTest">
          最新测试版本
        </el-radio-button>
        <el-radio-button label="His">
          所有历史版本
        </el-radio-button>
      </el-radio-group>
      <slot></slot>
    </div>
    <div class="buttom">
      <div class="left">
        <software
          @initSuccess="initNameSpaceSuccess"
          ref="software"
          :list="softList"
          :showNameSpace="showNameSpace"
          @changeNameSpace="changeNameSpace"
          @clickItem="clickSoft"
        ></software>
      </div>
      <div class="mr20"></div>
      <div class="right">
        <version
          :check="check"
          :tableData="tableData"
          :pushToUser="pushToUser"
          @pushToUserFun="pushToUserFun"
          @handleSelectionChange="handleSelectionChange"
        ></version>
      </div>
    </div>
  </div>
</template>

<script>
//一种是按照用户权限查询，一种是查询所有
import software from '@/page/downloadCenter/software.vue';
import version from '@/page/downloadCenter/version.vue';
export default {
  name: 'DownSoft',
  components: {
    software,
    version
  },
  props: {
    adminId: {
      type: Number,
      default: 0
    },
    consumerId: {
      type: Number,
      default: 0
    },
    pushToUser: {
      type: Boolean,
      default: false,
    },
    check: {
      type: Boolean,
      default: false
    },
    showNameSpace: {
      type: Boolean,
      default: false
    },
    //1、downloadCenter 下载中心： 客户下载自己的软件  consumerId 
    //2、userManage 客户管理-软件管理：  admin查看客户有哪些sdk及版本  consumerId adminId
    //4、softManage 软件管理： adminId 发送sdk版本给用户  
    softType: {
      type: String,
      default: '' 
    },
    push: {
      type: String,
      default: 'pushed' 
    }
  },
  data() {
    return {
      softList: [],
      nameSpaces: [],
      version: 'New',
      tableData: [],
      sdkTypeId: 0,
      nameSpaceId: 0
    };
  },
  computed: {
    sdkTypeParam() {
      return {
        consumer_id: this.consumerId,
        admin_id: this.adminId,
        push: this.push,
        namespaces_id: this.nameSpaceId
      };
    },
    sdkParam() {
      return {
        consumer_id: this.consumerId,
        sdk_type_id: this.sdkTypeId,
        admin_id: this.adminId,
        push: this.push,
        namespaces_id: this.nameSpaceId
      };
    },
    isNew() {
      return this.version === 'New' || this.version === 'NewTest';
    },
  },
  watch: {
    version() {
      this.$refs.software.clearCheck();
      this.getData();
    },
    consumerId() {
      this.getData();
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    pushToUserFun(item) {
      this.$emit('pushToUserFun', item);
    },
    handleSelectionChange(item) {
      this.$emit('handleSelectionChange', item);
    },
    getData() {
      //查询客户的软件列表
      this.$service[this.softType]['getSdktTypes' + this.version](this.sdkTypeParam).then(data => {
        const re = this.addId(data.data || []);
        this.initSdkData(re);
      });
    },
    initSdkData(data) {
      this.softList = data;
      if (this.isNew) {
        this.tableData = data;
      } else {
        this.clickSoft(this.softList[0] || null);
      }
    },
    clickSoft(row) {
      //查询客户的软件版本
      if (!row) {
        this.tableData = [];
      } else {
        this.sdkTypeId = row.sdk_type_id;
        if (this.isNew) {
          this.tableData = [row];
        } else {
          this.$service[this.softType].getSdkHis(this.sdkParam).then(data => {
            this.tableData = this.addId(data.data || []);
          });
        }
      }
    },
    addId(data) {
      data.forEach(element => {
        element.id = element.sdk_id || element.sdk_type_id;
      });
      return data;
    },
    initNameSpaceSuccess(nameSpaces) {
      this.nameSpaceId = nameSpaces[0].id;
      this.getData();
    },
    changeNameSpace(value) {
      this.nameSpaceId = value;
      this.getData();
    }
    
  }

};
</script>

<style>

</style>
