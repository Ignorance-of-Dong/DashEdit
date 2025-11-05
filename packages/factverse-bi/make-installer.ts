/*
 * @Author: xiaowei
 * @Date: 2025-11-04 11:26:40
 * @LastEditors: xiaowei
 * @LastEditTime: 2025-11-04 11:29:28
 * @Description:
 */
import { INSTALLED_KEY } from "@factverse-bi/constants";

import type { App, Plugin } from "vue";

export const makeInstaller = (components: Plugin[] = []) => {
  const install = (app: App) => {
    if (app[INSTALLED_KEY]) return;

    app[INSTALLED_KEY] = true;
    components.forEach((c) => app.use(c));
  };

  return {
    install,
  };
};
