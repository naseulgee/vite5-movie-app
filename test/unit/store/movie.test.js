import movieStore from '~/store/movie'
import _cloneDeep from 'lodash/cloneDeep'
import axios from 'axios'

describe('store/movie.js', () => {
    let store
    beforeEach(() => {
        // 여러 테스트를 진행 시 원본이 오염되지 않도록 복제한다
        store = _cloneDeep(movieStore)

        // 스토어의 상태는 사실상 함수임으로 함수 실행 값을 할당해 두어야 한다
        store.state = store.state()

        // commit 과 dispatch 는 실제 선언되어있지 않고 mutations 와 actions 가 변환되기 때문에 재할당이 필요하다
        store.commit = (name, payload) => {
            store.mutations[name](store.state, payload)
        }
        store.dispatch = async (name, payload) => {
            const context = {
                state: store.state,
                commit: store.commit,
                dispatch: store.dispatch,
                // getters: store.getters,
            }
            // actions 는 비동기 함수이다!!
            await store.actions[name](context, payload)
        }
    })

    test('영화 데이터를 초기화 합니다', () => {
        // import 를 통해 movie sotre 를 가져왔기 때문에 this, 'movie/' 를 명시하지 않는다
        // this.$store.commit('movie/updateState', { ... })
        store.commit('updateState', { // 임의의 값 세팅
            movies: [{ imdbID: '1' }],
            message: 'Hello',
            loading: true
        })
        store.commit('resetMovies') // 초기화
        // 초기값이 맞는지 체크
        expect(store.state.movies).toEqual([])
        expect(store.state.message).toBe('Search for the movie title!')
        expect(store.state.loading).toBe(false)
    })

    test('영화 목록을 잘 가져온 경우 데이터를 확인합니다', async() => {
        // 네트워크 자원을 소모하지 않도록 모의함수 세팅
        // NOTE: 결국 데이터 구조를 알고있어야하면 테스트 말고 화면에서 체크해도 되지 않나?
        const res = {
            data: {
                totalResults: '1',
                Search: [
                    {
                        imdbID: '1',
                        Title: 'Hello',
                        Poster: 'hello.jpg',
                        Year: '2021'
                    }
                ],
            }
        }
        // NOTE: 아니 근데 이럴꺼면 import를 왜 해오지..? 그냥 변수로 생성해주면 안되나?
        // => store 에서 실행되는 axios 를 대체해야하기 때문
        axios.post = jest.fn().mockResolvedValue(res)
        // axios.post = jest.fn(() => {
        //     return new Promise(resolve => {
        //         resolve(res)
        //     })
        // })

        await store.dispatch('searchMovies')
        expect(store.state.movies).toEqual(res.data.Search)
    })

    test('영화 목록을 가져오지 못한 경우 에러 메시지를 확인합니다', async() => {
        const errMsg = 'Network Error.'
        axios.post = jest.fn().mockRejectedValue({ response: { data: errMsg } }) // 원래는 new Error(errMsg) 인데 내 양식에 맞추느라

        await store.dispatch('searchMovies')
        expect(store.state.movies).toEqual([])
        expect(store.state.message).toBe(errMsg)
    })

    test('영화 아이템이 중복된 경우 고유하게 처리합니다', async() => {
        const res = {
            data: {
                totalResults: '1',
                Search: [
                    {
                        imdbID: '1',
                        Title: 'Hello',
                        Poster: 'hello.jpg',
                        Year: '2021'
                    },
                    {
                        imdbID: '1',
                        Title: 'Hello',
                        Poster: 'hello.jpg',
                        Year: '2021'
                    },
                    {
                        imdbID: '1',
                        Title: 'Hello',
                        Poster: 'hello.jpg',
                        Year: '2021'
                    },
                ],
            }
        }
        axios.post = jest.fn().mockResolvedValue(res)

        await store.dispatch('searchMovies')
        expect(store.state.movies.length).toBe(1)
    })

    test('단일 영화의 상세 정보를 잘 가져온 경우 데이터를 확인합니다', async() => {
        const res = {
            data: {
                imdbID: '1',
                Title: 'Hello',
                Poster: 'hello.jpg',
                Year: '2021'
            },
        }
        axios.post = jest.fn().mockResolvedValue(res)

        await store.dispatch('searchMovieWithId')
        expect(store.state.theMovie).toEqual(res.data)
    })
})