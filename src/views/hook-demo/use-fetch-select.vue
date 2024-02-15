<script lang="ts" setup>
import { useFetchSelect } from "@/hooks/useFetchSelect";
import { getSelectDataApi } from "@/api/hook-demo/use-fetch-select";

const { options, value } = useFetchSelect({
  api: getSelectDataApi
});
</script>

<template>
  <div class="app-container">
    <h4>该示例是演示：通过 hook 自动调用 api 后拿到 Select 组件需要的数据并传递给 Select 组件</h4>
    <h5>Select 示例</h5>
    <a-select style="width: 100%" v-model:value="value" showSearch>
      <a-select-option v-for="(item, index) in options" v-bind="item" :key="index" placeholder="请选择">
        {{ item.label }}
      </a-select-option>
    </a-select>
    <h5>Select V2 示例（如果数据量过多，虚拟滚动技术）</h5>
    <a-select v-model:value="value" style="width: 100%" placeholder="请选择" :options="options" />
  </div>
</template>
