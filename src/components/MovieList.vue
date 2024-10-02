<template>
    <section class="container">
        <ul
            class="d-flex flex-wrap justify-content-center align-items-center w-100 my-1 p-1 rounded"
            :class="{empty: movies.length == 0}">
            <Loader
                v-if="loading"
                position="absolute"
                :size="5" />
            <li
                v-if="message != ''"
                class="message w-100 fs-2 text-center">
                {{ message }}
            </li>
            <MovieItem
                v-else
                v-for="movie in movies"
                :key="movie.imdbID"
                :movie="movie" />
        </ul>
    </section>
</template>

<script>
import { mapState } from 'vuex'
import Loader from '~/components/common/Loader'
import MovieItem from '~/components/MovieItem'

export default {
    components: {
        MovieItem,
        Loader,
    },
    computed: {
        ...mapState('movie', [
            'movies',
            'message',
            'loading',
        ])
    },
}
</script>

<style lang="scss" scoped>
.container{
    ul{
        gap: 10px;
        min-height: calc($vh-HF - 75.5px);
        background-color: $gray-200;
        align-content: flex-start;
        &.empty{
            align-content: center;
        }
        li.message{
            color: $gray-500;
        }
    }
}
</style>