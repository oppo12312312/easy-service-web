<!--
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-02 15:17:03
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-14 11:45:35
 -->
<template>
  <div class="meg-message">
    <div class="info">
      <megTitle>用户信息</megTitle>
      <div class="content">
        <el-scrollbar>
          <el-timeline>
            <el-timeline-item
              v-for="(item,index) in userInfo"
              :key="index"
              :timestamp="dayToStr(item.push_time)"
              placement="top"
            >
              <el-card shadow="hover">
                <p>{{ item.content }}</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </el-scrollbar>
      </div>
    </div>
    <div class="divider"></div>
    <div class="info">
      <megTitle>系统信息</megTitle>
      <div class="content">
        <el-scrollbar>
          <el-timeline>
            <el-timeline-item
              v-for="(item,index) in systemInfo"
              :key="index"
              :timestamp="dayToStr(item.push_time)"
              placement="top"
            >
              <el-card shadow="hover">
                <p>{{ item.content }}</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script>
import megTitle from '@/components/megTitle';
import mixins from '@/common/mixins/util.js';

export default {
  name: 'Message',
  components: { megTitle },
  mixins: [mixins],
  data() {
    return {
      userInfo: [],
      systemInfo: []
    };
  },

  mounted() {
    this.$service.message.getMessages({ user_id: this.$store.getters['user/getUserInfo'].id })
      .then((response) => {
        console.log(response);
        this.userInfo = response.data.user_msgs;
        this.systemInfo = response.data.sys_msgs;
      })
      .catch((error) => {
        console.log(error);
      });
  }

};
</script>

<style>

</style>
