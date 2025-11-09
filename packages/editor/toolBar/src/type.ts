/*
 * @Author: xiaowei
 * @Date: 2025-10-31 16:01:07
 * @LastEditors: xiaowei
 * @LastEditTime: 2025-10-31 18:12:35
 * @Description: 编辑器工具栏组件 Typings
 */

import { buildProps } from "@factverse-bi/utils";
import type { ExtractPropTypes } from "vue";

export const editorToolBarProps = buildProps({
  /**
   * 缩放值
   */
  scale: {
    type: Number,
    default: 1,
  },
} as const);

export type EditorToolBarProps = ExtractPropTypes<typeof editorToolBarProps>;
