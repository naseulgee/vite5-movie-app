<template>
    <section class="container pt-1">
        <template v-if="loading">
            <Loader
                position="fixed"
                :z-index="1"
                :size="5" />
            <div class="skeletons info-wrap d-flex flex-wrap justify-content-between">
                <div class="skeleton poster"></div>
                <ul class="specs p-0">
                    <li class="skeleton title"></li>
                    <li class="skeleton labels"></li>
                    <li class="skeleton plot"></li>
                    <li class="skeleton etc"></li>
                    <li class="skeleton etc"></li>
                    <li class="skeleton etc"></li>
                </ul>
            </div>
        </template>
        <div
            v-else
            class="info-wrap d-flex flex-wrap justify-content-between">
            <div
                class="poster mx-auto rounded-3 position-relative"
                :class="{'noImage': noImage}"
                :style="{backgroundImage: `url(${reqDiffSizeImage(theMovie.Poster)})`}">
                <Loader
                    v-if="imageLoading"
                    position="absolute"
                    :size="3" />
            </div>
            <ul class="specs p-0">
                <li class="title my-1">
                    <h1 class="m-0 fw-bold">
                        {{ theMovie.Title }}
                    </h1>
                </li>
                <li class="labels hand-writing text-black-50">
                    <span>{{ theMovie.Released }}, </span>
                    <span>{{ theMovie.Runtime }}, </span>
                    <span>{{ theMovie.Country }}</span>
                </li>
                <li class="plot mb-3 fs-5">
                    {{ theMovie.Plot }}
                </li>
                <li class="etc">
                    <h3 class="mt-2 mb-0">
                        Ratings
                    </h3>
                    <ul class="rating-wrap d-flex flex-wrap align-items-center p-0 text-black-50">
                        <li
                            v-for="{ Source: name, Value: score } in theMovie.Ratings"
                            :key="name"
                            class="rating m-0 align-middle">
                            <img
                                :src="require(`~/assets/images/movie/${name}.png`)"
                                :alt="name"
                                class="me-1" />
                            <span>{{ score }}</span>
                        </li>
                    </ul>
                </li>
                <li class="etc">
                    <h3 class="mt-2 mb-0">
                        Actors
                    </h3>
                    <p class="text-black-50">
                        {{ theMovie.Actors }}
                    </p>
                </li>
                <li class="etc">
                    <h3 class="mt-2 mb-0">
                        Director
                    </h3>
                    <p class="text-black-50">
                        {{ theMovie.Director }}
                    </p>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Loader from '~/components/common/Loader'

export default {
    components: {
        Loader
    },
    data() {
        return {
            imageLoading: true,
            noImage: false,
        }
    },
    computed: {
        /** NOTE: Vuex Helpers
         * [참고 state    ] https://vuex.vuejs.org/guide/state.html#the-mapstate-helper
         * [참고 getters  ] https://vuex.vuejs.org/guide/getters.html#the-mapgetters-helper
         * [참고 mutations] https://vuex.vuejs.org/guide/mutations.html#committing-mutations-in-components
         * [참고 actions  ] https://vuex.vuejs.org/guide/actions.html#dispatching-actions-in-components
         * 
         * store 에 등록된 데이터 및 함수들을 반복 사용 시 편하게 등록을 도와주는 함수
         * 
         * Helpers 종류
         *  - mapState    , mapGetters: computed 영역에서 사용된다.
         *     ★- mapState 가 가장 자주 사용되는 편이다.
         *  - mapMutations, mapActions: methods 영역에서 사용된다.
         *      - 어디에서 참조되는 함수인지 헷갈리기 때문에 Helper들 보다 직접 호출이 선호된다.
         * 
         * Helpers 사용
         *  - ...Helpers('store 별칭', [ 호출할 변수 또는 함수명1, ... ])
         */
        ...mapState('movie', [
            'loading',
            'theMovie',
        ]),
        // loading() {
        //     return this.$store.state.movie.loading
        // },
        // theMovie(){
        //     return this.$store.state.movie.theMovie
        // }
    },
    methods: {
        ...mapActions('movie', [
            'searchMovieWithId',
        ]),
        reqDiffSizeImage(url, size = 700){
            if(!url || url == 'N/A') { // url 이 없으면 404 이미지
                this.imageLoading = false
                this.noImage = true
                return ''
            }
            // 사이즈 변환
            let src = url.replace('SX300', 'SX' + size)

            /** NOTE: 이미지 로딩 여부와 관련 없이 src 값이 반환되어야 함으로,
             * await 가 아닌 then 을 사용하여 별개의 로직으로 실행시켜야 한다.
            */
            this.$loadImage(src)
                .then(() => { // 메모리상 이미지가 로딩이 완료될 때 까지 대기 후
                })
                .catch(error => { // 이미지가 없는 경우 예외처리
                    console.error(error)
                    this.noImage = true
                })
                .finally(() => {
                    this.imageLoading = false // 로딩 종료
                })
            return src // 대기와 상관 없이 사이즈 변환 주소 리턴
        }
    },
    created(){
        // methods에 mapActions로 등록한 함수 호출
        this.searchMovieWithId({
            id : this.$route.params.id // routes/index.js 에서 설정한 콜론(:) 뒤 동적 파라미터 변수명
        })
        // store action 직접 호출
        // this.$store.dispatch('movie/searchMovieWithId', {
        //     id : this.$route.params.id
        // })
    },
}
</script>

<style lang="scss" scoped>
.container{
    .info-wrap{
        gap: 50px;
        .poster{
            $posterW: 550px;
            flex-shrink: 0;
            width: $posterW;
            height: calc($posterW * 3 / 2);
            background: var(--bs-gray-200) no-repeat center/cover;
            &.noImage{
                background-image: url('@/assets/images/common/404-img.jpg') !important;
            }
        }
        .specs{
            flex-grow: 1;
            width: min-content;
            li{
                margin-bottom: 20px;
                .rating-wrap{
                    gap: 20px;
                    .rating{
                        img{
                            height: 30px;
                        }
                    }
                }
            }
        }
    }
    .skeletons{
        .skeleton{
            display: block;
            border-radius: 10px;
            background-color: $gray-200;
            &.title{
                width: 80%;
                height: 70px;
            }
            &.labels{
                width: 60%;
                height: 30px;
            }
            &.plot{
                width: 100%;
                height: 250px;
            }
            &.etc{
                width: 50%;
                height: 50px;
            }
        }
    }
}
/* [MO] =================== */
@include media-breakpoint-down(md){
    .container{
        .info-wrap{
            gap: 30px;
            .poster{
                width: 100%;
                height: $vh-HF;
            }
            .specs{
                width: 100%;
                li{
                    margin-bottom: 10px;
                }
            }
        }
    }
}
</style>