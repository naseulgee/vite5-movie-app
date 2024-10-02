/** NOTE: 컴포넌트 테스트 파일
 * [참고] https://test-utils.vuejs.org/api/
 * 
 * 컴포넌트 테스트 함수
 *  - mount(컴포넌트, { 옵션 })       : 컴포넌트를 연결하여 wrapper 객체 반환한다
 *  - shallowMount(컴포넌트, { 옵션 }): 자식을 제외한 대상 컴포넌트만 연결하여 wrapper 객체 반환한다
 *      mount 옵션
 *          - shallow: boolean              : 얕은 복사 여부
 *          - attrs: { 속성 }               : 속성을 설정한다
 *          - data() { return { 데이터 } }  : 데이터를 설정한다
 *          - props: { 데이터 }             : 상속 데이터를 설정한다
 *          - global: {
 *                  components: { 컴포넌트 }: 구성 컴포넌트를 등록한다
 *                  provide   : { 데이터 }  : 주입할 데이터를 설정한다
 *                  directives: { 조건 }    : 등록된 조건을 설정한다(v-if 대신 v-조건)
 *                  plugins   : [ 플러그인 ]: 플러그인을 설치한다
 *                  mixins    : [ 믹스인 ]  : 믹스인을 등록한다
 *                  mocks     : { 속성 }    : store, router 속성의 모의 등록한다
 *                  stubs     : [ 컴포넌트 ]: 컴포넌트를 모의 등록한다
 *              }
 *  - wrapper
 *      - wrapper 속성
 *          - wrapper.vm : 컴포넌트 내 this. Vue 인스턴스.
 *      - wrapper 메소드
 *          - wrapper.exists()                 : 요소가 존재하는지 여부 반환
 *          - wrapper.find(객체)               : 요소를 찾아서 반환. 찾을 수 없으면 ErrorWrapper를 반환
 *          - wrapper.html()                   : HTML을 반환
 *          - wrapper.attributes(속성명)       : 속성을 반환
 *          - await wrapper.setData({ 데이터 }): 반응성을 유지한 채 데이터 갱신. 비동기로 동작한다
 *          - wrapper.unmount()                : 컴포넌트 연결 해제
*/
import { mount, shallowMount } from '@vue/test-utils'
import exComponenParent from './exComponenParent'

describe('컴포넌트 테스트', () => {
    const wrapper = mount(exComponenParent)

    test('메세지 검증', () => {
        expect(wrapper.vm.msg).toBe('Hello Vue test utils')
    })

    test('메세지 변경', () => {
        wrapper.vm.msg = "change message" // 데이터는 변경되나, 컴포넌트에 출력되는 내용은 변하지 않음

        expect(wrapper.vm.msg).toBe('change message')
        // expect(wrapper.find('.parent span').text()).toBe('change message') // Err
    })

    test('데이터 갱신', async () => {
        await wrapper.setData({
            msg: "change message"
        })

        expect(wrapper.vm.msg).toBe('change message')
        expect(wrapper.find('.parent span').text()).toBe('change message')
    })
})

describe('얕은 복사 테스트', () => {
    const wrapperM  = mount(exComponenParent)
    const wrapperMS = mount(exComponenParent, { shallow: true })
    const wrapperS  = shallowMount(exComponenParent)

    test('mount', () => {
        expect(wrapperM.find(".child").text()).toBe('ChildHi')
    })

    test('shallow mount', () => {
        // expect(wrapperMS.find(".child").text()).toBe('ChildHi') // Err
        expect(wrapperMS.find(".child").text()).toBe('Child')
        expect(wrapperS.find(".child").text()).toBe('Child')
    })
})