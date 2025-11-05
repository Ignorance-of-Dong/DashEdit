# @factverse-bi/resolver

FactVerse BI 组件的自动导入解析器，用于 unplugin-vue-components。

## 安装

```bash
npm install @factverse-bi/resolver
```

## 使用方法

在 vite.config.ts 中配置：

```typescript
import { defineConfig } from "vite";
import Components from "unplugin-vue-components/vite";
import { FactverseUiResolver } from "@factverse-bi/resolver";

export default defineConfig({
  plugins: [
    Components({
      resolvers: [
        FactverseUiResolver({
          importStyle: "sass", // 可选: 'css' | 'sass' | false
          exclude: /^El/, // 可选: 排除某些组件
        }),
      ],
    }),
  ],
});
```

## 开发

```bash
# 安装依赖
npm install

# 构建
npm run build

# 开发模式（监听文件变化）
npm run dev

# 清理构建产物
npm run clean
```

## 配置选项

```typescript
interface FactverseUiResolverOptions {
  /**
   * 是否导入样式文件
   * @default 'css'
   */
  importStyle?: boolean | "css" | "sass";

  /**
   * 排除的组件名称正则表达式
   */
  exclude?: RegExp;

  /**
   * 无样式组件列表
   */
  noStylesComponents?: string[];
}
```

## 构建

使用 Rollup 将 TypeScript 源码打包成 CommonJS 和 ES Module 两种格式，确保在各种环境下都能正常使用。

### 文件结构

```
packages/factverse-bi/resolver/
├── index.ts                 # 源码文件
├── package.json             # 包配置
├── tsconfig.json           # TypeScript 配置
├── rollup.config.js        # Rollup 打包配置
├── .gitignore              # Git 忽略文件
├── README.md               # 使用说明
└── dist/                   # 构建产物
    ├── index.cjs           # CommonJS 格式
    ├── index.cjs.map       # Source map
    ├── index.mjs           # ES Module 格式
    ├── index.mjs.map       # Source map
    └── index.d.ts          # TypeScript 类型定义
```

### 构建配置

#### package.json 关键配置

```json
{
  "main": "./dist/index.cjs", // CommonJS 入口
  "module": "./dist/index.mjs", // ES Module 入口
  "types": "./dist/index.d.ts", // TypeScript 类型定义
  "exports": {
    ".": {
      "import": "./dist/index.mjs", // ES Module 导入
      "require": "./dist/index.cjs", // CommonJS 导入
      "types": "./dist/index.d.ts" // TypeScript 类型
    }
  }
}
```

#### rollup.config.js 配置

- 同时输出 CommonJS 和 ES Module 格式
- 自动生成 TypeScript 类型定义
- 包含 source map 支持
- 正确处理外部依赖

### 使用方法

#### 开发环境

```bash
# 安装依赖
npm install

# 构建
npm run build

# 开发模式（监听文件变化）
npm run dev

# 清理构建产物
npm run clean
```

### 生产环境

在主项目中，构建脚本会自动先构建 resolver：

```bash
# 主项目构建（会自动先构建 resolver）
npm run build

# 或者单独构建 resolver
npm run build:resolver
```

### 构建产物

- `dist/index.cjs` - CommonJS 格式
- `dist/index.mjs` - ES Module 格式
- `dist/index.d.ts` - TypeScript 类型定义
- `dist/index.js.map` - Source map
