/** NOTE: E2E 테스트 파일
 * - 유저의 사용 시나리오별 테스트 파일을 작성한다.
 * - 터미널에서 package.json 에 명시한 테스트 실행 명령어 입력 시 테스트가 실행된다
 * 
 * 테스트 전역 함수
 * [참고] https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Writing-tests
 * - describe('테스트 그룹명', 옵션, 함수) : 테스트 함수들 그룹핑
 * - it('테스트 명', 옵션, 함수)           : 테스트 함수. 타임아웃의 기본 값은 5초 이다
 *      - it.only(...) : 해당 함수만 테스트
 *      - it.skip(...) : 해당 함수를 제외하고 테스트
 * - after(함수)      : 그룹 내 모든 테스트 함수들 시작 전 실행되는 함수
 * - afterEach(함수)  : 그룹 내 각각의 테스트 함수 시작 전 실행되는 함수
 * - before(함수)     : 그룹 내 모든 테스트 함수들 종료 후 실행되는 함수
 * - beforeEach(함수) : 그룹 내 각각의 테스트 함수 종료 후 실행되는 함수
 * 
 * 선택
 * [참고] https://docs.cypress.io/api/table-of-contents#Queries
 * - visit(값)   : 작성한 주소로 접근한다
 * - get(값)     : 선택자와 일치하는 요소를 가져온다
 * - contains(값): 텍스트 내용으로 요소를 가져온다
 * 
 * 행위
 * [참고] https://docs.cypress.io/api/table-of-contents#Actions
 * - type(값)        : input 요소에 값을 입력한다
 * - select(값)      : value 가 일치하는 option 요소를 선택한다
 * - check()         : 체크박스나 라디오 요소를 선택한다
 * - uncheck()       : 체크박스의 선택을 해제한다
 * - wait(ms)        : 입력된 밀리세컨드 만큼 기다린다
 * - click()         :클릭한다. 폼 제출 후 리로드
 * - trigger('click'): 클릭한다. 폼 제출 후 리로드 안함
 * 
 * 주장
 * [참고] https://docs.cypress.io/guides/references/assertions
 * - 대상.should('주장', 값)
 * - expect(대상).주장(값)
 *      주장 체이너
 *      - .not
 *      - .to.be.주장        : 원시형 데이터의 동일 여부 비교
 *      - .to.equal(값)      : 원시형 데이터의 동일 여부 비교
 *      - .eq(값)            : 원시형 데이터의 동일 여부 비교
 *      - .to.deep.equal(값) : 참조형 데이터의 동일 여부 비교
 *      - .include(값)       : 포함 여부 확인
*/

describe('테스트 그룹1', () => {
    before (() => { console.log('1 :::::: before')  })
    after  (() => { console.log('6 :::::: after')   })

    beforeEach(() => { console.log('2 :::::: beforeEach') })
    afterEach (() => { console.log('5 :::::: afterEach')  })
    
    it('테스트1', () => {
        console.log('3 :::::: 테스트1')
        cy.visit('/') // cypress.config.js 에 명시한 baseUrl 경로로 접근한다
    })

    it('테스트2', {
        viewportWidth : 1200,
        viewportHeight: 800,
    }, () => {
        cy.visit('/')
    })
})

describe('객체 존재여부 확인', () => {
    beforeEach(() => {  cy.visit('/') })

    it('해당 class 의 객체가 존재합니다', () => {
        cy.get('header .logo')
    })

    it('해당 id 의 객체가 존재하지 않습니다', () => {
        cy.get('header #logo')
    })
})
