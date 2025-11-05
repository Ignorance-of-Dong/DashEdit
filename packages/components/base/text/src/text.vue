<!--
 * @Author: xiaowei
 * @Date: 2025-10-31 15:56:37
 * @LastEditors: xiaowei
 * @LastEditTime: 2025-10-31 16:51:20
 * @Description: 文本组件示例
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
import { textProps } from "./type";

defineOptions({
  name: "FbText",
});

const props = defineProps(textProps);

const ns = useNamespace("text");
</script>
