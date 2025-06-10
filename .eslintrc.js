module.exports = {
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:jsx-a11y/recommended'
    ],
    plugins: ['react', 'react-hooks', 'jsx-a11y'],
    rules: {
      'react/prop-types': 'warn',
      'react/react-in-jsx-scope': 'off',
      'no-unused-vars': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn'
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    env: {
      browser: true,
      node: true,
      es6: true
    },
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true
      }
    }
  };