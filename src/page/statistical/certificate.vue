<!--
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-11 11:48:30
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-28 15:50:14
 -->
<template>
  <div>
    <el-row>
      <megReturn
        class="mb20"
        @click="jump('statistical')"
      >
        返回统计表
      </megReturn>
      <el-table
        border
        :data="tableData"
      >
        <el-table-column
          label="产品名称"
          width="300px"
          prop="sdk_type_name"
        >
        </el-table-column>
        <el-table-column
          label="产品类型"
          prop="contract_type"
        >
        </el-table-column>
        <el-table-column
          label="单次授权有效期（天）"
          prop="authorized_days"
        >
        </el-table-column>
        <el-table-column
          label="已激活次数"
          prop="activated_count"
        >
        </el-table-column>
        <el-table-column
          label="剩余激活次数"
          prop="remaining_count"
        >
        </el-table-column>
      </el-table>
    </el-row>
    <el-row class="card">
      <el-col
        :span="8"
        :offset="2"
      >
        <el-card
          class="hg"
          shadow="hover"
          :body-style="{ padding: '0px' }"
        >
          <div
            slot="header"
            class="clearfix"
          >
            <span>单一认证</span>
          </div>
          <div class="content">
            <span>生成时间：</span><time class="time">{{ formatterDateTime(softInfo.sa_created_date) }}</time>
            <p>MD5：</p>
            
            <div class="btn clearfix">
              <el-button
                type="primary"
                class="button"
                v-if="!isAdmin"
                @click="download('Single')"
              >
                下载
              </el-button>
              <el-button
                type="danger"
                class="button"
                @click="reset('Single')"
              >
                重置
              </el-button>
            </div>
          

            <el-alert
              :closable="false"
              class="mt20"
              show-icon
              title="单一认证：即完全信任通信认证文件，有这个文件就可以申请授权"
              type="info"
            >
            </el-alert>
          </div>
        </el-card>
      </el-col>
      <el-col
        :span="8"
        :offset="2"
      >
        <el-card
          class="hg"
          shadow="hover"
          :body-style="{ padding: '0px' }"
        >
          <div
            slot="header"
            class="clearfix"
          >
            <span>双重认证</span>
          </div>
          <div class="content">
            <span>生成时间：</span><time class="time">{{ formatterDateTime(softInfo.da_created_date) }}</time>
            <p>MD5：</p>

            <div class="mt20"></div>
            <div class="btn clearfix">
              <el-button
                type="primary"
                class="button"
                v-if="!isAdmin"
                @click="download('Double')"
              >
                下载
              </el-button>
              <el-button
                type="danger"
                class="button"
                @click="reset('Double')"
              >
                重置
              </el-button>
            </div>
            <el-button
              type="primary"
              class="button"
              v-if="!isAdmin"
              @click="getActiveCode"
            >
              获取一次性激活码
            </el-button>
            <el-alert
              :closable="false"
              class="mt20"
              show-icon
              v-if="singleCode"
              :title="singleCode"
              type="success"
            >
            </el-alert>
            <el-alert
              :closable="false"
              class="mt20"
              show-icon
              title="双重认证：部分信任文件，需要文件 + 一次性激活码才可以申请授权"
              type="info"
            >
            </el-alert>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import megReturn from '@/components/megReturn.vue';
import mixins from '@/common/mixins/util.js';

export default {
  name: 'Certificate',
  components: {
    megReturn
  },
  mixins: [mixins],
  props: {
    softInfo: {
      type: Object,
      default() {
        return [];
      }
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    consumerId: {
      type: Number,
      default: null
    }
  },

  data() {
    return {
      singleCode: '',
      currentDate: new Date(),
      service: this.$service.statistical
    };
  },
  
  computed: {
    tableData() {
      return [this.softInfo];
    },
    userType() {
      return this.isAdmin ? 'admin' : 'user';
    },
    param() {
      return {
        contract_id: this.softInfo.contract_id,
        admin_id: this.$store.getters['user/getUserInfo'].id,
        consumer_id: this.consumerId
      };
    }
  },
  methods: {
    jump() {
      this.$emit('jump', 'statistic');
    },
    download(type) {
      this.service[`${this.userType}${type}Authentication`](this.param);
    },

    getActiveCode() {
      this.service[`${this.userType}DoubleAuthenticationActiveCode`](this.param).then(data => {
        this.singleCode = data.data.msg;
      });
    },
    reset(type) {
      this.$confirm('重置通信认证文件,会导致之前的认证文件失效，即无法再使用旧的通信认证文件来激活新设备；已激活的设备不收影响， 是否确认要重置通信认证文件?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.service[`${this.userType}${type}AuthenticationPut`](this.param).then(() => {
          this.$message.success('重置成功！');
        });
      }).catch(() => {
      });
    }
  }
};
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
  .card{
    margin-top: 100px;
  }
  .btn{
    margin: 20px auto;
  }
  .content{
    padding: 20px;
  }
  .hg{
    height: 380px;
  }
</style>
