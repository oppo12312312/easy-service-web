<!--
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-05 18:05:28
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-09 22:26:18
 -->
<template>
  <div class="meg-ui">
    <div class="left">
      <div class="ui-title">
        <i class="iconfont icon-xiangmu"></i>
        项目列表
      </div>
      <ul>
        <li
          v-for="(item,index) in projects"
          :key="item"
          @click="openPrj(item, index)"
          :class="{'on': index === active}"
        >
          {{ item }}
        </li>
      </ul>
    </div>
    <div class="right">
      <div class="top">
        <megTitle>
          {{ activeProName }}
        </megTitle>
        <div class="button">
          <el-button
            size="medium"
            type="primary"
            icon="iconfont icon-xinzeng"
            @click="addPrj"
            circle
          ></el-button>
          <el-button
            size="medium"
            type="success"
            @click="uploadPrj"
            icon="iconfont icon-shangchuan"
            circle
          ></el-button>
        </div>
      </div>
      <div class="buttom">
        <div
          class="file-item"
          v-for="item in versions"
          :key="item"
          @click="openIndex(item)"
        >
          <div class="file"></div>
          <div class="text">
            {{ item }}
          </div>
        </div>
      </div>
    </div>


    <addProject
      :visible.sync="addVis"
      v-if="addVis"
      @addSucceed="addSucceed"
    ></addProject>
    <uploadProject
      :visible.sync="uploadVis"
      v-if="uploadVis"
      @onSuccess="onUploadSuccess"
    ></uploadProject>
  </div>
</template>

<script>
import megTitle from '@/components/megTitle';
import addProject from './addProect';
import uploadProject from './uploadProject';

import config from '@/config.js';
export default {
  components: {
    megTitle,
    addProject,
    uploadProject
  }, 
  data() {
    return {
      active: 0,
      baseURL: config.baseURL,
      projects: [],
      versions: [],
      addVis: false,
      uploadVis: false
    };
  },
  computed: {
    activeProName() {
      if (this.projects.length > 0) {
        return this.projects[this.active];
      }
      return '';
    }
  },
  mounted() {
    this.initPrj();
  },
  methods: {
    initPrj() {
      this.axiosObj.get('/getAllProject').then(res => {
        this.projects = res.data.data;
        this.getVersion();
      }); 
    },
    getVersion() {
      this.axiosObj({
        method: 'post',
        url: '/getVersion', 
        data: { projectName: this.activeProName } 
      }).then(res => {
        this.versions = res.data.data;
      }); 
    },
    getAllProject() {
  
    },
    addPrj() {
      this.addVis = true;
    },
    openPrj(item, index) {
      this.active = index;
      this.getVersion();
    },
    uploadPrj() {
      this.uploadVis = true;
    },
    addSucceed() {
      this.active = 0;
      this.initPrj();
    },
    onUploadSuccess() {
      this.$message({
        message: '上传成功',
        type: 'success'
      });
      this.uploadVis = false;
      this.getVersion();
    },
    openIndex(openIndex) {
      window.open(config.baseUiUrl + this.activeProName + '/' + openIndex);
    }
  }

};
</script>

<style>

</style>
