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
      'no-unused-vars': 'warn'
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  };