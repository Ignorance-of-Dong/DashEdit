<!--
 * @Author: xiaowei
 * @Date: 2025-11-04 16:17:25
 * @LastEditors: xiaowei
 * @LastEditTime: 2025-11-04 16:31:08
 * @Description: 
-->
<template>
  <div :class="ns.b()">
    <slot>
      {{ text }}
    </slot>
  </div>
</template>
<script setup lang="ts">
import { useNamespace } from "@factverse-bi/hooks";
import { inspectorButtonProps } from "./type";

defineOptions({
  name: "FbButtonImage",
});

const props = defineProps(inspectorButtonProps);
const ns = useNamespace("inspector-button"); // 例：ns.b() => fb-inspector-button, ns.e('header') => fb-inspector-button__header
</script>
