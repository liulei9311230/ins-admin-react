module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: ['prettier', 'plugin:prettier/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  parser: 'babel-eslint',
  rules: {
    indent: 0,
    'no-multi-spaces': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    quotes: 'off',
    semi: ['error', 'always'],
    'comma-dangle': 'off',
    'no-multiple-empty-lines': 'off',
    eqeqeq: 'off',
    'no-eval': 'off',
    'react/jsx-uses-react': 2,
    'react/jsx-uses-vars': 2,
    'react/react-in-jsx-scope': 2,
    'react/jsx-indent': [2, 2],
    'react/jsx-indent-props': [2, 2],
    'prettier/prettier': 'error'
  },
  plugins: ['prettier', 'react']
};
