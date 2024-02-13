<script lang="ts" setup>
import { ref } from "vue";

defineOptions({
  name: "Menu1-3"
});

const text = ref("");
</script>

<template>
  <div class="app-container">
    <a-card title="三级路由缓存 - menu1-3">
      <a-input v-model:value="text" />
    </a-card>
  </div>
</template>
