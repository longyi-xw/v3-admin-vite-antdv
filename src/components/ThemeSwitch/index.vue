<script lang="ts" setup>
import { useTheme, ThemeName } from "@/hooks/useTheme";
import { StarOutlined } from "@ant-design/icons-vue";

const { themeList, activeThemeName, setTheme } = useTheme();
const handleThemeItemClick = (value: ThemeName) => {
  setTheme(value);
};
</script>

<template>
  <a-dropdown trigger="click" @command="setTheme">
    <div>
      <a-tooltip title="主题模式" placement="bottom">
        <StarOutlined />
      </a-tooltip>
    </div>
    <template #overlay>
      <a-menu>
        <a-menu-item
          v-for="(theme, index) in themeList"
          :key="index"
          :disabled="activeThemeName === theme.name"
          @click="handleThemeItemClick(theme.name)"
        >
          <span>{{ theme.title }}</span>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>
