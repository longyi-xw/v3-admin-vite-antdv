<script lang="ts" setup>
import { type ListItem } from "./data";

interface Props {
  list: ListItem[];
}

const props = defineProps<Props>();
</script>

<template>
  <a-empty v-if="props.list.length === 0" />
  <a-card v-else v-for="(item, index) in props.list" :key="index" class="card-container">
    <template #title>
      <div class="card-header">
        <div>
          <span>
            <span class="card-title">{{ item.title }}{{ item.status }}</span>
            <a-tag v-if="item.extra" :color="item.status" size="small">{{ item.extra }}</a-tag>
          </span>
          <div class="card-time">{{ item.datetime }}</div>
        </div>
        <div v-if="item.avatar" class="card-avatar">
          <img :src="item.avatar" width="34" />
        </div>
      </div>
    </template>
    <div class="card-body">
      {{ item.description ?? "No Data" }}
    </div>
  </a-card>
</template>

<style lang="scss" scoped>
.card-container {
  margin-bottom: 10px;

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .card-title {
      font-weight: bold;
      margin-right: 10px;
    }

    .card-time {
      font-size: 12px;
      color: grey;
    }

    .card-avatar {
      display: flex;
      align-items: center;
    }
  }

  .card-body {
    font-size: 12px;
  }
}
</style>
