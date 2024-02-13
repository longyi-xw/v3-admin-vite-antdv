<script lang="ts" setup>
import { ref, computed } from "vue";
import { ElMessage } from "element-plus";
import { BellOutlined } from "@ant-design/icons-vue";
import NotifyList from "./NotifyList.vue";
import { type ListItem, notifyData, messageData, todoData } from "./data";

type TabName = "通知" | "消息" | "待办";

interface DataItem {
  name: TabName;
  type: "default" | "success" | "warning" | "error" | "processing";
  list: ListItem[];
}

/** 角标当前值 */
const badgeValue = computed(() => {
  return data.value.reduce((sum, item) => sum + item.list.length, 0);
});
/** 角标最大值 */
const badgeMax = 99;
/** 面板宽度 */
const popoverWidth = 350;
/** 当前 Tab */
const activeName = ref<TabName>("通知");
/** 所有数据 */
const data = ref<DataItem[]>([
  // 通知数据
  {
    name: "通知",
    type: "default",
    list: notifyData
  },
  // 消息数据
  {
    name: "消息",
    type: "error",
    list: messageData
  },
  // 待办数据
  {
    name: "待办",
    type: "warning",
    list: todoData
  }
]);

const handleHistory = () => {
  ElMessage.success(`跳转到${activeName.value}历史页面`);
};
</script>

<template>
  <div class="notify">
    <a-popover placement="bottomRight" :overlayStyle="{ width: popoverWidth + 'px' }" trigger="click">
      <a-badge :count="badgeValue" :overflowCount="badgeMax" :showZero="badgeValue !== 0">
        <a-tooltip effect="dark" title="消息通知" placement="bottom">
          <BellOutlined :style="{ fontSize: '20px' }" />
        </a-tooltip>
      </a-badge>
      <template #content>
        <a-tabs v-model="activeName" class="demo-tabs" centered :tabBarGutter="100">
          <a-tab-pane v-for="(item, index) in data" :key="index">
            <template #tab>
              <a-badge :count="item.list.length" :overflowCount="badgeMax" dot :status="item.type">
                {{ item.name }}
              </a-badge>
            </template>
            <el-scrollbar height="400px">
              <NotifyList :list="item.list" />
            </el-scrollbar>
          </a-tab-pane>
        </a-tabs>
        <div class="notify-history">
          <a-button type="link" @click="handleHistory">查看{{ activeName }}历史</a-button>
        </div>
      </template>
    </a-popover>
  </div>
</template>

<style lang="scss" scoped>
.notify {
  margin-right: 10px;
  color: var(--el-text-color-regular);
}

.notify-history {
  text-align: center;
  padding-top: 12px;
  border-top: 1px solid var(--el-border-color);
}
</style>
