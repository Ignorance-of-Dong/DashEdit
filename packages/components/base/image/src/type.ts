/*
 * @Author: xiaowei
 * @Date: 2025-10-31 16:01:07
 * @LastEditors: xiaowei
 * @LastEditTime: 2025-10-31 18:12:35
 * @Description: 图片组件 Typings
 */

import { buildProps } from "@factverse-bi/utils";
import type { ExtractPropTypes } from "vue";

export const imageProps = buildProps({
  /**
   * 图片 Value
   */
  value: {
    type: [String, Number],
    default: "",
  },
} as const);

export type ImageProps = ExtractPropTypes<typeof imageProps>;
