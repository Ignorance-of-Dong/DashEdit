import installer from "./defaults";

/*
 * @Author: xiaowei
 * @Date: 2025-10-31 16:15:25
 * @LastEditors: xiaowei
 * @LastEditTime: 2025-11-04 11:38:27
 * @Description: FactVerse BI
 */
export * from "@factverse-bi/components";
export * from "@factverse-bi/resolver";
export * from "@factverse-bi/editor";
export * from "@factverse-bi/utils";
export * from "@factverse-bi/hooks";
export * from "@factverse-bi/directives";
export * from "@factverse-bi/themes";

export const install = installer.install;
export default install;
