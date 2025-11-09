<!--
 * @Author: zhangzheng
 * @Date: 2025-09-30 15:29:27
 * @LastEditors: zhangzheng
 * @LastEditTime: 2025-10-15 16:51:59
 * @Description: 
-->
<template>
  <el-row :class="[ns.b()]">
    <div :class="ns.e('scale-area')">
      <el-input-number
        @keydown.stop
        @keyup.stop
        v-model="scale"
        effect="dark"
        :min="10"
        :max="200"
        size="small"
        controls-position="right"
        @change="handleScaleChange()"
        :class="ns.e('scale-input')"
      />

      <el-icon
        @click="scaleDecrease(1)"
        :class="ns.e('icon')"
        style="margin-right: 12px"
      >
        <ZoomOut
      /></el-icon>
      <el-slider
        style="width: 100px; margin-right: 12px"
        v-model="scale"
        :min="10"
        :max="200"
        tooltip-theme="light"
        @change="handleScaleChange()"
        size="small"
      />
      <el-icon @click="scaleIncrease(1)" :class="ns.e('icon')">
        <ZoomIn />
      </el-icon>
      <el-divider direction="vertical" :class="ns.e('divider-scale')" />
      <el-tooltip
        effect="light"
        :content="t('visualization.locate_tips')"
        placement="top"
      >
        <el-icon
          @click="reposition"
          :class="ns.e('icon')"
          style="margin-right: 12px"
          ><FullScreen
        /></el-icon>
      </el-tooltip>
    </div>
  </el-row>
</template>

<script setup lang="ts">
import { FullScreen, ZoomOut, ZoomIn } from "@element-plus/icons-vue";
import { useEditorDataStore } from "@factverse-bi/store/editor";
import { ref, onMounted, onUnmounted, nextTick, toRef } from "vue";
import { changeComponentsSizeWithScaleUtil } from "@factverse-bi/utils/editor/componentScaleAdapter";

const { changeSizeWithScale, changeSizeWithScaleAdaptor } =
  changeComponentsSizeWithScaleUtil();

import { useEmitt, useNamespace } from "@factverse-bi/hooks";

const ns = useNamespace("editor-toolbar");

const editorDataStore = useEditorDataStore();
const canvasStyleData = toRef(editorDataStore, "canvasStyleData");
const editMode = toRef(editorDataStore, "editMode");
const scale = ref(60);
const scaleChangeReady = ref(true);
const t = (a) => a;
const handleScaleChange = () => {
  if (scaleChangeReady.value) {
    scaleChangeReady.value = false;
    setTimeout(() => {
      // 画布比例设一个最小值，不能为 0
      scale.value = ~~scale.value || 10;
      scale.value = scale.value < 10 ? 10 : scale.value;
      scale.value = scale.value > 200 ? 200 : scale.value;
      changeSizeWithScale(scale.value);
      changeSizeWithScaleAdaptor(scale.value);
      scaleChangeReady.value = true;
    }, 150);
  }
};

const scaleDecrease = (speed = 1) => {
  if (scale.value > 10) {
    scale.value = scale.value - speed;
    handleScaleChange();
  }
};

const scaleIncrease = (speed = 1) => {
  if (scale.value < 200) {
    scale.value = scale.value + speed;
    handleScaleChange();
  }
};

const reposition = () => {
  useEmitt().emitter.emit("initScroll");
};

const handleMouseWheel = (e) => {
  if (
    editMode.value === "preview" ||
    (Math.abs(e.deltaX) !== 0 && Math.abs(e.deltaY) !== 0)
  ) {
    return;
  }
  if (e.ctrlKey) {
    if (e.deltaY > 0) {
      //向内 缩小
      scaleDecrease(3);
      e.stopPropagation();
      e.preventDefault();
    }
    if (e.deltaY < 0) {
      //向外 放大
      scaleIncrease(3);
      e.stopPropagation();
      e.preventDefault();
    }
  }
};

onMounted(() => {
  window.addEventListener("wheel", handleMouseWheel, { passive: false });
  setTimeout(() => {
    scale.value = canvasStyleData.value.scale;
    nextTick(() => {
      useEmitt().emitter.emit("initScroll");
    });
  }, 1000);
  useEmitt({
    name: "canvasScrollRestore",
    callback: function () {
      // 用于全屏后还原编辑状态大小
      changeSizeWithScale(scale.value);
    },
  });
});

onUnmounted(() => {
  window.removeEventListener("wheel", handleMouseWheel);
});
</script>
