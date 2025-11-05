/*
 * @Author: xiaowei
 * @Date: 2025-09-23 15:50:11
 * @LastEditors: xiaowei
 * @LastEditTime: 2025-11-05 10:16:15
 * @Description:  unplugin-vue-components 解析器
 */

import {
  ComponentInfo,
  ComponentResolver,
  SideEffectsInfo,
} from "unplugin-vue-components/types";

export interface FactverseBIResolverOptions {
  /**
   * import style css or sass with components
   *
   * @default 'css'
   */
  importStyle?: boolean | "css" | "sass";

  /**
   * use commonjs lib & source css or scss for ssr
   */
  ssr?: boolean;

  /**
   * exclude component name, if match do not resolve the name
   */
  exclude?: RegExp;

  /**
   * a list of component names that have no styles, so resolving their styles file should be prevented
   */
  noStylesComponents?: string[];
}

type FactverseBIResolverOptionsResolved = Required<
  Omit<FactverseBIResolverOptions, "exclude">
> &
  Pick<FactverseBIResolverOptions, "exclude">;

function kebabCase(key: string) {
  const result = key.replace(/([A-Z])/g, " $1").trim();
  return result.split(" ").join("-").toLowerCase();
}

function getSideEffects(
  dirName: string,
  options: FactverseBIResolverOptionsResolved
): SideEffectsInfo | undefined {
  const { importStyle, ssr } = options;
  const componentsFolder = "factverse-bi/components";
  const themeFolder = "factverse-bi/themes";
  if (importStyle === "sass") {
    // return [`${componentsFolder}/${dirName}/style/index.scss`];
    return ssr
      ? [`${themeFolder}/src/base.scss`, `${themeFolder}/src/${dirName}.scss`]
      : [
          `${componentsFolder}/base/style/index`,
          `${componentsFolder}/${dirName}/style/index`,
        ];
  } else if (importStyle === true || importStyle === "css") {
    return [`${componentsFolder}/${dirName}/style/css`];
  }
}

function resolveComponents(
  name: string,
  options: FactverseBIResolverOptionsResolved
): ComponentInfo | undefined {
  // 过滤掉排除的组件
  if (options.exclude && options.exclude.test(name)) return;
  // 过滤掉非FB开头的组件
  if (!name.match(/^Fb[A-Z]/)) return;

  const partialName = kebabCase(name.slice(2));
  return {
    from: `factverse-bi/components`,
    name: name,
    sideEffects: getSideEffects(partialName, options),
  };
}
const noStylesComponents: any[] = [];

/**
 * Resolver for Factverse BI
 *
 * @author xiaowei
 */
export function FactverseBIResolver(
  options: FactverseBIResolverOptions = {}
): ComponentResolver[] {
  let optionsResolved: FactverseBIResolverOptionsResolved;

  // 合并配置项
  async function resolveOptions() {
    if (optionsResolved) return optionsResolved;
    optionsResolved = {
      ssr: false,
      importStyle: "sass",
      exclude: undefined,
      noStylesComponents: options.noStylesComponents || [],
      ...options,
    };
    return optionsResolved;
  }
  return [
    {
      type: "component",
      resolve: async (name: string) => {
        const options = await resolveOptions();
        if (
          [...options.noStylesComponents, ...noStylesComponents].includes(name)
        ) {
          return resolveComponents(name, { ...options, importStyle: false });
        } else {
          return resolveComponents(name, options);
        }
      },
    },
  ];
}
