<!--
 * @Author: zhangzheng
 * @Date: 2025-09-29 15:57:43
 * @LastEditors: zhangzheng
 * @LastEditTime: 2025-11-05 16:38:49
 * @Description: 编辑器画布核心组件 - 负责渲染画布和组件
-->

<template>
  <div
    :id="editorDomId"
    ref="canvasContainer"
    :class="[ns.b(), canvasClasses]"
    :style="canvasStyle"
    :canvasId="canvasId"
  >
    <!-- 沙盘可拖拽区域预显示 -->

    <FbEditorShape
      v-for="(componentItem, componentIndex) in componentData"
      :id="componentItem.id"
      :canvas-id="canvasId"
      :scale="canvasScale"
      :key="componentItem.id"
      :default-style="componentItem.style"
      :style="getShapeItemStyleForComponent(componentItem)"
      :element="componentItem"
      :index="componentIndex"
      :class="getShapeClasses(componentItem)"
    >
      <component
        :is="componentItem.component"
        :id="getComponentDomId(componentItem.id)"
        :scale="canvasScale"
        :style="getComponentStyle(componentItem.style)"
        :element="componentItem"
      />
    </FbEditorShape>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, toRefs, withDefaults } from "vue";
import type { Ref } from "vue";
import { CANVAS_CONSTANTS } from "@factverse-bi/constants/editor/editor";
import { useNamespace } from "@factverse-bi/hooks";
// 样式工具函数
import {
  getCanvasStyle,
  getShapeItemStyle,
  getStyle,
} from "@factverse-bi/utils/editor/styleGenerator";
import { changeStyleWithScale } from "@factverse-bi/utils/editor/mathUtils";
import { useEditorDataStore } from "@factverse-bi/store/editor";
import { FbEditorShape } from "@factverse-bi/editor";
import { type EditorCanvasCoreProps } from "./type";

const ns = useNamespace("editor-canvas");

// Props 定义
const props = withDefaults(defineProps<EditorCanvasCoreProps>(), {
  canvasId: CANVAS_CONSTANTS.DEFAULT_CANVAS_ID,
  componentData: () => [],
});

// Store 实例
const editorDataStore = useEditorDataStore();
// 直接使用store中的响应式数据
const editMode = computed(() => editorDataStore.editMode);

// 响应式 Props
const { canvasId, canvasStyleData } = toRefs(props);

// 计算属性
/** 画布缩放比例 */
const canvasScale = computed<number>(() => {
  return canvasStyleData.value.scale / 100;
});

/** 编辑器DOM ID */
const editorDomId = computed<string>(() => {
  return `${CANVAS_CONSTANTS.EDITOR_DOM_PREFIX}${canvasId.value}`;
});

/** 画布样式 */
const canvasStyle = computed(() => {
  const baseStyle = getCanvasStyle(canvasStyleData.value, canvasId.value);
  if (editorDataStore.mode === "sandbox") {
    return {
      ...baseStyle,
      width: `100%`,
      height: `100%`,
    };
  } else {
    const scaledWidth = changeStyleWithScale(
      canvasStyleData.value.width,
      canvasStyleData.value.scale
    );
    const scaledHeight = changeStyleWithScale(
      canvasStyleData.value.height,
      canvasStyleData.value.scale
    );

    return {
      ...baseStyle,
      width: `${scaledWidth}px`,
      height: `${scaledHeight}px`,
    };
  }
});

/** 画布CSS类 */
const canvasClasses = computed(() => ({
  [ns.m("edit")]: editMode.value === "edit",
  [ns.m("preview")]: editMode.value === "preview",
}));

// 方法
/** 获取形状项样式 */
const getShapeItemStyleForComponent = (componentItem) => {
  // 获取基础样式（不修改原始数据）
  const baseStyle = getShapeItemStyle(componentItem);

  // 如果是沙盒模式，需要应用 sandboxCanvasStyle 缩放比例
  if (editorDataStore.mode === "sandbox") {
    // 使用 sandboxCanvasStyle 中的缩放比例
    const canvasScale = editorDataStore.sandboxCanvasStyle.scale || 1;

    // 应用缩放比例到样式（只修改返回值，不修改原始数据）
    if (canvasScale !== 1 && componentItem.style) {
      const scaledStyle = { ...baseStyle };
      // 缩放位置和尺寸（添加安全检查）
      if (componentItem.style.width !== undefined) {
        scaledStyle.width = `${componentItem.style.width * canvasScale}px`;
      }
      if (componentItem.style.height !== undefined) {
        scaledStyle.height = `${componentItem.style.height * canvasScale}px`;
      }
      if (componentItem.style.left !== undefined) {
        scaledStyle.left = `${componentItem.style.left * canvasScale}px`;
      }
      if (componentItem.style.top !== undefined) {
        scaledStyle.top = `${componentItem.style.top * canvasScale}px`;
      }
      return scaledStyle;
    }
  }

  return baseStyle;
};

/** 获取组件样式 */
const getComponentStyle = (style) => {
  // return getStyle(style) || {};
  return {};
};

/** 获取形状CSS类 */
const getShapeClasses = (componentItem) => ({
  [ns.e("shape-locked")]: componentItem.isLock && editMode.value === "edit",
  [ns.e("shape-editing")]: componentItem.editing,
  [ns.e("shape-resizing")]: componentItem.resizing,
  [ns.e("shape-dragging")]: componentItem.dragging,
});

/** 获取组件DOM ID */
const getComponentDomId = (componentId: string): string => {
  return `${CANVAS_CONSTANTS.COMPONENT_DOM_PREFIX}${componentId}`;
};

// 生命周期
onMounted(() => {
  // 初始化编辑器DOM引用
  editorDataStore.getEditor(canvasId.value);
});
</script>
