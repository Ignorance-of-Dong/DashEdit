/*
 * @Author: xiaowei
 * @Date: 2025-11-04 16:20:12
 * @LastEditors: xiaowei
 * @LastEditTime: 2025-11-04 16:22:44
 * @Description:
 */
import { buildProps } from "@factverse-bi/utils";
import type { ExtractPropTypes } from "vue";

export const inspectorButtonProps = buildProps({
  /**
   * 按钮 Value
   */
  value: {
    type: [String, Number],
    default: "",
  },
  /**
   * 按钮文本
   */
  text: {
    type: String,
    default: "按钮",
  },
} as const);

export type InspectorButtonProps = ExtractPropTypes<
  typeof inspectorButtonProps
>;
