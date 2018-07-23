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
    "arrow-parens": ["error", "always"],
    "eqeqeq": ["error", "always", {"null": "ignore"}],
    "camelcase": ["error", { "properties": "always" }],
    "comma-dangle": ["error", "never"],
    "require-jsdoc": ["error", {
      "require": {
          "FunctionDeclaration": true,
          "MethodDefinition": false,
          "ClassDeclaration": false,
          "ArrowFunctionExpression": false,
          "FunctionExpression": false
      }
    }],
    "semi": ["error", "never"]
  }
}