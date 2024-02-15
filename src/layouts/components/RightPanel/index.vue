<script lang="ts" setup>
import { ref } from "vue";
import { SettingOutlined } from "@ant-design/icons-vue";

interface Props {
  buttonTop?: number;
}

const props = withDefaults(defineProps<Props>(), {
  buttonTop: 350
});

const buttonTopCss = props.buttonTop + "px";
const show = ref(false);
</script>

<template>
  <div class="handle-button" @click="show = true">
    <SettingOutlined style="font-size: 22px" />
  </div>
  <a-drawer v-model:open="show" width="300px" rootStyle="z-index: 2000" :closable="false">
    <slot />
  </a-drawer>
</template>

<style lang="scss" scoped>
.handle-button {
  width: 48px;
  height: 48px;
  background-color: var(--v3-rightpanel-button-bg-color);
  position: fixed;
  top: v-bind(buttonTopCss);
  right: 0;
  border-radius: 6px 0 0 6px;
  z-index: 10;
  cursor: pointer;
  pointer-events: auto;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
