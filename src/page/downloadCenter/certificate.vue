<!--
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-06 11:20:42
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-11 11:42:08
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
      <span>证书类型 </span>
    </div>
             
    <template>
      <el-scrollbar>
        <el-form
          class="meg-certificate"
          ref="form"
          :model="form"
          label-position="left"
          label-width="120px"
        >
          <el-form-item label="软件类型">
            <el-radio-group v-model="form.type">
              <el-radio :label="1">
                正式版
              </el-radio>
              <el-radio :label="2">
                测试版
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="激活天数">
            <el-select
              v-model="form.date"
              placeholder="请选择激活天数"
            >
              <el-option
                v-for="item in dates"
                :label="item.label"
                :value="item.value"
                :key="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="认证类型">
            <el-radio-group v-model="form.statisticalType">
              <el-radio :label="1">
                单一认证
              </el-radio>
              <el-radio :label="2">
                双重认证
              </el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="使用说明">
            <el-alert
              :closable="false"
              show-icon
              title="单一认证：即完全信任通信认证文件，有这个文件就可以申请授权"
              type="info"
            >
            </el-alert>
            <div class="mt20"></div>
            <el-alert
              
              :closable="false"
              show-icon
              title="双重认证：部分信任文件，需要文件 + 一次性激活码才可以申请授权"
              type="info"
            >
            </el-alert>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">
              下载
            </el-button>
            <el-button
              @click="reset"
              type="danger"
            >
              重置
            </el-button>
            <el-button
              v-show="form.statisticalType === 2"
              type="primary"
            >
              获取一次性验证码
            </el-button>
          </el-form-item>
        </el-form>
      </el-scrollbar>
    </template>
  </el-card>
</template>

<script>
export default {
  name: 'Certificate',
  props: {
  },
  data() {
    return {
      form: {
        type: 1,
        date: 365,
        statisticalType: 1
      },
      dates: [{
        label: '三十天',
        value: 30
      }, {
        label: '半年',
        value: 180
      }, {
        label: '一年',
        value: 365
      }] 
    };
  },
  methods: {
    reset() {
      this.$confirm('重置通信认证文件,会导致之前的认证文件失效，即无法再使用旧的通信认证文件来激活新设备；已激活的设备不收影响， 是否确认要重置通信认证文件?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '!'
        });
      }).catch(() => {
      
      });
    }
  }

};
</script>

<style>

</style>
