<!--
 * @Author: zhangzheng
 * @Date: 2025-10-21 17:23:55
 * @LastEditors: zhangzheng
 * @LastEditTime: 2025-11-05 17:23:18
 * @Description: 
-->
<template>
  <div :class="[ns.b()]">
    <slot name="header" />
    <div
      element-loading-background="rgba(0, 0, 0, 0)"
      :class="ns.e('container')"
      :loading="loading"
    >
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useSlots } from "vue";
import { useNamespace } from "@factverse-bi/hooks";

const ns = useNamespace("editor-layout");

const isHeaderSlot = useSlots().header;
const props = defineProps<{
  loading?: boolean;
}>();
</script>
