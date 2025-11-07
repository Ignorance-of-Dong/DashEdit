/*
 * @Author: zhangzheng
 * @Date: 2025-11-07 18:13:48
 * @LastEditors: zhangzheng
 * @LastEditTime: 2025-11-07 18:13:51
 * @Description:
 */

/**
 * 画布样式数据类型
 */
export interface CanvasStyleData {
  width: number;
  height: number;
  scale: number;
  scaleWidth: number;
  scaleHeight: number;
  backgroundColorSelect: boolean;
  backgroundImageEnable: boolean;
  background: string;
  fontSize: number;
  fontFamily: string;
  color: string;
  backgroundColor: string | null;
  component: any;
}

/**
 * 沙盒画布样式类型
 */
export interface SandboxCanvasStyle {
  width: number;
  height: number;
  scale: number;
  widthScale: number;
  heightScale: number;
}

/**
 * 组件样式类型
 */
export interface ComponentStyle {
  width: number;
  height: number;
  top: number;
  left: number;
  rotate?: number;
  transition?: string;
  [key: string]: any;
}

/**
 * 组件数据类型
 */
export interface ComponentData {
  id: string;
  component: string;
  style: ComponentStyle;
  propValue?: any;
  type?: string;
  key?: string;
  componentId?: string;
  [key: string]: any;
}

/**
 * 浮动位置类型
 */
export type FloatPosition = "left" | "right" | "leftTop" | "bottom";

/**
 * 布局类型
 */
export type LayoutType = "horizontal" | "vertical";

/**
 * 高度类型
 */
export type HeightType = "auto" | "fixed";

/**
 * 障碍物方向
 */
export type ObstacleDirection = "top" | "right" | "bottom" | "left" | "leftTop";

/**
 * 扩展方向
 */
export type ExpansionDirection = "left" | "right" | "top" | "bottom";

/**
 * 画布项类型
 */
export interface CanvasItem {
  id: string;
  width: number;
  minWidth: number;
  height: number;
  heightType?: HeightType;
  top: number;
  left: number;
  bottom?: number;
  layout: LayoutType;
  components: ComponentData[];
  componentGap: number;
  borderRadius: number;
  squeezing: string[];
  obstacle: ObstacleDirection[];
  expansionDirection: ExpansionDirection;
  floatPosition: FloatPosition;
  isPositionLeftScale?: boolean;
  aligin?: string;
}

/**
 * 沙盒画布集合类型
 */
export interface SandboxCanvas {
  [key: string]: CanvasItem;
}

/**
 * 编辑模式类型
 */
export type EditMode = "edit" | "preview";

/**
 * 模式类型
 */
export type Mode = "sandbox" | "editor";

/**
 * 拖拽状态类型
 */
export type DragStatus = "idle" | "dragIn" | "dragOut";

/**
 * 沙盒画布状态类型
 */
export type SandboxCanvasStatus = "idle" | "update";

/**
 * 编辑器映射类型
 */
export interface EditorMap {
  [key: string]: HTMLElement | null;
}

/**
 * Editor Store State 类型
 */
export interface EditorDataState {
  canvasStyleData: CanvasStyleData;
  editMode: EditMode;
  componentData: ComponentData[];
  curComponent: ComponentData | null;
  scale: number;
  mode: Mode;
  dragStatus: DragStatus;
  dragCanvasId: string;
  curComponentIndex: number | null;
  editorMap: EditorMap;
  isSpaceDown: boolean;
  sandboxCanvasStyle: SandboxCanvasStyle;
  sandboxCanvasStatus: SandboxCanvasStatus;
  sandboxCanvasSnapshot: SandboxCanvas[];
  sandboxCanvasSnapshotIndex: number;
  sandboxCanvas: SandboxCanvas;
}

/**
 * 添加沙盒组件参数类型
 */
export interface AddSandboxComponentParams {
  component: ComponentData;
  canvasId: string;
}

/**
 * 设置当前组件参数类型
 */
export interface SetCurComponentParams {
  component: ComponentData | null;
  index: number | null;
}

/**
 * 添加组件参数类型
 */
export interface AddComponentParams {
  component: ComponentData;
  index?: number;
  componentData?: ComponentData[];
}

/**
 * 设置形状样式参数类型
 */
export interface SetShapeStyleParams {
  top?: number;
  left?: number;
  width?: number;
  height?: number;
  rotate?: number;
  transition?: string;
}
