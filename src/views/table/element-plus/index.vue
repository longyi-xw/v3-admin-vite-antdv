<script lang="ts" setup>
import { reactive, ref, watch, nextTick, h } from "vue";
import { createTableDataApi, deleteTableDataApi, updateTableDataApi, getTableDataApi } from "@/api/table";
import { type GetTableData } from "@/api/table/types/table";
import type { Rule, FormInstance } from "ant-design-vue/es/form";
import { message, Modal } from "ant-design-vue";
import {
  SearchOutlined,
  PlusCircleOutlined,
  ReloadOutlined,
  DeleteOutlined,
  DownloadOutlined,
  SyncOutlined
} from "@ant-design/icons-vue";
import { usePagination } from "@/hooks/usePagination";

defineOptions({
  // 命名当前组件
  name: "ElementPlus"
});

const loading = ref<boolean>(false);
const { paginationData, handlePaginationChange } = usePagination();

//#region 增
const dialogVisible = ref<boolean>(false);
const formRef = ref<FormInstance | null>(null);
const formData = reactive({
  username: "",
  password: ""
});
const labelCol = { span: 4 };
const formRules: Record<string, Rule[]> = {
  username: [{ required: true, trigger: "blur", message: "请输入用户名" }],
  password: [{ required: true, trigger: "blur", message: "请输入密码" }]
};
const handleCreateOrUpdate = () => {
  formRef.value
    ?.validate()
    .then(() => {
      loading.value = true;
      const api = currentUpdateId.value === undefined ? createTableDataApi : updateTableDataApi;
      api({
        id: currentUpdateId.value,
        ...formData
      })
        .then(() => {
          message.success({ content: "操作成功" });
          dialogVisible.value = false;
          getTableData();
        })
        .finally(() => {
          loading.value = false;
        });
    })
    .catch((error) => {
      console.error("表单校验不通过", error);
    });
};
const resetForm = () => {
  currentUpdateId.value = undefined;
  formRef.value?.resetFields();
};
//#endregion

//#region 删
const handleDelete = (row: GetTableData) => {
  Modal.confirm({
    title: "提示",
    content: "正在删除用户：" + row.username + "，确认删除？",
    onOk() {
      deleteTableDataApi(row.id).then(() => {
        message.success({
          content: "删除成功"
        });
        getTableData();
      });
    },
    onCancel() {
      console.log("Cancel");
    }
  });
};
//#endregion

//#region 改
const currentUpdateId = ref<undefined | string>(undefined);
const handleUpdate = (row: GetTableData) => {
  dialogVisible.value = true;
  // 必须延迟赋值，防止 resetFields 方法将数据重置错误
  nextTick(() => {
    currentUpdateId.value = row.id;
    formData.username = row.username;
  });
};
//#endregion

//#region 查
const tableData = ref<GetTableData[]>([]);
const searchFormRef = ref<FormInstance | null>(null);
const searchData = reactive({
  username: "",
  phone: ""
});
const getTableData = () => {
  loading.value = true;
  // 模拟接口

  getTableDataApi({
    currentPage: paginationData.currentPage,
    size: paginationData.pageSize,
    username: searchData.username || undefined,
    phone: searchData.phone || undefined
  })
    .then((res) => {
      paginationData.total = res.data.total;
      tableData.value = res.data.list;
    })
    .catch(() => {
      tableData.value = [];
    })
    .finally(() => {
      loading.value = false;
    });
};
const handleSearch = () => {
  paginationData.currentPage === 1 ? getTableData() : (paginationData.currentPage = 1);
};
const resetSearch = () => {
  searchFormRef.value?.resetFields();
  handleSearch();
};
//#endregion

/** 监听分页参数的变化 */
watch([() => paginationData.currentPage, () => paginationData.pageSize], getTableData, { immediate: true });
</script>

<template>
  <div class="app-container">
    <a-card v-loading="loading" class="search-wrapper">
      <a-form ref="searchFormRef" layout="inline" :model="searchData">
        <a-form-item name="username" label="用户名">
          <a-input v-model:value="searchData.username" placeholder="请输入" />
        </a-form-item>
        <a-form-item name="phone" label="手机号">
          <a-input v-model:value="searchData.phone" placeholder="请输入" />
        </a-form-item>
        <a-form-item>
          <a-space>
            <a-button type="primary" :icon="h(SearchOutlined)" @click="handleSearch">查询</a-button>
            <a-button :icon="h(SyncOutlined)" @click="resetSearch">重置</a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </a-card>
    <a-card v-loading="loading">
      <div class="toolbar-wrapper">
        <a-space>
          <a-button type="primary" :icon="h(PlusCircleOutlined)" @click="dialogVisible = true">新增用户</a-button>
          <a-button type="primary" danger :icon="h(DeleteOutlined)">批量删除</a-button>
        </a-space>
        <a-space>
          <a-tooltip title="下载">
            <a-button type="primary" :icon="h(DownloadOutlined)" shape="circle" />
          </a-tooltip>
          <a-tooltip title="刷新当前页">
            <a-button type="primary" :icon="h(ReloadOutlined)" shape="circle" @click="getTableData" />
          </a-tooltip>
        </a-space>
      </div>
      <div class="table-wrapper">
        <el-table :data="tableData">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column prop="username" label="用户名" align="center" />
          <el-table-column prop="roles" label="角色" align="center">
            <template #default="scope">
              <a-tag v-if="scope.row.roles === 'admin'">admin</a-tag>
              <a-tag v-else color="warning">{{ scope.row.roles }}</a-tag>
            </template>
          </el-table-column>
          <el-table-column prop="phone" label="手机号" align="center" />
          <el-table-column prop="email" label="邮箱" align="center" />
          <el-table-column prop="status" label="状态" align="center">
            <template #default="scope">
              <a-tag v-if="scope.row.status" color="success" effect="plain">启用</a-tag>
              <a-tag v-else color="error">禁用</a-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" align="center" />
          <el-table-column fixed="right" label="操作" width="150" align="center">
            <template #default="scope">
              <a-button type="text" size="small" @click="handleUpdate(scope.row)">修改</a-button>
              <a-button type="text" danger size="small" @click="handleDelete(scope.row)">删除</a-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pager-wrapper">
        <a-pagination
          :pageSizeOptions="paginationData.pageSizes"
          :total="paginationData.total"
          :show-total="(total: number) => `共 ${total} 条`"
          v-model:page-size="paginationData.pageSize"
          v-model:current="paginationData.currentPage"
          show-size-changer
          show-quick-jumper
          @change="handlePaginationChange"
        >
          <template #buildOptionText="props">
            <span>{{ props.value }}条/页</span>
          </template>
        </a-pagination>
      </div>
    </a-card>
    <!-- 新增/修改 -->
    <a-modal
      v-model:open="dialogVisible"
      :title="currentUpdateId === undefined ? '新增用户' : '修改用户'"
      @cancel="resetForm"
      width="30%"
    >
      <a-form ref="formRef" :model="formData" :rules="formRules" :label-col="labelCol" labelAlign="left">
        <a-form-item name="username" label="用户名">
          <a-input v-model:value="formData.username" placeholder="请输入" />
        </a-form-item>
        <a-form-item name="password" label="密码" v-if="currentUpdateId === undefined">
          <a-input v-model:value="formData.password" placeholder="请输入" />
        </a-form-item>
      </a-form>
      <template #footer>
        <a-space size="middle">
          <a-button @click="dialogVisible = false">取消</a-button>
          <a-button type="primary" @click="handleCreateOrUpdate" :loading="loading">确认</a-button>
        </a-space>
      </template>
    </a-modal>
  </div>
</template>

<style lang="scss" scoped>
.search-wrapper {
  margin-bottom: 20px;
}

.toolbar-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.table-wrapper {
  margin-bottom: 20px;
}

.pager-wrapper {
  display: flex;
  justify-content: flex-end;
}
</style>
