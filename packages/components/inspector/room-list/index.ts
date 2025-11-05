/*
 * @Author: xiaowei
 * @Date: 2025-10-31 15:15:07
 * @LastEditors: xiaowei
 * @LastEditTime: 2025-11-04 11:40:22
 * @Description: 房间列表组件
 */
import { SFCWithInstall, withInstall } from "@factverse-bi/utils";
import roomList from "./src/index.vue";

export const FbRoomList: SFCWithInstall<typeof roomList> =
  withInstall(roomList);

export default FbRoomList;
