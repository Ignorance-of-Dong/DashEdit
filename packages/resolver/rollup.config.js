import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";

export default defineConfig({
  input: "index.ts",
  output: [
    {
      file: "dist/index.cjs",
      format: "cjs",
      exports: "named",
      sourcemap: true,
    },
    {
      file: "dist/index.mjs",
      format: "esm",
      exports: "named",
      sourcemap: true,
    },
  ],
  external: ["@vue/shared", "unplugin-vue-components/types"],
  plugins: [
    nodeResolve({
      preferBuiltins: false,
    }),
    commonjs(),
    json(),
    typescript({
      tsconfig: "./tsconfig.json",
      declaration: true,
      declarationDir: "./dist",
      rootDir: "./",
    }),
  ],
});
