/** NOTE: 영화 검색 시나리오 테스트
 * 
 * [시나리오]
 * 검색 페이지로 접근한다
 * 영화 제목을 'frozen' 으로, 표시 개수를 30개로 입력한다
 * 'Search' 버튼을 클릭해 영화 목록을 검색한다
 * 영화 목록 30개가 잘 출력 된다
 * 영화 목록에서 'Frozen II' 영화 아이템을 클릭한다
 * 영화 상세 정보 페이지로 이동한다
 * 상세 정보 페이지에서 정보를 확인한다
*/

describe('영화 검색', { testIsolation: false }, () => {
    it('검색 페이지로 접근합니다', () => {
        // 페이지 방문
        cy.visit('/#/search')

        // 방문 후 활성화된 네비게이션이 검색 페이지가 맞는지 확인
        cy.get('header .nav-link.active')
            .contains('Search')
    })

    it('영화를 검색합니다', () => {
        // 영화 제목을 'frozen' 으로, 표시 개수를 30개로 입력한다
        cy.get('input.form-control')
            .type('frozen')
        cy.get('select.form-select[aria-label=\'maxCnt\']')
            .select('30')

        // 'Search' 버튼을 클릭해 영화 목록을 검색한다
        cy.get('button.btn')
            .contains('Search')
            .trigger('click')

        // 영화 목록 30개가 잘 출력 된다
        cy.wait(2000)
        cy.get('.hover-box')
            .should('have.length', 30)
    })

    it('겨울왕국2 영화 아이템을 선택합니다', () => {
        // 영화 목록에서 'Frozen II' 영화 아이템을 클릭한다
        cy.get('.hover-box .title')
            .contains('Frozen II')
            .click()
    })

    it('영화의 상세 정보를 확인합니다', () => {
        // 영화 상세 정보 페이지로 이동한다
        cy.url()
            .should('include', '/movie/tt4520988')
        cy.wait(1000)
        cy.get('header .nav-link.active')
            .contains('Movie')

        // 상세 정보 페이지에서 정보를 확인한다
        cy.get('.title')
            .contains('Frozen II')
    })
})