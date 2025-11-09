/*
 * @Author: xiaowei
 * @Date: 2025-10-31 16:01:07
 * @LastEditors: xiaowei
 * @LastEditTime: 2025-10-31 18:12:35
 * @Description: 编辑器布局组件 Typings
 */

import { buildProps } from "@factverse-bi/utils";
import type { ExtractPropTypes } from "vue";

export const editorLayoutProps = buildProps({
  /**
   * 是否加载中
   */
  loading: {
    type: Boolean,
    default: false,
  },
} as const);

export type EditorLayoutProps = ExtractPropTypes<typeof editorLayoutProps>;
