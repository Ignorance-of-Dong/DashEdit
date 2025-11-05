<!--
 * @Author: xiaowei
 * @Date: 2025-10-31 15:56:37
 * @LastEditors: xiaowei
 * @LastEditTime: 2025-11-04 16:13:46
 * @Description: 图片组件示例
-->
<template>
  <div :class="[ns.b()]">
    <div :class="ns.e('header')">组件Header</div>
    <div :class="ns.e('content')">内容</div>
    <div :class="ns.e('footer')">组件Footer</div>
  </div>
</template>
<script setup lang="ts">
import { useNamespace } from "@factverse-bi/hooks";
import { imageProps } from "./type";

defineOptions({
  name: "FbImage",
});

const props = defineProps(imageProps);

const ns = useNamespace("image"); // 例：ns.b() => fb-image, ns.e('header') => fb-image__header
</script>
