// NOTE: 단위 테스트를 위한 설정파일

module.exports = {
    // 파일 확장자를 지정하지 않은 경우 Jest 가 검색할 확장자 목록
    moduleFileExtensions: [
        'js',
        'vue',
    ],
    // 경로 별칭 매핑
    moduleNameMapper: {
        // <rootDir> 토큰을 통해 루트 경로를 참조할 수 있다
        '^~/(.*)$': '<rootDir>/src/$1',
        // 정적 파일 매칭
        '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
        '\\.(s?css|less)$': '<rootDir>/__mocks__/styleMock.js', // 정상 처리를 원할 시 identity-obj-proxy 패키지 할당
    },
    // 제외 모듈 경로
    modulePathIgnorePatterns: [
        '<rootDir>/node_modules',
        '<rootDir>/dist',
    ],
    // 테스트를 적용할 파일 지정
    testMatch: [
        "<rootDir>/test/unit/**/*.test.(js|jsx|ts|tsx)",
    ],
    // JS DOM 환경에 대한 URL 설정
    // testURL: 'http://localhost', // jest v28 부터 testURL 속성이 testEnvironmentOptions.url 로 변경
    testEnvironment: "jsdom",
    testEnvironmentOptions: {
        url: "http://localhost/",
        customExportConditions: [
            "node",
            "node-addons"
        ]
    },
    // 정규식과 일치하는 파일의 변환 모듈 지정
    transform: {
        '^.+\\.vue$': '@vue/vue3-jest',
        '^.+\\.js$': 'babel-jest',
    },
    verbose: true,
}