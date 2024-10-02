import { shallowMount } from '@vue/test-utils'
import store from '~/store'
import router from '~/routes'
import loadImage from '~/plugins/loadImage'
import Movie from '~/views/Movie'

describe('views/Movie.vue', () => {
    // 동일한 테스트 고유 환경 세팅
    let wrapper
    beforeEach(async () => {
        window.scrollTo = jest.fn() // 관련 없는 실행 함수에 모의 함수 세팅

        // 접속 주소 세팅
        router.push('/movie/tt1234567')
        await router.isReady() // 라우터 대기
        wrapper = shallowMount(Movie, {
            global: {
                plugins: [ store, router, loadImage ],
                stubs: ['FontAwesomeIcon'],
            }
        })
    })

    test('최초로 접속한 URL의 파라미터를 확인합니다', () => {
        expect(wrapper.vm.$route.params.id).toBe('tt1234567')
    })

    test('지정한 이미지 크기로 URL을 변경합니다', () => {
        const url = 'http://google.com/sample_img_SX300.jpg'
        expect(wrapper.vm.reqDiffSizeImage(url)).toContain('SX700')
        expect(wrapper.vm.reqDiffSizeImage(url, 500)).toContain('SX500')
    })

    // test('정상적인 이미지 주소가 아닌 경우 빈 문자를 반환합니다', () => {
    //     expect(wrapper.vm.reqDiffSizeImage()).toBe('')
    //     expect(wrapper.vm.reqDiffSizeImage('N/A')).toBe('')
    // })
})