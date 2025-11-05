/*
 * @Author: xiaowei
 * @Date: 2025-10-31 15:54:47
 * @LastEditors: xiaowei
 * @LastEditTime: 2025-10-31 16:46:53
 * @Description: 图片组件
 */

import { SFCWithInstall, withInstall } from "@factverse-bi/utils";

import Image from "./src/image.vue";

export const FbImage: SFCWithInstall<typeof Image> = withInstall(Image);
export default FbImage;
