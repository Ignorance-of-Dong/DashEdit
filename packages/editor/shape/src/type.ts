/*
 * @Author: xiaowei
 * @Date: 2025-10-31 16:01:07
 * @LastEditors: xiaowei
 * @LastEditTime: 2025-10-31 18:12:35
 * @Description: 图片组件 Typings
 */

import { buildProps } from "@factverse-bi/utils";
import type { ExtractPropTypes } from "vue";

export const editorShapeProps = buildProps({
  componentId: {
    type: String,
    default: "",
  },
  canvasId: {
    type: String,
    default: "",
  },
  componentData: {
    type: [] as any,
    default: () => [],
  },
} as const);

export type EditorShapeProps = ExtractPropTypes<typeof editorShapeProps>;
/** 鼠标光标样式类型 */
export type CursorStyle =
  | "nw-resize" // 左上角
  | "n-resize" // 上边
  | "ne-resize" // 右上角
  | "e-resize" // 右边
  | "se-resize" // 右下角
  | "s-resize" // 下边
  | "sw-resize" // 左下角
  | "w-resize" // 左边
  | "move" // 移动
  | "default" // 默认
  | "not-allowed"; // 禁止

/** 调整点样式接口 */
export interface ResizePointStyle extends Record<string, any> {
  marginLeft: string;
  marginTop: string;
  left: string;
  top: string;
  cursor: CursorStyle;
}

/** 画布常量 */
export const CANVAS_CONSTANTS = {
  /** 默认画布ID */
  DEFAULT_CANVAS_ID: "canvas-main",
  /** 编辑器DOM ID前缀 */
  EDITOR_DOM_PREFIX: "editor-",
  /** 组件DOM ID前缀 */
  COMPONENT_DOM_PREFIX: "component",
  /** 调整点列表 */
  RESIZE_POINTS: ["lt", "t", "rt", "r", "rb", "b", "lb", "l"] as const,
} as const;
/** 调整点位置类型 */
export type ResizePointPosition =
  | "lt"
  | "t"
  | "rt"
  | "r"
  | "rb"
  | "b"
  | "lb"
  | "l";
