<!--
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-11 14:02:51
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-28 18:18:12
 -->
<template>
  <div class="user-detaile">
    <megReturn
      class="mb20"
      @click="returnPage"
    >
      返回客户管理
    </megReturn>
    <div>
      <el-table
        border  
        class=" mb20"
        :data="tableData"
      >
        <el-table-column
          prop="id"
          label="用户id"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="phone_number"
          label="绑定手机" 
        >
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱" 
        >
        </el-table-column>
        <el-table-column
          prop="company_name"
          label="公司名称" 
        >
        </el-table-column>
      </el-table>
    </div>
   

    <el-tabs
      v-model="activeName"
    >
      <el-tab-pane
        label="软件管理"
        name="1"
      >
        <downSoft
          softType="userManage"
          :adminId="adminId"
          ref="downSoft"
          :consumerId="userInfo.id"
        >
          <el-button
            class="fr"
            size="medium"
            type="primary"
            @click="chooseSoft"
          >
            新增版本
          </el-button>
        </downSoft>
      </el-tab-pane>
      <el-tab-pane
        label="授权统计"
        name="2"
      >
        <div class="db mb20">
          <div class="fx1"></div>
          <el-button
            type="primary"
            size="medium"
            @click="addContracts"
          >
            新增产品授权类型
          </el-button>
        </div>
        <statistic
          ref="statistic"
          :isAdmin="true"
          :consumerId="userInfo.id"
          :showTitle="false"
        ></statistic>
      </el-tab-pane>
      <el-tab-pane
        label="用户日志"
        name="3"
      >
        <logTable :tableData="logTableData"></logTable>
      </el-tab-pane>
      <el-tab-pane
        label="账户信息修改"
        name="4"
      >
        <div class="db mt20">
          <div class="fx1"></div>
          <editUser :form="userInfo"></editUser>
          <div class="fx1"></div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <downSoftDialog
      softType="userManage"
      :adminId="adminId"
      :consumerId="userInfo.id"
      :visible.sync="visible"
      @enter="enter"
      v-if="visible"
    ></downSoftDialog>
    <addContractsDialog
      v-if="visibleCon"
      :adminId="adminId"
      :consumerId="userInfo.id"
      :visible.sync="visibleCon"
      @enter="refresh"
    ></addContractsDialog>
  </div>
</template>

<script>
import megReturn from '@/components/megReturn.vue';
import editUser from './editUser';
import logTable from '@/page/log/logTable.vue';
import downSoft from '@/page/downloadCenter/downSoft.vue';
import downSoftDialog from '@/page/downloadCenter/downSoftDialog.vue';
import statistic from '@/page/statistical/index';
import addContractsDialog from '@/page/statistical/addContractsDialog';


export default {
  name: 'UserDetaile',
  components: {
    megReturn,
    editUser,
    logTable,
    downSoft,
    downSoftDialog,
    statistic,
    addContractsDialog
  },
  props: {
    userInfo: {
      type: Object,
      default() {
        return null;
      }
    }
  },
  data() {
    return {
      visible: false,
      visibleStatical: false,
      visibleCon: false,
      activeName: '1',
      logTableData: []
    };
  },
  computed: {
    tableData() {
      return this.userInfo ? [this.userInfo] : [];
    },
    adminId() {
      return this.$store.getters['user/getAdminId'];
    },
    
  },
  watch: {
    userInfo() {
      this.getUserListLog();
    }
  },
  mounted() {
    this.getUserListLog();
  },
  methods: {
    addContracts() {
      this.visibleCon = true;
    },
    returnPage() {
      this.$emit('returnPage');
    },
    chooseSoft() {
      this.visible = true;
    },
    getUserListLog() {
      this.$service.log.getUserList({
        amdin_id: this.adminId,
        consumer_id: this.userInfo.id
      }).then(data => {
        this.logTableData = data.data;
      });
    },
    enter(value) {
      const sdkIds = value.map(data => {
        return data.sdk_id;
      });
      
      this.$service.userManage.pushSdk({
        admin_id: this.adminId,
        consumer_id: this.userInfo.id,
        sdk_ids: sdkIds
      }).then(() => {
        this.$refs.downSoft.getData();
        this.$message.success('添加成功！');
      });
    },
    refresh() {
      this.$refs.statistic.getData();
    }

  }

};
</script>

<style>

</style>
