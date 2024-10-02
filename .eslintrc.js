// NOTE: 코드 검사를 위한 설정 파일
// [설정 참고] https://eslint.vuejs.org/user-guide/
// [규칙 참고] https://eslint.vuejs.org/rules/

module.exports = {
    // 코드가 동작할(검사할) 환경 명시
    env: {
        browser: true,
        node: true,
        jest: true,
        'cypress/globals': true
    },
    plugins: [
        'cypress'
    ],
    // 검사할 규칙 명시
    extends: [
        // Vue. Vue.js 전용 코드 검사 규칙 3개중 1택 하여 사용
        // "plugin:vue/vue3-essential",         // Lv.1
        "plugin:vue/vue3-strongly-recommended", // Lv.2
        // "plugin:vue/vue3-recommended",       // Lv.3

        // Js. ESlint 권장 규칙 사용
        "eslint:recommended",
    ],
    // 코드를 분석하는데 사용할 패키지 명시
    parserOptions: {
        parser: "babel-eslint"
    },
    // extends 에서 지정한 규칙 외에 커스마이징 할 규칙 명시
    rules: {
        // 닫는 태그(>)를 다음 줄에 작성할지 여부를 명시
        "vue/html-closing-bracket-newline": ["error", {
            "singleline": "never",
            "multiline": "never",
        }],
        // 내부 컨텐츠가 없을 시 self-closing 규칙을 적용할지 여부를 명시
        "vue/html-self-closing": ["error", {
            "html": {
                "void": "always", // img와 같은 한줄 태그. ex: <img />
                "normal": "never", // div와 같은 일반적 태그. ex: <div />
                "component": "always" // 컴포넌트 태그. ex: <my-component />
            },
            "svg": "always",
            "math": "always"
        }],
        // 탭
        "vue/html-indent": ["error", 4, {
            "attribute": 1,
            "baseIndent": 1,
            "closeBracket": 0,
            "alignAttributesVertically": false,
            "ignores": []
        }],
    },
}