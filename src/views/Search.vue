<template>
    <SearchForm />
    <MovieList />
</template>

<script>
import SearchForm from '~/components/SearchForm'
import MovieList from '~/components/MovieList'

export default {
    components: {
        SearchForm,
        MovieList
    },
}
</script>