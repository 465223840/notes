<template>
  <div 
    class="sub-menu" 
    @mouseenter="showSub"
    @mouseleave="hideSub"
  >
    <div class="title">
      <slot name="title"></slot>
      <span class="icon">&gt;</span>
    </div>
    <div class="sub-item" v-show="subShow">
      <slot></slot>
    </div>
  </div>
</template>

<script>

import { ref } from 'vue';

export default {
  name: 'SubMenu',
  setup () {
    const subShow = ref(false);

    const showSub = () => {
      subShow.value = true;
    }

    const hideSub = () => {
      subShow.value = false;
    }

    return {
      showSub,
      hideSub,
      subShow
    }
  }
}
</script>

<style lang="scss" scoped>
  .sub-menu {
    position: relative;
    .title {
      position: relative;
      height: 50px;
      color: #fff;
      line-height: 50px;
      text-align: center;

      .icon {
        position: absolute;
        top: 0;
        right: 15px;
      }
    }

    .sub-item {
      position: absolute;
      left: 100%;
      top: 0;
      width: 100%;
      background-color: #333;
    }
  }
</style>