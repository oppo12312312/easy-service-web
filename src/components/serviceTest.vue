
<template>
  <dir>
    <el-input v-model="url"></el-input>
    <el-input
      type="textarea"
      :rows="10"
      v-model="res"
    ></el-input>
    <el-button @click="post">
      post
    </el-button>
  </dir>
</template>


<script>
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:7001',
  timeout: 1000
});
export default {
  data() {
    return {
      url: '',
      res: ''
    };
  },
  methods: {
    post() {
      const example = {
        // 必须传入字段
        tableName: 'teTest',
        //where 可以不传
        //where 传入的字段必须是tableName中存在的字段，否则报错提示
        //where 传入的sql关键字只能是 ['=','!=', '>', '>=', '<', '<=', 'between', 'not between', 'like', 'is' , 'in'],否则会报错
        where: {
          //时间格式请转化成2016-02-22 15:33:10，不支持其他格式，如果传入其他时间格式，不会报错，会是查询结果错误
          dateTime: {
            '>=': '2016-02-22 15:33:10', 
            '<=': '2020-02-22 15:33:10', 
            'between': ['2016-02-22 15:33:10', '2020-02-22 15:33:10'], // between 和 not between 后面必须是一个length=2的数组， 否则会报错
            'not between': ['2010-02-22 15:33:10', '2011-02-22 15:33:10'] 
          },
          // in 有两种模式, 下面的是简写，也可以这样： enum: {in :[1, 11]}, 
          enum: [1, 11],  
          text: {
            like: '%11%', //注意like 中的 %、_ 等通配符需要拼接到value中
            '=': '1121', 
            is: 'not null', // is 的值只能是 not null 和  null
            in: ['1121'] 
          },
          // = 也有两种模式，下面的是简写，也可以这样：id: {"=" , 1}
          id: 1
        },
        //columns 如果不传,则查询表中的所有字段，传入的字段必须是tableName中存在的字段，否则报错
        columns: ['enum', 'text', 'dateTime'],
        //orders 可以不传，传入的字段必须是tableName中存在的字段，否则报错
        orders: { id: 'desc' },
        //page 可以不传，必须是大于0的整数      
        pageNum: 1,
        pageSize: 10,
      };

      instance.post('/query', example).then(res => {
        this.res = JSON.stringify(res);
      }).catch(info => {
        debugger;
        this.res = JSON.stringify(info.response.data);
      });
    }
  }
};
</script>

<style>
</style>
