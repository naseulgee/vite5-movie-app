/** NOTE: store 를 이용하여 상태를 관리하는 모듈 파일
 * [참고] https://vuex.vuejs.org/
 * [참고] https://lodash.com/docs/4.17.15
 * 내보내지는 모듈 -> index.js 플러그인 에서 사용된다.
 */
import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'

// 내부 변수 선언
const _defaultMessage = 'Search for the movie title!'

export default {
    // 해당 js 파일이 모듈화 되어 사용됨을 선언
    namespaced: true,
    // 모듈에서 취급할 data
    // ★호출(사용): this.$store.state.모듈명.함수명
    state     : () => {
        return {
            movies    : [],
            message   : _defaultMessage,
            loading   : false,
            theMovie  : {},
            bestMovies: [],
        }
    },
    // 계산된 데이터. computed와 유사
    // ★호출(사용): this.$store.getters['모듈명/함수명', 전달 인수]
    getters   : {
    },
    /** NOTE: state의 데이터를 수정 할 수 있다. (setter)
     * ★호출(사용): commit 으로 호출된다.
     *  - this.$store.commit('모듈명/함수명', 전달 인수)
    */
    mutations : {
        resetMovies(state) {
            state.movies = []
            state.message = _defaultMessage
            state.loading = false
        },
        updateState(state, payload) {
            for (const key in payload) {
                state[key] = payload[key]
            }
        },
    },
    /** NOTE: method와 유사.
     * ★호출(사용): dispatch 로 호출된다.
     *  - this.$store.dispatch('모듈명/함수명', 전달 인수)
     * ★비동기로 동작한다
     * context: 첫 번째 매개변수로, 모듈 내 선언된 데이터를 활용하기 위해 받는다.
     * payload: 두 번째 매개변수로, actions를 호출 할 때 전달하는 인수를 받는다.
     */
    actions   : {
        // 영화 목록 검색
        async searchMovies(context, payload) {
            try {
                // 로딩 상태일 경우 반복 요청 방지
                if(context.state.loading) return

                context.commit('updateState', {
                    message: 'Loading...',
                    loading: true,
                })

                const res = await _fetchMovie({
                    ...payload,
                    page: 1
                })
                const { Search }       = res.data
                let   { totalResults } = res.data
                if(typeof totalResults != 'number') totalResults = parseInt(totalResults, 10)

                context.commit('updateState', {
                    // 갱신할 데이터 : 전달할 데이터
                    movies: _uniqBy(Search, 'imdbID'), // 중복된 값 처리. 원래는 서버에서 처리해서 넘겨주는 것이 좋다.
                })

                // 페이징 처리
                const pageLength = Math.ceil(totalResults / 10) // api 요청이 한번에 10개 까지만 됨으로
                // 페이지가 더 있다면 추가 요청
                if(pageLength > 1) {
                    for (let page = 2; page <= pageLength; page++) {
                        // 최대 출력 갯수 이상이면 종료
                        if (page > payload.maxCnt / 10) break

                        const res = await _fetchMovie({
                            ...payload,
                            page
                        })
                        const { Search } = res.data

                        context.commit('updateState', {
                            movies: _uniqBy([ ...context.state.movies, ...Search ], 'imdbID')
                        })
                    }
                }

                context.commit('updateState', {
                    message: '',
                    loading: false,
                })
            } catch (error) {
                console.log(error)
                context.commit('updateState', {
                    message: error.response.data,
                    movies: [],
                    loading: false,
                })
            }
        },
        // 영화 상세 정보
        async searchMovieWithId({ state, commit }, payload){
            try {
                if(state.loading) return

                commit('updateState', {
                    theMovie: {}, // 기존 영화 정보 비워주기
                    loading: true,
                })

                const res = await _fetchMovie(payload)
                commit('updateState', {
                    theMovie: res.data
                })
            } catch (error) {
                console.log(error)
                commit('updateState', {
                    theMovie: {},
                })
            } finally {
                commit('updateState', {
                    loading: false,
                })
            }
        },
        // Best 영화 목록
        async setBestMovies({ state, commit }, payload){
            try {
                if(state.loading) return
                if(state.bestMovies.length > 0) return
                if(payload.ids == null || payload.ids.length == 0) return
                
                commit('updateState', {
                    loading: true,
                })

                for (let i = 0; i < payload.ids.length; i++) {
                    const res = await _fetchMovie({
                        id: payload.ids[i]
                    })
                    commit('updateState', {
                        bestMovies: [
                            ...state.bestMovies,
                            res.data,
                        ]
                    })
                    
                }
            } catch (error) {
                console.log(error)
                commit('updateState', {
                    bestMovies: [],
                })
            } finally {
                commit('updateState', {
                    loading: false,
                })
            }
        },
    },
}

// 내부에서만 사용한다는 의미로 함수명 앞에 언더바(_) 추가
async function _fetchMovie(payload) {
    // API KEY 를 포함하여 요청하는 로직은 서버리스 함수로 이동
    return await axios.post('/.netlify/functions/movie', payload)
}
// function _fetchMovie(payload) {
//     // [참고] https://www.omdbapi.com/
//     const { title, type, year, page, id } = payload
//     const OMDB_API_KEY = '8a44dd72'
//     const url = id
//         ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}`
//         : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`

//     return new Promise((resolve, reject) => {
//         axios.get(url)
//             .then(res => {
//                 // 상태코드 200 이나, 에러인 경우 처리
//                 if(res.data.Error) reject(res.data.Error)
//                 resolve(res)
//             })
//             .catch(err => reject(err.message))
//     })
// }