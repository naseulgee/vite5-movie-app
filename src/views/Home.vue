<template>
    <Headline />

    <BestMovieList />
</template>

<script>
import Headline from '~/components/Headline'
import BestMovieList from '~/components/BestMovieList'

export default {
    components: {
        Headline,
        BestMovieList,
    },
    created() {
        this.$store.commit('movie/resetMovies') // 검색 내용 초기화
    },
}
</script>