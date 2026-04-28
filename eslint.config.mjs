import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "dist/**",
    "next-env.d.ts",
    "node_modules/**",
    "AutoGPT/**",
    ".agents/**",
    "jarvis/**",
    "ai-core/**",
    "sandbox/**",
    "tests/**",
    "scripts/**", // Ignore script logs/temporary scripts
    "*.csv",
    "*.json",
    "venv/**",
    "ios/**",
    "electron/**",
  ]),
]);

export default eslintConfig;
