<!--
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-05 11:12:48
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-11 09:08:35
 -->
<template>
  <el-dialog
    title="设计稿上传"
    :visible.sync="visible"
    width="600px"
    :before-close="handleClose"
  >
    <el-form
      ref="form"
      :rules="rules"
      :model="form"
      label-width="100px"
    >
      <el-form-item
        label="项目名称"
        prop="name"
      >
        <el-select
          v-model="form.name"
          placeholder="请选择项目"
        >
          <el-option
            v-for="item in projects"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="设计稿"
        prop="design"
      >
        <el-upload
          class="upload-demo"
          drag
          :action="baseURL+'upload'"
          :file-list="fileList"
          :on-change="onChange"
          :on-success="onSuccess"
          multiple
          :limit="limit"
          :accept="'.zip'"
          :data="{name:form.name}"
          :auto-upload="false"
          ref="upload"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或<em>点击上传</em>
          </div>
          <div
            class="el-upload__tip"
            slot="tip"
          >
            只能上传zip文件，且不超过500M
          </div>
        </el-upload>
      </el-form-item>
    </el-form>
  
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="handleClose">取 消</el-button>
      <el-button
        type="primary"
        @click="enter"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import config from '@/config.js';

export default {
  name: 'EditPassword',
  props: {
    visible: {
      type: Boolean,
      default() {
        return false;
      },
    },
    form: {
      type: Object,
      default() {
        return {
          name: '',

        };
      }
    }
  },
  data() {
    const scope = this;
    const checkFile = (rule, value, callback) => {
      if (scope.fileList.length === 0) {
        callback(new Error('请上传设计稿'));
      } else {
        callback();
      }
    };
    return {
      projects: [],
      fileList: [],
      limit: 1,
      baseURL: config.baseURL,
      rules: {
        name: [
          { required: true, message: '请选择项目', trigger: 'blur' },
        ],
        design: [
          { validator: checkFile, trigger: 'blur' }
        ]
      }
    };
  },
  mounted() {
    this.axiosObj.get('/getAllProject').then(res => {
      this.projects = res.data.data;
    }); 
  },
  methods: {
    handleClose() {
      this.$emit('update:visible', false);
    },
    enter() {
      this.$refs.form.validate(() => {
        this.$refs.upload.submit();
      });
    },
    onChange(val, fileList) {
      this.fileList = fileList;
      console.log(val);
    },
    onSuccess() {
      this.$emit('onSuccess');
    }
  }

};
</script>
