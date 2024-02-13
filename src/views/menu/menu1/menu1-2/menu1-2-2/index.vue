<script lang="ts" setup>
import { ref } from "vue";

defineOptions({
  name: "Menu1-2-2"
});

const text = ref("");
</script>

<template>
  <div class="app-container">
    <a-card title="四级路由缓存 - menu1-2-2">
      <a-input v-model:value="text" />
    </a-card>
  </div>
</template>
