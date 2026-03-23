import { defineConfig } from 'eslint/config'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import eslintPluginReact from 'eslint-plugin-react'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import checkFile from 'eslint-plugin-check-file'

export default defineConfig([
  eslintPluginUnicorn.configs.recommended,
  eslintPluginReact.configs.flat.recommended,
  eslintPluginReact.configs.flat['jsx-runtime'],
  eslintConfigPrettier,
  {
    files: ['**/*.{js,ts,jsx,tsx}'],
    ignores: ['src/components/ui/**'],
    plugins: {
      'check-file': checkFile,
    },
    rules: {
      'unicorn/filename-case': 'off',
      'check-file/filename-naming-convention': [
        'error',
        {
          'src/**/*.{js,ts}': 'CAMEL_CASE',
          'src/**/!(*main|index).{jsx,tsx}': 'PASCAL_CASE',
        },
        {
          ignoreMiddleExtensions: true,
        },
      ],
      'check-file/folder-naming-convention': [
        'error',
        {
          'src/**/!(__tests__)': 'KEBAB_CASE',
        },
      ],
      'unicorn/prevent-abbreviations': 'off',
      'react/prop-types': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
])
