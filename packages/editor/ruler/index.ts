/*
 * @Author: xiaowei
 * @Date: 2025-10-31 15:54:47
 * @LastEditors: xiaowei
 * @LastEditTime: 2025-10-31 16:46:53
 * @Description: 图片组件
 */

import { SFCWithInstall, withInstall } from "@factverse-bi/utils";

import editorRuler from "./src/editorRuler.vue";

export const FbEditorRuler: SFCWithInstall<typeof editorRuler> =
  withInstall(editorRuler);
export default editorRuler;
