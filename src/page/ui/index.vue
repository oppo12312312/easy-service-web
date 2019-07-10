<!--
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-05 18:05:28
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-07-09 10:23:40
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
          class="db"
        >
          <div class="fx1 item-text">
            {{ item }}
          </div>

          <i
            @click.stop="deleteProject(item)"
            class="del iconfont iconchacha"
          ></i>
        </li>
      </ul>
    </div>
    <div
      class="right"
      v-show="!img"
    >
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
          <div class="tool db">
            <div class="del-prj">
              <i
                @click.stop="showImgs(item)"
                class="iconfont icontuceng"
              ></i>
            </div>
            <div class="del-prj">
              <i
                @click.stop="deleteVersion(item)"
                class="iconfont iconshanchu"
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <imgs v-show="img"></imgs>
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
import imgs from './imgs';


import config from '@/config.js';
export default {
  components: {
    megTitle,
    addProject,
    uploadProject,
    imgs
  }, 
  data() {
    return {
      active: 0,
      baseURL: config.baseURL,
      projects: [],
      versions: [],
      addVis: false,
      uploadVis: false,
      img: false
    };
  },
  computed: {
    activeProName() {
      if (this.projects.length > 0) {
        return this.projects[this.active];
      }
      return '请新建项目后上传';
    }
  },
  mounted() {
    this.initPrj();
  },
  methods: {
    deleteVersion(item) {
      this.$confirm('确定要删除文件吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axiosObj({
          method: 'post',
          url: '/deleteVersion', 
          data: { 
            projectName: this.projects[this.active],
            desionName: item
          } 
        }).then(() => {
          this.initPrj();
        });
      });
    },
    deleteProject(item) {
      this.$confirm('确定要删除项目吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axiosObj({
          method: 'post',
          url: '/deleteProject', 
          data: { projectName: item } 
        }).then(() => {
          this.initPrj();
        }); 
      });
    },
    initPrj() {
      this.axiosObj.get('/getAllProject').then(res => {
        this.projects = res.data.data;
        this.active = 0;
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
    showImgs() {
      this.img = true;
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
      window.open(config.baseUiUrl + this.activeProName + '/' + openIndex + '/index.html');
    }
  }

};
</script>

<style>

</style>
