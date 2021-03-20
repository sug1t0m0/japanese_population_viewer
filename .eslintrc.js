module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        node: true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "warn",
        "react/prop-types": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off"
    },
    "overrides": [
        {
            // enable the rule specifically for TypeScript files
            "files": ["*.ts", "*.tsx"],
            "rules": {
                "@typescript-eslint/explicit-module-boundary-types": "off"
            }
        }
    ]
};
