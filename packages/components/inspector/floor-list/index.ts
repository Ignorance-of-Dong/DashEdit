/*
 * @Author: xiaowei
 * @Date: 2025-10-31 15:15:07
 * @LastEditors: xiaowei
 * @LastEditTime: 2025-11-04 11:40:35
 * @Description:
 */
import { SFCWithInstall, withInstall } from "@factverse-bi/utils";
import FloorList from "./src/floor-list.vue";

export const FbFloorList: SFCWithInstall<typeof FloorList> =
  withInstall(FloorList);

export default FbFloorList;
