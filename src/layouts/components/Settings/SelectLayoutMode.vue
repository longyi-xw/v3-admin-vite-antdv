<script lang="ts" setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useSettingsStore } from "@/store/modules/settings";

const settingsStore = useSettingsStore();

const { layoutMode } = storeToRefs(settingsStore);

const isLeft = computed(() => layoutMode.value === "left");
const isTop = computed(() => layoutMode.value === "top");
const isLeftTop = computed(() => layoutMode.value === "left-top");
</script>

<template>
  <div class="select-layout-mode">
    <a-tooltip title="左侧模式">
      <section class="container layout-mode left" :class="{ active: isLeft }" @click="layoutMode = 'left'">
        <aside class="layout-aside" />
        <section class="container is-vertical">
          <header class="layout-header" />
          <main class="layout-main" />
        </section>
      </section>
    </a-tooltip>
    <a-tooltip title="顶部模式">
      <sectionr class="container layout-mode top is-vertical" :class="{ active: isTop }" @click="layoutMode = 'top'">
        <header class="layout-header" />
        <main class="layout-main" />
      </sectionr>
    </a-tooltip>
    <a-tooltip title="混合模式">
      <section
        class="container layout-mode left-top is-vertical"
        :class="{ active: isLeftTop }"
        @click="layoutMode = 'left-top'"
      >
        <header class="layout-header" />
        <section class="container">
          <aside class="layout-aside" />
          <main class="layout-main" />
        </section>
      </section>
    </a-tooltip>
  </div>
</template>

<style lang="scss" scoped>
.select-layout-mode {
  display: flex;
  justify-content: space-between;
}

.container {
  display: flex;
  flex-direction: row;
  flex: 1;
  flex-basis: auto;
  box-sizing: border-box;
  min-width: 0;
}

.layout-mode {
  width: 60px;
  flex-grow: 0;
  overflow: hidden;
  cursor: pointer;
  border-radius: 6px;
  border: 2px solid rgba(0, 0, 0, 0);

  &:hover {
    border: 2px solid var(--el-color-primary);
  }
}

.active {
  border: 2px solid var(--el-color-primary);
}

.is-vertical {
  flex-direction: column;
}

.layout-header {
  height: 12px;
  padding: 0 20px;
  box-sizing: border-box;
  flex-shrink: 0;
}

.layout-main {
  display: block;
  flex: 1;
  flex-basis: auto;
  overflow: auto;
  box-sizing: border-box;
  padding: 20px;
}

.layout-aside {
  width: 16px;
  overflow: auto;
  box-sizing: border-box;
  flex-shrink: 0;
}

.left {
  .layout-header {
    background-color: var(--el-border-color);
  }

  .layout-aside {
    background-color: var(--el-color-primary);
  }

  .layout-main {
    background-color: var(--el-fill-color);
  }
}

.top {
  .layout-header {
    background-color: var(--el-color-primary);
  }

  .layout-main {
    background-color: var(--el-fill-color);
  }
}

.left-top {
  .layout-header {
    background-color: var(--el-border-color);
  }

  .layout-aside {
    background-color: var(--el-color-primary);
  }

  .layout-main {
    background-color: var(--el-fill-color);
  }
}
</style>
