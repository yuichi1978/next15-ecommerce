import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      // Prisma自動生成ファイルを除外
      "**/generated/**",
      "**/prisma/runtime/**",
      "**/*.wasm.js",
      "**/wasm.js",
      "app/generated/**",
    ],
  },
  {
    rules: {
      // 未使用変数の警告レベルを調整
      "@typescript-eslint/no-unused-vars": ["warn", { 
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "ignoreRestSiblings": true
      }],
      // 未使用式の警告レベルを調整
      "@typescript-eslint/no-unused-expressions": "warn",
      // this aliasの警告レベルを調整
      "@typescript-eslint/no-this-alias": "warn",
      // require()の警告レベルを調整
      "@typescript-eslint/no-require-imports": "warn",
    },
  },
];

export default eslintConfig;