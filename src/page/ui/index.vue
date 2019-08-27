<!--
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-07-08 18:05:35
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-08-27 15:24:55
 -->
<template>
  <div class="right ui-imgs">
    <div class="db">
      <el-input v-model="socketUrl">
      </el-input>
      <el-button @click="restart">
        重新拉流
      </el-button>
    </div>
   
    <player
      :autoPlay="true"
      ref="player"
      :socketUrl="socketUrl"
    ></player>
  </div>
</template>

<script>
// socketUrl="ws://10.122.100.139:8544/iot/stream?url=110000200200000001"
// :socketUrl="'ws://10.122.100.215/websocket/?token=rbgALgegZviQRfcHNztHJClJmLDyyCiczIObYlDPqBZMdqSfUPsyJBttFbLb'"
// :socketUrl="'ws://10.122.100.146:9999/stream?id=34020000001310000001'"
// import config from '@/config.js';
import player from '@/components/player';
export default {
  components: {
    player
  },
  data() {
    return {
      socketUrl: 'ws://10.122.100.139:8544/iot/stream?url=110000200200000001'
    };
  },
  mounted() {
    this.$refs.player.emitToPlay();
    // this.ws = new WebSocket(`${config.websocket}massage`);
    // this.needReconnect = true;
    // // 开启
    // this.ws.onopen = () => {
    //   this.reconnectAttempts = 0; // 重连上后置为0
    //   this.timer = null;
    //   console.log(`${this.name}的WebSocket开启成功`);
    // };
    // this.ws.onmessage = event => {
    //   console.log(event.data);
    // };
    // this.ws.onclose = () => {
    //   // const message = '';
    //   console.log('close');
    // };
  },
  methods: {
    restart() {
      this.$refs.player.emitToPlay();
    }
  }
};
</script>

<style>

</style>
