module.exports = {
  parser: 'babel-eslint',
  globals: {
    __DEV__: true,
    React$Node: true,
    React$ComponentType: true,
    React$Element: true,
    Generator: true,
    $Values: true,
    $Keys: true,
  },
  env: {
    es6: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-native',
    'flowtype',
  ],
  rules: {
    'linebreak-style': 0,
    'prefer-destructuring': 1,
    'max-len': [
      1,
      {
        code: 170,
        comments: 200,
      },
    ],
    'react/jsx-filename-extension': [
      1,
      {
        extensions: [
          '.js',
          '.jsx',
        ],
      },
    ],
    'no-use-before-define': [2, { functions: false }],
    'react/prop-types': 0,
    'react-native/no-color-literals': 2,
    'import/no-extraneous-dependencies': [
      'error',
      {
        packageDir: './',
      },
    ],
    'import/no-unresolved': [
      2,
      {
        ignore: [
          '@components',
          '@actionCreators',
          '@actionTypes',
          '@config',
          '@features',
          '@i18n',
          '@middleware',
          '@reducers',
          '@sagas',
          '@selectors',
          '@router',
          '@screens',
          '@theme',
          '@images',
          '@core',
          'react-native-image-resizer',
          '@animations',
        ],
      },
    ],
    'react/destructuring-assignment': 0,
    'no-restricted-syntax': 0,
    'react/state-in-constructor': [
      1,
      'never',
    ],
    'react/jsx-fragments': 0,
    'react/jsx-props-no-spreading': 0,
    'react/sort-comp': 0,
    'react/static-property-placement': 0,
    'react/jsx-one-expression-per-line': 1,
    'react/require-default-props': [2, { forbidDefaultForRequired: false }],
    'react/default-props-match-prop-types': [2, { allowRequiredDefaults: true }],
    'no-multiple-empty-lines': ['error', { max: 3 }],
    'object-curly-newline': ['error', {
      ObjectExpression: { minProperties: 5, multiline: true, consistent: true },
      ObjectPattern: { minProperties: 5, multiline: true, consistent: true },
      ImportDeclaration: { minProperties: 5, multiline: true, consistent: true },
      ExportDeclaration: { minProperties: 5, multiline: true, consistent: true },
    }],
  },
  overrides: [
    {
      files: ['src/**/*.test.js'],
      rules: {
        'max-len': 0,
      },
    },
  ],
};
