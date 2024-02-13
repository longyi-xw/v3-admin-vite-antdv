<script lang="ts" setup>
import { computed, ref, watchEffect } from "vue";
import { ElMessage } from "element-plus";
import screenfull from "screenfull";

interface Props {
  /** 全屏的元素，默认是 html */
  element?: string;
  /** 打开全屏提示语 */
  openTips?: string;
  /** 关闭全屏提示语 */
  exitTips?: string;
  /** 是否只针对内容区 */
  content?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  element: "html",
  openTips: "全屏",
  exitTips: "退出全屏",
  content: false
});

//#region 全屏
const isFullscreen = ref<boolean>(false);
const fullscreenTips = computed(() => {
  return isFullscreen.value ? props.exitTips : props.openTips;
});
const fullscreenSvgName = computed(() => {
  return isFullscreen.value ? "fullscreen-exit" : "fullscreen";
});
const handleFullscreenClick = () => {
  const dom = document.querySelector(props.element) || undefined;
  screenfull.isEnabled ? screenfull.toggle(dom) : ElMessage.warning("您的浏览器无法工作");
};
const handleFullscreenChange = () => {
  isFullscreen.value = screenfull.isFullscreen;
};
watchEffect((onCleanup) => {
  // 挂载组件时自动执行
  screenfull.on("change", handleFullscreenChange);
  // 卸载组件时自动执行
  onCleanup(() => {
    screenfull.isEnabled && screenfull.off("change", handleFullscreenChange);
  });
});
//#endregion

//#region 内容区
const isContentLarge = ref<boolean>(false);
const contentLargeTips = computed(() => {
  return isContentLarge.value ? "内容区复原" : "内容区放大";
});
const contentLargeSvgName = computed(() => {
  return isContentLarge.value ? "fullscreen-exit" : "fullscreen";
});
const handleContentLargeClick = () => {
  document.body.className = !isContentLarge.value ? "content-large" : "";
  isContentLarge.value = !isContentLarge.value;
};
//#endregion
</script>

<template>
  <div>
    <!-- 全屏 -->
    <a-tooltip v-if="!content" :title="fullscreenTips" placement="bottom">
      <SvgIcon :name="fullscreenSvgName" @click="handleFullscreenClick" />
    </a-tooltip>
    <!-- 内容区 -->
    <a-dropdown v-else>
      <SvgIcon :name="contentLargeSvgName" />
      <template #overlay>
        <a-menu>
          <!-- 内容区放大 -->
          <a-menu-item @click="handleContentLargeClick">{{ contentLargeTips }}</a-menu-item>
          <!-- 内容区全屏 -->
          <a-menu-item @click="handleFullscreenClick" :disabled="isFullscreen">内容区全屏</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<style lang="scss" scoped>
.svg-icon {
  font-size: 20px;
  &:focus {
    outline: none;
  }
}
</style>
