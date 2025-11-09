/*
 * @Author: xiaowei
 * @Date: 2025-10-31 15:54:47
 * @LastEditors: xiaowei
 * @LastEditTime: 2025-10-31 16:46:53
 * @Description: 编辑器工具栏组件
 */

import { SFCWithInstall, withInstall } from "@factverse-bi/utils";

import EditorToolBar from "./src/editorToolBar.vue";

export const FbEditorToolBar: SFCWithInstall<typeof EditorToolBar> =
  withInstall(EditorToolBar);
export default EditorToolBar;
