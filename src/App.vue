<script lang="ts" setup>
import { useTheme } from "@/hooks/useTheme";

// ant-design-vue 国际化
import zhCN from "ant-design-vue/es/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");

const { initTheme } = useTheme();

/** 初始化主题 */
initTheme();
</script>

<template>
  <a-config-provider :locale="zhCN">
    <router-view />
  </a-config-provider>
</template>
