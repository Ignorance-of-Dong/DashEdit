/*
 * @Author: xiaowei
 * @Date: 2025-11-04 11:32:53
 * @LastEditors: xiaowei
 * @LastEditTime: 2025-11-04 16:29:54
 * @Description:
 */

import {
  FbFloorList,
  FbImage,
  FbInspectorButton,
  FbRoomList,
  FbText,
} from "@factverse-bi/components";
import { Plugin } from "vue";

export default [
  // Base
  FbImage,
  FbText,

  // echarts

  // inspector
  FbInspectorButton,
  FbFloorList,
  FbRoomList,
] as Plugin[];
