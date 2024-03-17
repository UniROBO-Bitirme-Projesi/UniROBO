module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  extends: ['airbnb', 'prettier'],
  plugins: ['react', 'react-hooks', 'react-native', 'prettier'],
  env: {
    es6: true,
    jest: true,
    browser: true,
    node: true,
    'react-native/react-native': true,
  },
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react-native/no-inline-styles': 'warn',
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'import/prefer-default-export': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['state'] }],
  },
  settings: {
    'import/resolver': {
      'babel-module': {
        root: ['./src'],
        alias: {
          '@components': './src/components',
          '@assets': './src/assets',
          '@hooks': './src/hooks',
          '@navigation': './src/navigation',
          '@localization': './src/localization',
          '@services': './src/services',
          '@utils': './src/utils',
          '@store': './src/store',
          '@tests': './__tests__',
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
