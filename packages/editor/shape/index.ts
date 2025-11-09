/*
 * @Author: xiaowei
 * @Date: 2025-10-31 15:54:47
 * @LastEditors: xiaowei
 * @LastEditTime: 2025-10-31 16:46:53
 * @Description: 图片组件
 */

import { SFCWithInstall, withInstall } from "@factverse-bi/utils";

import editorShape from "./src/editorShape.vue";

export const FbEditorShape: SFCWithInstall<typeof editorShape> =
  withInstall(editorShape);
export default editorShape;
