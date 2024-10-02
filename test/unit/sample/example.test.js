/** NOTE: 단위 테스트 파일
 * - 테스트 할 함수, 컴포넌트는 export 로 선언되어 외부에서 접근할 수 있어야 한다
 * - 터미널에서 package.json 에 명시한 테스트 실행 명령어 입력 시 테스트가 실행된다
 * 
 * 테스트 전역 함수
 * [참고] https://jestjs.io/docs/api
 * - describe('테스트 그룹명', 함수) : 테스트 함수들 그룹핑
 * - test('테스트 명', 함수, 타임아웃): 테스트 함수. 타임아웃의 기본 값은 5초 이다
 * - afterAll(함수, 타임아웃)        : 그룹 내 모든 테스트 함수들 시작 전 실행되는 함수
 * - afterEach(함수, 타임아웃)       : 그룹 내 각각의 테스트 함수 시작 전 실행되는 함수
 * - beforeAll(함수, 타임아웃)       : 그룹 내 모든 테스트 함수들 종료 후 실행되는 함수
 * - beforeEach(함수, 타임아웃)      : 그룹 내 각각의 테스트 함수 종료 후 실행되는 함수
 * 
 * 테스트 예상 함수
 * [참고] https://jestjs.io/docs/expect
 * - expect(입력 값)
 * - 수정자
 *      - .not
 *      - .resolves: Promise 객체의 resolve 결과
 *      - .reject  : Promise 객체가 reject 결과
 * - 매처(결과)
 *      - .toBe(기대 값)    : 원시형 데이터의 동일 여부 비교
 *      - .toEqual(기대 값) : 참조형 데이터의 동일 여부 비교
 * 
 * 테스트 목업 함수
 * [참고] https://jestjs.io/docs/jest-object
 * [참고] https://jestjs.io/docs/mock-function-api
 * - jest.fn(목업함수)             : 신규 목업 함수를 생성하여 반환한다
 * - jest.spyOn(파일명, 함수명)    : 특정 파일의 함수를 복사해 Jest 목업 함수로 반환한다
 * - 목업함수.mockReturnValue(값)  : 목업함수 결과값을 대체한다
 * - 목업함수.mockResolvedValue(값): 비동기 목업함수 resolve 결과값을 대체한다
 * - 목업함수.mockRejectedValue(값): 비동기 목업함수 reject 결과값을 대체한다
*/
import axios from 'axios'
import * as example from './example'
import { userA, userB, double, asyncFn, apiFn } from './example'

describe('테스트 그룹1', () => {
    beforeAll (() => { console.log('1 :::::: beforeAll')  })
    afterAll  (() => { console.log('6 :::::: afterAll')   })

    beforeEach(() => { console.log('2 :::::: beforeEach') })
    afterEach (() => { console.log('5 :::::: afterEach')  })
    
    test('테스트1', () => {
        console.log('3 :::::: 테스트1')
        expect(123).toBe(123)
    })
    test('테스트2', () => {
        console.log('4 :::::: 테스트2')
        expect(double(10)).toBe(20)
    })
})

describe('매처 테스트', () => {
    test('원시형 데이터 비교', () => {
        expect(userA.name).toBe('Ann')
    })
    test('참조형 데이터 비교', () => {
        // expect(userA).toBe(userB) // -> Err
        expect(userA).toEqual({
            name: 'Ann',
            age: 35
        })
    })
    test('같지 않은 데이터 비교', () => {
        expect(userA).not.toEqual(userB)
    })
})

describe('비동기 테스트', () => {
    // ★NOTE: 프레임워크는 test 함수가 비동기 함수인지 알 수 없어 에러가 발생하는 코드여도 성공으로 간주하고 넘어간다
    // test('then-catch', () => {
    //     asyncFn().then(res => {
    //         expect(res).toBe('Done!?')
    //     })
    // })

    // test 함수 비동기 처리 방법
    test('async/await', async () => {
        const res = await asyncFn()
        // expect(res).toBe('Done!?') // -> Err
        expect(res).toBe('Done!')
    })
    test('return', () => {
        return asyncFn().then(res => {
            // expect(res).toBe('Done!?') // -> Err
            expect(res).toBe('Done!')
        })
    })
    test('done', (done) => { // 매개변수로 done 을 받아
        asyncFn().then(res => {
            // expect(res).toBe('Done!?') // -> Err
            expect(res).toBe('Done!')
            done() // 종료 시점에서 done 함수를 실행시켜 비동기 함수 종료를 알려줌
        })
    })
    // 수정자 resolves 를 이용한 비동기 처리
    test('resolves', () => expect(asyncFn()).resolves.toBe('Done!'))
})

describe('모의함수 테스트', () => {
    jest.spyOn(example, 'asyncFn')
        // .mockResolvedValue('Hi')           // NOTE: describe 그룹핑과 관련 없이 목업 함수가 영향을 미쳐
        .mockResolvedValue('Done!')
    const mockFn = jest.fn(() => {            // jest.fn 으로 신규 함수 생성 후
        return jest.spyOn(example, 'asyncFn') // 복제한 목업함수 할당
    }).mockResolvedValue('Hi')                // 복제 함수의 값을 변경한다

    test('mock', () => expect(mockFn()).resolves.toBe('Hi'))


    // apiFn 함수 실행 시 서버 에러를 생각하지 않고 이후 로직만 검증이 가능해진다
    axios.get = jest.fn(() => {
        return new Promise(resolve => {
            resolve({
                data: {
                    Title: 'Frozen II'
                }
            })
        })
    })

    test('API mock', async () => {
        const title = await apiFn()
        expect(title).toBe('Frozen ii')
    })
})