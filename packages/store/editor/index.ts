/*
 * @Author: zhangzheng
 * @Date: 2025-09-25 19:12:54
 * @LastEditors: zhangzheng
 * @LastEditTime: 2025-11-07 18:16:10
 * @Description:
 */
import { defineStore } from "pinia";
import { clone } from "ramda";
import type {
  EditorDataState,
  CanvasStyleData,
  ComponentData,
  SandboxCanvas,
  SandboxCanvasStatus,
  AddSandboxComponentParams,
  DragStatus,
  SetCurComponentParams,
  AddComponentParams,
  SetShapeStyleParams,
  CanvasItem,
} from "./type";

export const useEditorDataStore = defineStore("editorData", {
  state: (): EditorDataState => {
    return {
      canvasStyleData: {
        width: 1920,
        height: 1080,
        scale: 60,
        scaleWidth: 60,
        scaleHeight: 60,
        backgroundColorSelect: true,
        backgroundImageEnable: false,
        background: "",
        fontSize: 14,
        fontFamily: "PingFang",
        color: "#fff",
        backgroundColor: null,
        component: {},
      },
      editMode: "edit",
      componentData: [],
      curComponent: null,
      scale: 1,
      mode: "sandbox", // sandbox editor
      dragStatus: "idle", // idle dragIn dragOut
      dragCanvasId: "",
      curComponentIndex: null,
      editorMap: {},
      isSpaceDown: false,
      sandboxCanvasStyle: {
        width: 1920,
        height: 1080,
        scale: 1,
        widthScale: 1,
        heightScale: 1,
      },
      sandboxCanvasStatus: "idle",
      sandboxCanvasSnapshot: [],
      sandboxCanvasSnapshotIndex: -1,
      sandboxCanvas: {
        left: {
          id: "left",
          width: 400,
          minWidth: 400,
          height: 1080,
          heightType: "auto",
          top: 0,
          left: 0,
          layout: "vertical",
          components: [],
          componentGap: 10,
          borderRadius: 10,
          squeezing: ["leftTop"], // 将要挤压的画布
          obstacle: ["bottom", "right"], // 障碍物
          expansionDirection: "right",
          floatPosition: "left",
        },
        leftTop: {
          id: "leftTop",
          width: 400,
          minWidth: 400,
          height: 100,
          top: 0,
          left: 400,
          components: [],
          isPositionLeftScale: true,
          layout: "horizontal",
          componentGap: 10,
          borderRadius: 10,
          squeezing: ["left"], // 允许 left 画布挤压 leftTop
          obstacle: ["right"],
          expansionDirection: "right",
          floatPosition: "leftTop",
        },
        right: {
          id: "right",
          width: 400,
          minWidth: 400,
          height: 1080,
          heightType: "auto",
          top: 0,
          left: 0,
          components: [],
          componentGap: 10,
          layout: "vertical",
          borderRadius: 10,
          squeezing: [], // 允许所有画布挤压
          obstacle: ["leftTop"],
          expansionDirection: "left",
          floatPosition: "right",
        },
        // bottom: {
        //   id: "bottom",
        //   width: 500,
        //   minWidth: 400,
        //   height: 100,
        //   bottom: 10,
        //   left: 1000,
        //   aligin: "center",
        //   components: [],
        //   componentGap: 10,
        //   layout: "horizontal",
        //   scale: 100,
        //   borderRadius: 10,
        //   squeezing: [], // 不允许任何画布挤压（严格保护）
        //   obstacle: ["leftTop"], // 只允许 leftTop 画布覆盖
        //   expansionDirection: "right",
        // },
      },
    };
  },
  actions: {
    recordSandboxSnapshot(): void {
      if (this.mode === "sandbox") {
        const newSnapshot: SandboxCanvas = clone(this.sandboxCanvas);
        this.sandboxCanvasSnapshot[++this.sandboxCanvasSnapshotIndex] =
          newSnapshot;
        if (
          this.sandboxCanvasSnapshotIndex <
          this.sandboxCanvasSnapshot.length - 1
        ) {
          this.sandboxCanvasSnapshot = this.sandboxCanvasSnapshot.slice(
            0,
            this.sandboxCanvasSnapshotIndex + 1
          );
        }
      }
    },

    undoSandboxSnapshot(): void {
      if (this.sandboxCanvasSnapshotIndex > 0) {
        this.sandboxCanvasSnapshotIndex--;
        this.sandboxCanvas =
          this.sandboxCanvasSnapshot[this.sandboxCanvasSnapshotIndex];
      }
    },

    redoSandboxSnapshot(): void {
      if (
        this.sandboxCanvasSnapshotIndex <
        this.sandboxCanvasSnapshot.length - 1
      ) {
        this.sandboxCanvasSnapshotIndex++;
        this.sandboxCanvas =
          this.sandboxCanvasSnapshot[this.sandboxCanvasSnapshotIndex];
      }
    },

    setSandboxCanvasStatus(status: SandboxCanvasStatus): void {
      this.sandboxCanvasStatus = status;
    },

    addSandboxComponent({
      component,
      canvasId,
    }: AddSandboxComponentParams): void {
      this.sandboxCanvas[canvasId].components.push(component);
    },

    setDragStatus(status: DragStatus = "idle", canvasId?: string): void {
      this.dragStatus = status;
      this.dragCanvasId = canvasId || "";
    },

    setSpaceDownStatus(value: boolean): void {
      this.isSpaceDown = value;
    },

    getEditor(canvasId: string = "canvas-main"): void {
      this.editorMap[canvasId] = document.querySelector("#editor-" + canvasId);
    },

    setContainerScale(value: number): void {
      this.sandboxCanvasStyle.scale = value;
    },

    setContainerHeightScale(value: number): void {
      this.sandboxCanvasStyle.heightScale = value;
    },

    setContainerWidthScale(value: number): void {
      this.sandboxCanvasStyle.widthScale = value;
    },

    setComponentData(componentData: ComponentData[] = []): void {
      this.componentData = componentData;
    },

    setCurComponent({ component, index }: SetCurComponentParams): void {
      this.curComponent = component;
      this.curComponentIndex = index;
    },

    setCanvasStyle(style: CanvasStyleData): void {
      this.canvasStyleData = style;
    },

    addComponent({
      component,
      index,
      componentData,
    }: AddComponentParams): void {
      const targetData = componentData || this.componentData;
      if (index !== undefined) {
        targetData.splice(index, 0, component);
        this.setCurComponent({ component: component, index: index });
      } else {
        targetData.push(component);
      }
    },

    setShapeStyle({
      top,
      left,
      width,
      height,
      rotate,
      transition,
    }: SetShapeStyleParams): void {
      if (!this.curComponent) return;
      if (top !== undefined) this.curComponent.style.top = top;
      if (left !== undefined) this.curComponent.style.left = left;
      if (width) this.curComponent.style.width = width;
      if (height) this.curComponent.style.height = height;
      if (rotate) this.curComponent.style.rotate = rotate;
      if (transition) this.curComponent.style.transition = transition;
    },
  },
});
