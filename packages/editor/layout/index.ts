/*
 * @Author: xiaowei
 * @Date: 2025-10-31 15:54:47
 * @LastEditors: xiaowei
 * @LastEditTime: 2025-10-31 16:46:53
 * @Description: 图片组件
 */

import { SFCWithInstall, withInstall } from "@factverse-bi/utils";

import editorLayout from "./src/editorLayout.vue";

export const FbEditorLayout: SFCWithInstall<typeof editorLayout> =
  withInstall(editorLayout);
export default editorLayout;
