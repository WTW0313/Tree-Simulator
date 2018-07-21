module.exports = {
  root: true, 
  parserOptions: {
      sourceType: 'module'
  },
  env: {
      browser: true,
  },
  rules: {
      "indent": ["error", 2],
      "quotes": ["error", "double"],
      "semi": ["error", "always"],
      "no-console": "error",
      "arrow-parens": ["error", "always"],
      "eqeqeq": ["error", "always", {"null": "ignore"}],
      "camelcase": ["error", { "properties": "always" }]
  }
}