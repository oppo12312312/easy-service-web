<!--
 * @Description: 
 * @Author: zhongshuai
 * @LastEditors: zhongshuai
 * @Date: 2019-04-23 15:04:39
 * @LastEditTime: 2019-04-23 15:20:34
 -->
<template>
  <div>
    <div
      v-for="item in temp"
      :key="item.label"
    >
      {{ item.label }}
    </div>
    <el-input
      placeholder="输入关键字进行过滤"
      v-model="filterText"
    >
    </el-input>

    <el-tree
      class="filter-tree"
      :data="data"
      :props="defaultProps"
      :filter-node-method="filterNode"
      ref="tree2"
    >
    </el-tree>
  </div>
</template>


<script>
export default {

  data() {
    const data = [{
      id: 1,
      label: '一级 1',
      children: [{
        id: 4,
        label: '二级 1-1',
        children: [{
          id: 9,
          label: '三级 1-1-1'
        }, {
          id: 10,
          label: '三级 1-1-2'
        }]
      }]
    }, {
      id: 2,
      label: '一级 2',
      children: [{
        id: 5,
        label: '二级 2-1'
      }, {
        id: 6,
        label: '二级 2-2'
      }]
    }, {
 
      label: '一级 3',
      children: [{
    
        label: '二级 3-1'
      }]
    }];
    const temp = [];
    for (let i = 0; i < 20000; i++) {
      temp.push({
        label: '二级TTTT3-1' + i
      });
    }
    data[0].children[0].children = temp;
    return {
      filterText: '',
      data,
      temp,
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    }
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    }
  }
};
</script>
