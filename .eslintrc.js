module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'plugin:vue/recommended'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/html-indent': 0,
    'vue/max-attributes-per-line': 0,
    'vue/attributes-order': 0,
    'vue/name-property-casing': 0,
    'vue/html-self-closing': 0,
    'vue/no-parsing-error': [0, {
      'x-invalid-end-tag': false
    }],
    'vue/mustache-interpolation-spacing': 0,
    'vue/attribute-hyphenation': 0,
    'vue/require-valid-default-prop': 0,
    'vue/require-default-prop': 0,
    'vue/require-prop-types': 0,
  }
}
