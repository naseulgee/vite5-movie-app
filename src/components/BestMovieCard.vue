<template>
    <li class="best-movie h-100 position-relative">
        <span
            class="rank d-block position-absolute start-0 text-outline lh-1"
            :class="{odd: (rank % 2) != 0}">
            {{ rank }}
        </span>
        <RouterLink
            :to="`/movie/${bestMovie.imdbID}`"
            class="hover-box w-100 h-100">
            <Loader
                v-if="imageLoading"
                position="absolute"
                :size="3" />
            <img
                v-if="noImage"
                src="~/assets/images/common/404-img.jpg"
                alt="No Poster"
                class="w-100 h-100" />
            <img
                v-else
                :src="reqDiffSizeImage(bestMovie.Poster)"
                :alt="bestMovie.Title + ' Poster'"
                class="w-100 h-100" />
            <div class="hover-box-info">
                <h3 class="position-relative fs-1">
                    {{ bestMovie.Title }}
                    <font-awesome-icon icon="fa-solid fa-circle-plus" />
                </h3>
                <p class="w-auto text-primary fst-italic text-decoration-underline">
                    {{ bestMovie.Awards }}
                </p>
                <p class="ellipsis-2">
                    {{ bestMovie.Plot }}
                </p>
            </div>
        </RouterLink>
    </li>
</template>

<script>
import Loader from '~/components/common/Loader'

export default {
    props: {
        bestMovie: {
            type: Object,
            defualt: () => {}
        },
        rank: {
            type: Number,
            require: true
        }
    },
    components: {
        Loader,
    },
    data() {
        return {
            imageLoading: true,
            noImage: false,
        }
    },
    methods: {
        reqDiffSizeImage(url, size = 700){
            if(!url || url == 'N/A') { // url 이 없으면 404 이미지
                this.imageLoading = false
                this.noImage = true
                return ''
            }
            // 사이즈 변환
            const src = url.replace('SX300', 'SX' + size)

            try {
                // 메모리상 이미지가 로딩이 완료될 때 까지 대기
                this.$loadImage(src)
            } catch (error) { // 이미지가 없는 경우 예외처리
                console.error(error)
                this.noImage = true
            } finally {
                this.imageLoading = false // 로딩 종료
            }
            return src
        },
    },
}
</script>

<style lang="scss" scoped>
.best-movie{
    .rank{
        font-size: 30rem;
        transform: translateX(-65%);
        font-family: 'Pretendard Variable';
        &.odd{
            z-index: 2;
        }
    }
    &:nth-child(odd) .rank{
        top: -0.1em;
    }
    &:nth-child(even) .rank{
        bottom: -0.1em;
    }
    .hover-box{
        .hover-box-info{
            .fa-circle-plus{
                top: -0.5rem;
                font-size: $font-size-lg;
            }
        }
    }
}
</style>