import globals from "globals";


/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.node,
      },
      ecmaVersion: "latest",
    },
    plugins: {
      '@stylistic/js': stylisticJs
    },
    rules: {
      '@stylistic/js/indent': [
        'error',
        4
      ],
      '@stylistic/js/quotes': [
        'error',
        'single'
      ],
      '@stylistic/js/semi': [
        'error',
        'never'
      ],
    },
  },
]