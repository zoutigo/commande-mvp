// eslint.config.js
const { defineConfig } = require('eslint/config');
const expo = require('eslint-config-expo/flat');
const prettierPlugin = require('eslint-plugin-prettier');
const reactNative = require('eslint-plugin-react-native');

module.exports = defineConfig([
  // Base Expo (inclut déjà TS, React, Hooks, et le plugin "import")
  ...expo,

  {
    plugins: {
      'react-native': reactNative,
      // NE PAS redéclarer "import" ici (déjà fourni par expo)
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'warn',
      // tolérances MVP
      'react-native/no-inline-styles': 'off',
      'react-native/no-raw-text': 'off',
      // on peut utiliser la règle du plugin "import" sans le redéclarer
      'import/order': [
        'warn',
        {
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
          groups: [['builtin', 'external'], 'internal', ['parent', 'sibling', 'index']],
        },
      ],
    },
    ignores: ['dist/**', 'build/**', '.expo/**', 'android/**', 'ios/**'],
  },
]);
