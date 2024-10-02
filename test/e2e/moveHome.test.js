/** NOTE: 메인 페이지 이동 테스트
 * 
 * [시나리오]
 * About 페이지로 접근한다
 * Header Home 네비게이션 버튼을 클릭한다
 * 메인 페이지에서 내용을 확인한다
 * 영화 상세 페이지로 이동한다
 * Header 로고를 클릭한다
 * 다시 메인 페이지에서 내용을 확인한다
*/

describe('메인 페이지 이동', { testIsolation: false }, () => {
    const { baseUrl } = Cypress.config()

    it('About 페이지로 접근합니다', () => {
        // About 페이지로 접근한다
        cy.visit('/#/About')

        // 방문 후 활성화된 네비게이션이 About 페이지가 맞는지 확인
        cy.get('header .nav-link.active')
            .contains('About')
    })

    it('Home 네비게이션으로 메인 페이지로 접근합니다', () => {
        // Header Home 네비게이션 버튼을 클릭한다
        cy.get('header .nav-link')
            .contains('Home')
            .click()

        // 방문 url을 확인한다
        cy.url()
            .should('eq', baseUrl + '/#/')

        // 방문 후 활성화된 네비게이션이 메인 페이지가 맞는지 확인
        cy.get('header .nav-link.active')
            .contains('Home')

        // 메인 페이지에서 내용을 확인한다
        cy.wait(1000)
        cy.get('h1')
            .contains('OMDbAPI.COM')
    })

    it('영화 상세 페이지로 접근합니다', () => {
        // 영화 상세 페이지로 접근한다
        cy.get('header .nav-link')
            .contains('Movie')
            .click()

        // 방문 url을 확인한다
        cy.url()
            .should('include', '/movie')
    })

    it('로고로 메인 페이지로 접근합니다', () => {
        // Header Home 네비게이션 버튼을 클릭한다
        cy.get('header .logo')
            .click()

        // 방문 url을 확인한다
        cy.url()
            .should('eq', baseUrl + '/#/')

        // 방문 후 활성화된 네비게이션이 메인 페이지가 맞는지 확인
        cy.get('header .nav-link.active')
            .contains('Home')

        // 메인 페이지에서 내용을 확인한다
        cy.wait(1000)
        cy.get('h1')
            .contains('OMDbAPI.COM')
    })
})