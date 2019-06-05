<!--
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-02 15:17:03
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-05 11:18:02
 -->
<template>
  <div class="meg-message">
    <div class="info">
      <megTitle>用户信息</megTitle>
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
      <megTitle>系统信息</megTitle>
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
import megTitle from '@/components/megTitle';
export default {
  name: 'Message',
  components: { megTitle },
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
