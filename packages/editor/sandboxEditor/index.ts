/*
 * @Author: xiaowei
 * @Date: 2025-10-31 15:54:47
 * @LastEditors: zhangzheng
 * @LastEditTime: 2025-11-07 18:02:29
 * @Description: 沙盘编辑器
 */

import { SFCWithInstall, withInstall } from "@factverse-bi/utils";

import SandboxEditor from "./src/sandboxEditor.vue";

export const FbSandboxEditor: SFCWithInstall<typeof SandboxEditor> =
  withInstall(SandboxEditor);
export default FbSandboxEditor;
