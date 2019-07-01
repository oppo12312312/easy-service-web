<!--
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-05 13:58:26
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-17 14:20:20
 -->
<template>
  <div class="meg-download-center">
    <megTitle class="mb20">
      下载中心
    </megTitle>
    <downSoft
      softType="downloadCenter"
      :consumerId="consumerId"
    ></downSoft>
  </div>
</template>

<script>
import downSoft from '@/page/downloadCenter/downSoft.vue';
import megTitle from '@/components/megTitle';
// import { mapState } from 'vuex';

export default {
  name: 'DownloadCenter',
  components: {
    megTitle,
    downSoft
  },

  data() {
    return {
      activeName: 'soft',
      tableData: []
    };
  },
  computed: {
    consumerId() {
      return this.$store.getters['user/getUserInfo'].id;
    },
  },
  methods: {
    download() {
    }
    
  }
  
};
</script>

<style>

</style>
