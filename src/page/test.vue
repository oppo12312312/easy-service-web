<!--
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-02 11:51:20
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-02 23:52:52
 -->
<template>
  <div class="box1">
    <div class="box2">
    </div>
    <div class="box3">
      <div class="box4">
        2452435
      </div>
    </div>
  </div>
</template>

<script>
export default {

};
</script>

<style lang="scss">
@import "@/assets/base/index.scss";
.box1{
    @extend .db;
    @extend .v;
    height: 100%;
    background: red;
    .box2{
        width: 100%;
        height: 100px;
        background: rebeccapurple
    }
    .box3{
        width: 100%;
        @extend .fx1;
        background: saddlebrown;
    }
    .box4{
      height: 800px;
    }
}

</style>
