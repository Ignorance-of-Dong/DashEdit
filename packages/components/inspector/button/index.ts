/*
 * @Author: xiaowei
 * @Date: 2025-11-04 16:17:19
 * @LastEditors: xiaowei
 * @LastEditTime: 2025-11-04 16:30:34
 * @Description:
 */

import { SFCWithInstall, withInstall } from "@factverse-bi/utils";
import inspectorButton from "./src/button.vue";

export const FbInspectorButton: SFCWithInstall<typeof inspectorButton> =
  withInstall(inspectorButton);
export default FbInspectorButton;
