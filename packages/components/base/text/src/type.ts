/*
 * @Author: xiaowei
 * @Date: 2025-10-31 16:01:07
 * @LastEditors: xiaowei
 * @LastEditTime: 2025-10-31 16:49:19
 * @Description: 文本组件 Typings
 */

import { buildProps } from "@factverse-bi/utils";
import type { ExtractPropTypes } from "vue";

export const textProps = buildProps({
  /**
   * 文本value
   */
  value: {
    type: [String, Number],
    default: "",
  },
} as const);

export type ImageProps = ExtractPropTypes<typeof textProps>;
