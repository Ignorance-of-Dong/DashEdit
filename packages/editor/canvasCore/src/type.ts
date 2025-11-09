/*
 * @Author: xiaowei
 * @Date: 2025-10-31 16:01:07
 * @LastEditors: xiaowei
 * @LastEditTime: 2025-10-31 18:12:35
 * @Description: 图片组件 Typings
 */

import { buildProps } from "@factverse-bi/utils";
import type { ExtractPropTypes } from "vue";

export const editorCanvasCoreProps = buildProps({
  canvasId: {
    type: String,
    default: "",
  },
  componentData: {
    type: [] as any,
    default: () => [],
  },
  canvasStyleData: {
    type: Object,
    default: () => ({}),
  },
} as const);

export type EditorCanvasCoreProps = ExtractPropTypes<
  typeof editorCanvasCoreProps
>;
