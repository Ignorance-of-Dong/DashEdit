/*
 * @Author: xiaowei
 * @Date: 2025-10-31 15:54:47
 * @LastEditors: xiaowei
 * @LastEditTime: 2025-10-31 16:46:53
 * @Description: 编辑器画布核心组件
 */

import { SFCWithInstall, withInstall } from "@factverse-bi/utils";

import editorCanvasCore from "./src/editorCanvasCore.vue";

export const FbEditorCanvasCore: SFCWithInstall<typeof editorCanvasCore> =
  withInstall(editorCanvasCore);
export default editorCanvasCore;
