module.exports = {
    root: true,
    env : {
        browser : true,
        es6     : true,
        commonjs: true,
        node    : true,
        amd     : true,
    },
    parserOptions: {
        ecmaVersion: 2020,
        parser     : 'babel-eslint',
        sourceType : 'module',
    },
    extends: ['eslint:recommended'],
    plugins: ['prettier'],
    rules  : {
        // 缩进规则
        indent: ['error', 4, {
            VariableDeclarator: 'first',
            MemberExpression  : 1,
            ArrayExpression   : 'first',
            ImportDeclaration : 'first'
        }],
        // 强制使用一致的换行风格
        'linebreak-style': ['error', 'unix'],
        // 要求构造函数首字母大写
        'new-cap'        : [2, {
            newIsCap: true,
            capIsNew: false
        }],
        // 禁止出现令人困惑的多行表达式
        'no-unexpected-multiline': 2,
        // 强制操作符使用一致的换行符
        'operator-linebreak'     : [2, 'after', {
            overrides: {
                '?': 'before',
                ':': 'before'
            }
        }],
        // 要求或禁止块内填充
        'padded-blocks': [2, 'never'],
        // 优先使用单引号
        quotes           : [
            'error',
            'single',
            { allowTemplateLiterals: true, avoidEscape: true },
        ],
        // 结尾不需要分号
        semi: [
            'error',
            'never',
            {
                beforeStatementContinuationChars: 'always',
            },
        ],
        // 对象key空格设置
        'key-spacing': [2, {
            beforeColon: false,
            afterColon : true,
            mode       : 'minimum',
            align      : 'colon'
        }],
        // 关键词空格设置
        'keyword-spacing': [2, {
            before: true,
            after : true
        }],
        // 连续空格设置
        'no-multi-spaces': ['error', {
            exceptions: {
                'VariableDeclarator': true,
                'ImportDeclaration' : true,
                'BinaryExpression'  : true
            }
        }],
        // 禁止或强制在代码块中开括号前和闭括号后有空格
        'block-spacing'              : [2, 'always'],
        // 强制在块之前使用一致的空格
        'space-before-blocks'        : [2, 'always'],
        // 强制在 function的左括号之前使用一致的空格
        'space-before-function-paren': [0, 'never'],
        // 强制在圆括号内使用一致的空格
        'space-in-parens'            : [2, 'never'],
        // 强制在一元操作符前后使用一致的空格
        'space-unary-ops'            : [2, {
            words   : true,
            nonwords: false
        }],
        // 强制在大括号中使用一致的空格
        'object-curly-spacing': [2, 'always', {
            objectsInObjects: false
        }],
        // 强制数组方括号中使用一致的空格
        'array-bracket-spacing': [2, 'never'],

        'comma-dangle' : ['error', 'only-multiline'],
        'comma-spacing': [1, {
            before: false,
            after : true
        }],
        'dot-location'           : [2, 'property'],
        'no-cond-assign'         : ['error', 'always'],
        'no-multiple-empty-lines': ['error', { max: 1 }],

        'no-console': 'off',

        'arrow-body-style': ['error', 'as-needed'],
        'arrow-parens'    : ['error', 'as-needed'],
        'arrow-spacing'   : ['error', { before: true, after: true }],
        'spaced-comment'  : [
            2,
            'always',
            {
                markers: ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
            }
        ],
        'no-var'                      : 'error',
        eqeqeq                        : ['error', 'always', { null: 'ignore' }],
        'one-var-declaration-per-line': [2, 'always'],
        'space-infix-ops'             : 2,
        'rest-spread-spacing'         : 'error',
    }
}
