module.exports = {
    root: true,
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/essential",
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module",
        parser: 'babel-eslint',
    },
    "plugins": [
        "vue",
    ],
    "rules": {
        "no-undef": "off",
        semi: ["error", "never"],
        indent: ["error", 2],
        "comma-spacing": [2, { "before": false, "after": true }],
        "no-console": 2,
        "no-useless-catch": 0
    }
};