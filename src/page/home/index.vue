<!--
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-02 15:17:03
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-03 00:24:58
 -->
<template>
  <div class="meg-home">
    <div class="info">
      <div class="title">
        <span>用户信息</span>
      </div>
      <el-scrollbar>
        <el-timeline>
          <el-timeline-item
            v-for="(item,index) in info"
            :key="index"
            :timestamp="item.date"
            placement="top"
          >
            <el-card shadow="hover">
              <p>{{ item.message }}</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </el-scrollbar>
    </div>
    <div class="divider"></div>
    <div class="info">
      <div class="title">
        <span>用户信息</span>
      </div>
      <el-scrollbar>
        <el-timeline>
          <el-timeline-item
            v-for="(item,index) in info"
            :key="index"
            :timestamp="item.date"
            placement="top"
          >
            <el-card shadow="hover">
              <p>{{ item.message }}</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: [{
        message: '更新 Github 模板',
        date: '2018/4/2',
      }, {
        message: '更新 Github 模板',
        date: '2018/4/2'
      }, {
        message: '更新 Github 模板',
        date: '2018/4/2'
      }, {
        message: '更新 Github 模板',
        date: '2018/4/2'
      }, {
        message: '更新 Github 模板',
        date: '2018/4/2'
      }, {
        message: '更新 Github 模板',
        date: '2018/4/2'
      }, {
        message: '更新 Github 模板',
        date: '2018/4/2'
      }, {
        message: '更新 Github 模板',
        date: '2018/4/2'
      }]
    };
  }

};
</script>

<style>

</style>
