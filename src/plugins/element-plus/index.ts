import { type App } from "vue";
import ElementPlus from "element-plus";
import AntDesignVue from "ant-design-vue";

export function loadElementPlus(app: App) {
  /** Element Plus 组件完整引入 */
  app.use(ElementPlus);
  /** Ant Design Vue */
  app.use(AntDesignVue);
}
