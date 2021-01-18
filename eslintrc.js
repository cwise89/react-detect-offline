module.exports = {
    extends: [
        'airbnb-typescript',
        'airbnb/hooks',
        'plugin:@typescript-eslint/recommended',
        'plugin:jest/recommended',
        'prettier',
        'prettier/react',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
        "plugin:security/recommended"
    ],
    plugins: ['react', '@typescript-eslint', 'jest', 'prettier', 'security'],
    env: {
        browser: true,
        es6: true,
        jest: true,
    },
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
        project: './tsconfig.json',
    },
    rules: {
        "react/prop-types": "off",
        "no-underscore-dangle": "off",
        "import/no-extraneous-dependencies": "off",
        "no-console": ["warn", { allow: ["warn", "error"] }],
        'linebreak-style': "off",
        "react/jsx-props-no-spreading": "off",
        "@typescript-eslint/no-inferrable-types": ["error"],
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
            },
        ],
    },
};