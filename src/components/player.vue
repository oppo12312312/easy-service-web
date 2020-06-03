<!--
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-08-20 11:00:35
 * @LastEditors: zhongshuai
 * @LastEditTime: 2020-06-03 11:41:48
 -->
<template>
  <div
    class="live-player-wrapper"
  >
    <!-- 播放器容器 -->
    <div
      :index="`${dataIndex}`"
      :class="['live-player-container', showFullScreen ? 'fullscreen' : '']"
    >
      <div class="live-player-inner">
        <video
          class="video-player"
          v-show="ifPlayNormal"
          ref="videoPlayer"
          muted
        ></video>
        <div
          class="live-player-controller"
          v-if="showController && ifPlayNormal"
        >
          <span
            :class="['live-player-controller-btn', showFullScreen ? 'live-player-exit-fullscreen' : 'live-player-fullscreen']"
            @click="toggleFullScreen"
          ></span>
        </div>
      </div>
    </div>
    <!-- 播放异常 -->
    <div
      class="live-player-error"
      v-show="ifPlayError"
    >
      <div class="con">
        <i class="icon-camera"></i>
        <span class="text">
          视频流加载异常 <br />
          请
          <a
            @click="emitToPlay"
            href="javascript:void(0)"
          >点击重连
          </a>
          或关闭播放
        </span>
      </div>
    </div>
    <!-- 暂无视频 -->
    <div
      class="live-player-empty"
      v-show="ifPlayEmpty"
    >
      <div class="con">
        <i class="icon-camera"></i>
        <span class="text">暂无视频</span>
      </div>
    </div>
  </div>
</template>

<script>

// import Player from './helper/newPlayer';
// readyState表示音频/视频元素的就绪状态：
// 0 = HAVE_NOTHING - 没有关于音频/视频是否就绪的信息
// 1 = HAVE_METADATA - 关于音频/视频就绪的元数据
// 2 = HAVE_CURRENT_DATA - 关于当前播放位置的数据是可用的，但没有足够的数据来播放下一帧/毫秒
// 3 = HAVE_FUTURE_DATA - 当前及至少下一帧的数据是可用的
// 4 = HAVE_ENOUGH_DATA - 可用数据足以开始播放
// networkState表示音频/视频元素的当前网络状态：
// 0 = NETWORK_EMPTY - 音频/视频尚未初始化
// 1 = NETWORK_IDLE - 音频/视频是活动的且已选取资源，但并未使用网络
// 2 = NETWORK_LOADING - 浏览器正在下载数据
// 3 = NETWORK_NO_SOURCE - 未找到音频/视频来源
import Player from '@/util/video/webplayer.js';
export default {
  name: 'MegLivePlayer',
  props: {
    // 是否自动播放
    autoPlay: {
      type: Boolean,
      default: false
    },
    // 用于播放的地址
    socketUrl: {
      type: String,
      default: ''
    },
    // 展示按钮的开关 (全屏)
    showController: {
      type: Boolean,
      default: true
    },
    // 是否传入了全屏的元素
    hasFullscreenEle: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      ifPlayNormal: false,
      // 显示loading
      ifPlayerLoading: false,
      // 是否显示全屏
      showFullScreen: false,
      // 暂无视频
      ifPlayEmpty: true,
      // 播放异常
      ifPlayError: false,
      // websocket
      playerWs: null,
      // 检测是否开始播放
      checkPlayTimer: null,
      // player的实例
      currentPlayer: null,
      // video标签
      videoPlayer: null,
      // 视频宽高 fps等信息
      videoData: {},
      interval: 3600,
      // 超时未返回数据触发重新播放
      emitFailureTimer: null,
      messageFlag: 0,
      dataIndex: new Date().getTime() + Math.floor(Math.random() * 1000)
    };
  },
  mounted() {
    this.videoPlayer = this.$refs.videoPlayer;
    this.videoPlayer.addEventListener('error', this.videoErrorFn);
    document.addEventListener('fullscreenchange', this.handleFullscreenchange);
  },
  beforeDestroy() {
    document.removeEventListener('fullscreenchange', this.handleFullscreenchange);
    this.emitToClose('destroy');
  },
  destroyed() {
    document.removeEventListener('fullscreenchange', this.handleFullscreenchange);
    this.emitToClose('destroy');
  },
  methods: {
    /**
     * 触发播放的方法
     */
    emitToPlay() {
      // 先关闭上一个
      this.emitToClose('play');
      console.log('开始播放了');
      this.ifPlayerLoading = true;
      this.messageFlag = 0;
      // 播放
      this.playerWs = new WebSocket(this.socketUrl);
      this.currentPlayer = new Player(this.videoPlayer || this.$refs.videoPlayer);//eslint-disable-line
      this.playerWs.binaryType = 'arraybuffer';
      this.dts = 0;
      this.interval = 3600;
      this.currentPlayer.ws = this.currentPlayer.ws || this.playerWs;
      this.playerWs.onmessage = this.onmessageFn.bind(this);
      this.playerWs.onopen = this.onopenFn;
      this.playerWs.onclose = this.oncloseFn;
      this.playerWs.onerror = this.onerrorFn;
    },
    /**
     * 触发关闭的方法
     */
    emitToClose(type) {
      console.log('要关闭当前的ws');
      // 超时20s关闭
      if (type === 'error') {
        this.ifPlayError = true;
      }
      if (this.currentPlayer && this.currentPlayer.ws) {
        const state = this.currentPlayer.ws.readyState;
        if (state === 0) {
          this.closeTimer && clearTimeout(this.closeTimer);  // eslint-disable-line
          this.closeTimer = setTimeout(() => {
            console.log('ws的readyState不对，重新关闭');
            this.emitToClose();
          }, 1000);
        } else if (state === 1) {
          const sendObj = {
            'type': 'close',
            'timestamp': +new Date()
          };
          this.currentPlayer.ws.send(JSON.stringify(sendObj));
          this.currentPlayer.ws.closeFlag = false;
          this.currentPlayer.ws.close();
          this.currentPlayer.ws = null;
        }
      }
    },
    onopenFn() {
      this.ifPlayEmpty = false;
      this.ifPlayError = false;
      // this.emitFailureTimer = setTimeout(() => {
      //   if (this.messageFlag === 0) {
      //     // 20s超时
      //     this.emitFailureTimer && clearTimeout(this.emitFailureTimer); // eslint-disable-line
      //     this.emitFailureTimer = null;
      //     this.ifPlayerLoading = false;
      //     this.emitToClose('error');
      //     this.$emit('play-error');
      //   }
      // }, 20000);
    },
    onmessageFn(event) {
      this.ifPlayNormal = true;
      const { data } = event;
      if (typeof data === 'string') {
        // this.currentPlayer.init(1920, 1080, 25);
        // const dataObj = JSON.parse(data);
        // 1 宽高信息
        // 2 预留数字 可用做画框
        // 3 视频缓存过多，后端提示，重新拉取播放
        // const { type } = dataObj;
        // if (type === 1 && this.messageFlag === 0) {
        // if (this.messageFlag === 0) {
        console.log('第一次收到数据', event.currentTarget);
        console.log('messge', event.currentTarget.closeFlag);
        event.currentTarget.closeFlag = true;
        this.messageFlag = 1;
        // this.videoData = JSON.parse(event.data);
        // this.videoData = dataObj.data;
        // const { width, height, fps } = this.videoData;
        this.currentPlayer.init(1920, 1080, 15);
        this.interval = 90000 / 15;
        // 检查当前是否已经开始播放，去掉Loading
        // this.checkPlayerIsPlay(1000);
        // }
        // if (type === 2) {
        //   console.log('预留字段,暂不处理');
        // }
        // if (type === 3) this.emitToPlay();
      } else {
        // 视频包
        this.currentPlayer.putData(new Uint8Array(data), this.dts, this.dts);
        this.dts += this.interval;
        // 缓存过多，加速播放
        if (this.videoPlayer.buffered.length !== 0 && this.videoPlayer.played.length !== 0) {
          const span = (this.videoPlayer.buffered.end(0) - this.videoPlayer.played.end(0)).toFixed(2);
          if (span >= 2) {
            this.videoPlayer.playbackRate = 1.1;
          } else if (span >= 0.5 && span < 2) {
            this.videoPlayer.playbackRate = 1.01;
          } else {
            this.videoPlayer.playbackRate = 1;
          }
        }
      }
    },
    oncloseFn(event) {
      console.log('ws请求中断了', 'closeFlag', event.currentTarget);
      // 后台主动关闭的时候，重新开流
      if (event.currentTarget.closeFlag) {
        this.ifPlayerLoading = true;
        this.playTimer = setTimeout(() => {
          this.emitToPlay();
        }, 2000);
      } else {
        event.currentTarget.closeFlag = false;
        if (this.currentPlayer.ws) return; // 已经打开的流，就不再执行下面
        this.ifPlayError = false;
        this.ifPlayEmpty = true;
        this.ifPlayNormal = false;
      }
    },
    onerrorFn(event) {
      console.log('ws请求出错');
      this.ifPlayerLoading = false;
      this.ifPlayError = true;
      if (event.currentTarget.ws) {
        event.currentTarget.closeFlag = false;
      }
      this.$emit('play-error');
    },
    videoErrorFn() {
      console.log('视频播放出错了');
      this.emitToPlay();
    },
    checkPlayerIsPlay(interval) {
      clearInterval(this.checkPlayTimer);
      this.checkPlayTimer = setTimeout(() => {
        const played = this.videoPlayer.currentTime;
        if (played > 0) {
          this.ifPlayerLoading = false;
          clearTimeout(this.checkPlayTimer);
        } else {
          clearTimeout(this.checkPlayTimer);
          this.checkPlayerIsPlay(1000);
        }
      }, interval);
    },
    /**
     * 主动触发浏览器的全屏或者退出全屏事件
     */
    toggleFullScreen() {
      console.log(this.showFullScreen);
      this.showFullscreen = !this.showFullscreen;
      console.log(this.showFullScreen, !this.showFullScreen);
      if (this.showFullscreen) {
        this.fullscreen();
      } else {
        this.exitFullscreen();
      }
    },
    /**
     * 触发全屏事件
     */
    fullscreen() {
      if (this.hasFullscreenEle) {
        this.$emit('fullscreen');
      } else {
        const el = document.querySelector(`.live-player-container[index='${this.dataIndex}']`);
        (el.requestFullscreen ||
        el.mozRequestFullScreen ||
        el.webkitRequestFullscreen ||
        el.msRequestFullscreen).call(el);
      }
    },
    /**
     * 退出全屏事件
     */
    exitFullscreen() {
      if (this.hasFullscreenEle) {
        this.$emit('exit-fullscreen');
      }
      if (document.webkitIsFullScreen) {
        (document.exitFullscreen ||
        document.mozExitFullScreen ||
        document.webkitExitFullscreen ||
        document.msExitFullscreen).call(document);
      }
    },
    /**
     * 全屏切换事件
     */
    handleFullscreenchange() {
      if (!document.webkitIsFullScreen && this.showFullscreen) {
        this.toggleFullScreen();
      }
    },
  }
};
</script>

<style lang="scss">
.live-player-wrapper {
  position: relative;
  height: 100%;
  .live-player-container {
    position: relative;
    width: 100%;
    height: 100%;
    .live-player-inner {
      height: 100%;
      width: 100%;
      video {
        position: absolute;
        max-width: 100%;
        max-height: 100%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .live-player-controller {
      position: absolute;
      top: 10px;
      right: 0;
      width: 200px;
      height: 40px;
      color: #fff;
      z-index: 101;
      .live-player-controller-btn {
        margin-right: 10px;
        cursor: pointer;
        float: right;
        height: 18px;
        width: 18px;
        border-radius: 3px;
      }
      .live-player-fullscreen {
        // background: url("../../assets/images/expansion.svg") center no-repeat;
        background-size: 14px 14px;
      }
      .live-player-exit-fullscreen {
        // background: url("../../assets/images/shrinkage.svg") center no-repeat;
        background-size: 14px 14px;
      }
    }
  }
  .live-player-error,
  .live-player-empty {
    height: 100%;
    width: 100%;
    position: absolute;
    bottom: 0;
    background: linear-gradient(to bottom, #252f5b 0%, #1b2141 100%);
    .con {
      display: inline-block;
      height: 120px;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
      color: #505b86;
      text-align: center;
      line-height: 20px;
      .icon-camera {
        display: block;
        height: 80px;
        width: 80px;
        // background: url("../../assets/images/movie.svg") center no-repeat;
        margin: 0 auto 10px;
      }
      a {
        color: #fff;
        font-weight: bold;
      }
    }
  }
}
</style>
