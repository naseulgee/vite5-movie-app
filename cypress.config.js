/** NOTE: E2E 테스트 Cypress 설정 파일
 * [참고] https://docs.cypress.io/guides/references/configuration#e2e
 * [참고] https://docs.cypress.io/guides/references/configuration#Folders--Files
 * 
 * fixtures: 네트워크 응답 같은 테스트에 필요한 정적인 데이터들 만들어 둘 수 있다. cy.fixture() 커맨드를 통해 사용할 수 있다.
 * setupNodeEvents: 노드 이벤트를 등록하고 구성을 수정할 수 있는 기능.
 *      - 플러그인 대체 기능.
 *      - cypress lifecycle의 특정 단계에 실행할 코드 작성, 동적으로 설정 구성 등을 작성할 수 있다.
 * support: plugins 처럼 각 테스트 파일 수행 전 실행된다. 예로 before나 beforeEach를 정의할 수 있다.
 */
const { defineConfig } = require("cypress");

module.exports = defineConfig({
    // 환경 변수 로 설정할 값
    // env: {},

    // 테스트 중 저장될 파일의 경로
    // downloadsFolder  : 'cypress/downloads',
    fixturesFolder   : false, // 비활성화 시 false 값 입력. (cypress/fixtures)
    // screenshotsFolder: 'cypress/screenshots', // cy.screenshot() 명령에서 스크린샷을 저장하거나 테스트가 실패한 후 스크린샷이 저장된다
    // video            : false, // 테스트시 각 파일에 대한 영상을 녹화. 활성화 시 true 값 입력
    // videosFolder     : 'cypress/videos',

    // 테스트 화면 설정
    // viewportHeight: 660,
    // viewportWidth : 1000,
    e2e: {
        baseUrl: 'http://localhost:8080', // cy.visit(), cy.request() 명령 실행 시 기본적으로 접근할 주소
        specPattern: 'test/e2e/**/*.js', // 테스트 할 파일 경로 지정. (cypress/e2e/**/*.cy.{js,jsx,ts,tsx})
        supportFile: false, // 각 테스트 파일 수행 전 실행될 파일 경로 지정. 비활성화 시 false 값 입력 (cypress/support/e2e.{js,jsx,ts,tsx})
        // setupNodeEvents(on, config) {}, // 노드 이벤트를 등록하고 구성을 수정할 수 있는 기능
    },
});