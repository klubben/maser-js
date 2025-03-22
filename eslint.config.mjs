// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [".*", "*.ts", "*.tsx"],
        },
      ],
      "no-console": "error",
      curly: "error",
    },
  },
);
