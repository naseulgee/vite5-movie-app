<template>
    <section
        ref="bestMovieWrap"
        class="best-movie-wrap position-relative bg-dark text-white">
        <div
            class="best-movie-inner-wrap w-100 overflow-hidden position-sticky start-0">
            <h2 class="best-movies-header mb-3 pe-2 text-outline">
                Best 5 movies of {{ new Date().getFullYear() }}
            </h2>
            <ul
                ref="bestMovieList"
                class="best-movie-list d-flex pb-3 position-absolute">
                <BestMovieCard
                    v-for="(bestMovie, i) in bestMovies"
                    :key="i"
                    :best-movie="bestMovie"
                    :rank="i + 1" />
            </ul>
        </div>
    </section>
</template>

<script>
import BestMovieCard from '~/components/BestMovieCard'

export default {
    components: {
        BestMovieCard,
    },
    data() {
        return {
            scrollValue: 0,
        }
    },
    computed: {
        bestMovies() {
            return this.$store.state.movie.bestMovies
        }
    },
    methods: {
        scrollEvents(e) {
            // 스크롤 위치
            const beforeScrollTop        = this.scrollValue;                   // 현재 스크롤 위치
            const currentScrollTop       = document.documentElement.scrollTop; // 스크롤 후 위치
            // 이벤트 발생 대상
            const movieWrap              = this.$refs.bestMovieWrap
            const movieWrapPosition      = movieWrap.offsetTop
            const movieWrapHeight        = movieWrap.offsetHeight
            const movieList              = this.$refs.bestMovieList
            const movieListScrollPercent = Math.round((currentScrollTop - movieWrapPosition) / (movieWrapHeight - movieWrapPosition) * 100)

            // 1. 클래스 추가 이벤트
            if(currentScrollTop >= movieWrapPosition / 5) { // 대상이 약간 화면에 보였을 때
                movieWrap.classList.add("active")
            } else {
                movieWrap.classList.remove("active")
            }
            
            // 2. 가로 스크롤 이벤트
            if(movieListScrollPercent > 0 && movieListScrollPercent <= 100) { // 대상의 윗면이 화면에 닿았을 때
                movieList.style.transform = `translateX(-${movieListScrollPercent}%)`
            }

            return this.scrollValue = currentScrollTop; // 현재 위치값 세팅
        },
    },
    created(){
        this.$store.dispatch('movie/setBestMovies', {
            ids: [
                'tt15239678',
                'tt12037194',
                'tt22022452',
                'tt30321095',
                'tt16426418',
            ]
        });
    },
    mounted(){
        document.addEventListener('scroll', this.scrollEvents);
    },
    unmounted(){
        document.removeEventListener('scroll', this.scrollEvents);
    },
}
</script>

<style lang="scss" scoped>
.best-movie-wrap {
    height: calc($vh-H * 5);
    padding-top: $headerH;
    .best-movie-inner-wrap{
        height: $vh-H;
        top: $headerH;
        $bestHFontS: calc(6.325rem + 0.9vw);
        .best-movies-header{
            opacity: 0.5;
            height: calc($bestHFontS * 1.2);
            transform: translateX(-20%);
            font-size: $bestHFontS;
            font-style: italic;
            white-space : nowrap;
            transition: 1s ease-in-out;
        }
        .best-movie-list{
            $list-H: calc($vh-H - $bestHFontS - $spacer);
            gap: 400px;
            height: $list-H;
            top: calc($bestHFontS + $spacer);
            left: 100vw;
            li{
                flex-shrink: 0;
                width: calc($list-H / 3 * 2);
                height: $list-H;
                &:last-child{
                    margin-right: $spacer;
                }
            }
        }
    }
    &.active{
        .best-movie-inner-wrap{
            .best-movies-header{
                opacity: 1;
                transform: translateX(0);
            }
        }
    }
}
/* [MO] =================== */
@include media-breakpoint-down(md){
    .best-movie-wrap {
        .best-movie-inner-wrap{
            top: 0;
        }
    }
}
</style>