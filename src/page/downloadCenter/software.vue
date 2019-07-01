<!--
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-06 09:48:47
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-28 13:44:21
 -->
<template>
  <el-card
    shadow="never"
    class="meg-software"
  >
    <div
      slot="header"
      class="clearfix"
    >
      <span>产品列表</span>
    </div>
    <el-input
      v-if="showNameSpace"
      placeholder="请输入产品名称"
      v-model="text"
      class="mb20"
      size="medium"
    >
      <el-select
        v-model="nameSpaceValue"
        @change="changeNameSpace"
        slot="prepend"
        placeholder="请选择分区"
      >
        <el-option
          v-for="item in nameSpaces"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-input>
    
    <el-scrollbar>
      <div
        v-for="item in showList"
        @click="clickItem(item)"
        :key="item.id"
        class="item"
        :class="{'on': item.id === ckeckedId}"
      >
        {{ item.sdk_type_name }}
      </div>
    </el-scrollbar>
  </el-card> 
</template>

<script>
export default {
  name: 'Software',
  props: {
    list: {
      type: Array,
      default() {
        return [];
      }
    },
    showNameSpace: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      nameSpaceValue: 0,
      text: '',
      ckeckedId: 0,
      nameSpaces: []
    };
  },
  computed: {
    showList() {
      let re = [];
      if (this.text === '') {
        re = this.list;
      } else {
        re = this.list.filter(item => {
          return item.sdk_type_name.indexOf(this.text) > -1;
        });
      }

      return re;
    },
    adminId() {
      return this.$store.getters['user/getUserInfo'].id;
    }
  },
  watch: {
    nameSpaces: {
      handler: function handle(val) {
        let re = -1;
        if (val.length > 0) {
          re = val[0].id;
        }
        this.nameSpaceValue = re;
      },
      immediate: true
    }
  },
  mounted() {
    this.showNameSpace && this.initNameSpace();
  },
  methods: {
    clickItem(item) {
      this.ckeckedId = item.id;
      this.$emit('clickItem', item);
    },
    clearCheck() {
      this.ckeckedId = -1;
    },
    changeNameSpace(value) {
      this.$emit('changeNameSpace', value);
    },
    initNameSpace() {
      debugger;
      this.$service.namespaceManage.getList({ admin_id: this.adminId }).then(data => {
        this.nameSpaces = data.data || [];
        if (this.nameSpaces.length > 0) {
          this.$emit('initSuccess', this.nameSpaces);
        }
      });
    },
  }

};
</script>

<style>

</style>
