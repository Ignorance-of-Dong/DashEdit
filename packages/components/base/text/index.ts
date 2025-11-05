/*
 * @Author: xiaowei
 * @Date: 2025-10-31 15:54:47
 * @LastEditors: xiaowei
 * @LastEditTime: 2025-10-31 16:54:08
 * @Description: 文本组件
 */

import { SFCWithInstall, withInstall } from "@factverse-bi/utils";

import Text from "./src/text.vue";

export const FbText: SFCWithInstall<typeof Text> = withInstall(Text);
export default FbText;
