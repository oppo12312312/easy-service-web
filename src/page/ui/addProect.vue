<!--
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-05 11:12:48
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-09 20:36:22
 -->
<template>
  <el-dialog
    title="新增项目"
    :visible.sync="visible"
    width="500px"
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
        <el-input v-model="form.name"></el-input>
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
          name: ''
        };
      }
    },
  },
  data() {
    return {
      rules: {
        name: [
          { required: true, message: '请输入项目名称', trigger: 'blur' },
        ]
      }
    };
  },
  methods: {
    handleClose() {
      this.$emit('update:visible', false);
    },
    enter() {
      this.$refs.form.validate(() => {
        this.axiosObj({ method: 'post', url: '/creatProject', data: { projectName: this.form.name } }).then(res => {
          console.log(res);
          this.handleClose();
          this.$emit('addSucceed');
        }); 
      });
    }
  }

};
</script>
