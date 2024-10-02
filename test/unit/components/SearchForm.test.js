import { shallowMount } from "@vue/test-utils"
import SearchForm from '~/components/SearchForm'

describe('components/SearchForm.vue', () => {
    let wrapper
    beforeEach(() => {
        wrapper = shallowMount(SearchForm)
    })

    test('선택 가능한 연도의 개수가 일치합니다', () => {
        // expect(wrapper.vm.filters.find(filter => {
        //     return filter.name === 'year'
        // }).items.length).toBe(new Date().getFullYear() - 1900 + 1)
        const year = wrapper.vm.filters.find(f => f.name === 'year')
        const yearLength = new Date().getFullYear() - 1900 + 1
        expect(year.items.length).toBe(yearLength)
    })
})