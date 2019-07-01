<!--
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-10 17:13:35
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-28 13:44:15
 -->
<template>
  <div class="meg-search-user">
    <div class="db"> 
      <el-radio-group
        v-if="showPushType"
        v-model="pushType"
        size="medium"
      >
        <el-radio-button label="1">
          未推送客户({{ unPushedTableData.length }})
        </el-radio-button>
        <el-radio-button label="2">
          已推送客户({{ pushedTableData.length }})
        </el-radio-button>
      </el-radio-group>
      <div class="fx1">
      </div>
      <el-input
        placeholder="姓名/公司/邮箱号"
        v-model="text"
        class="search mb20"
        size="medium"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
        ></el-button>
      </el-input>
    </div>

    <el-scrollbar
      :class="{h300:!userManage}"
    >
      <el-table
        border
        v-loading="loading"
        :data="showTableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          v-if="!userManage && !pushed"
          type="selection"
          width="55"
        >
        </el-table-column>
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
        <el-table-column
          v-if="userManage"
          prop="name"
          label="点击查看详情"
        >
          <template slot-scope="scope">
            <span
              class="c-light pointer"
              @click="detaile(scope.row)"
              type="text"
            >
              详情
            </span>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  name: 'SearchUser',
  props: {
    userManage: {
      type: Boolean,
      default: true
    },
    splitByPushedSdkId: {
      type: Number,
      default: 0
    },
    showPushType: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      pushType: '1',
      loading: false,
      text: '',
      multipleSelection: [],
      tableData: [],
      pushedTableData: [],
      unPushedTableData: [],
    };
  },
  computed: {
    adminId() {
      return this.$store.getters['user/getAdminId'];
    },
    pushed() {
      return this.pushType !== '1';
    },
    showTableData() {
      let re = [];
      if (this.showPushType) {
        re = this.pushed ? this.pushedTableData : this.unPushedTableData;
      } else {
        re = this.tableData;
      }
      return re;
    }
  },
  watch: {
    text() {
      this.getData();
    },
    pushed() {
      this.getData();
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.$emit('handleSelectionChange', val);
    },
    detaile(item) {
      this.$emit('detaile', item);
    },
    filter(data) {
      let re = [];
      if (this.showPushType) {
        this.pushedTableData = data.filter(item => {
          return item.pushed === true;
        });
        this.unPushedTableData = data.filter(item => {
          return item.pushed === false;
        });
      } else {
        re = data;
      }
      return re;
    },
    getData() {
      debugger;
      this.loading = true;
      this.$service.userManage.getUserList({
        admin_id: this.adminId,
        search_by: this.text,
        splitByPushedSdkId: this.splitByPushedSdkId
      }).then(data => {
        this.loading = false;
        this.tableData = data.data || [];
        this.filter(this.tableData);
      });
    }
  }
};
</script>

<style>

</style>
