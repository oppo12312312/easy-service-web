<!--
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-11 11:48:30
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-28 18:23:40
 -->
<template>
  <div class="meg-statistical">
    <component
      :is="thisPage"
      :isAdmin="isAdmin"
      :showTitle="showTitle"
      @jump="jump"
      :consumerId="consumerIdA"
      :softInfo="checkRow"
      ref="thisRef"
    />
  </div>
</template>

<script>
import megTitle from '@/components/megTitle';
import statistic from '@/page/statistical/statistic';
import authChange from '@/page/statistical/authChange';
import certificate from '@/page/statistical/certificate';
import consumption from '@/page/statistical/consumption';
// import { mapGetters } from 'vuex';


export default {
  name: 'Statistic',
  components: {
    megTitle,
    statistic,
    authChange,
    certificate,
    consumption
  },
  props: {
    showTitle: {
      type: Boolean,
      default: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    consumerId: {
      type: Number,
      default: null
    },
  },
  data() {
    return {
      thisPage: 'statistic',
      checkRow: {},
      tableData: []
    };
  },
  computed: {
    consumerIdA() {
      return this.consumerId || this.$store.getters['user/getUserInfo'].id;
    },
  },
  methods: {
    handleClick() {
      console.log(123);
    },
    jump(name, param) {
      if (param) {
        this.checkRow = param;
      }
      this.thisPage = name;
    },
    getData() {
      this.$refs.thisRef.getData();
    }
  }
};
</script>

<style scoped>

</style>
