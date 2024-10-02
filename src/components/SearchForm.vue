<template>
    <section class="container pt-1">
        <form
            class="d-flex flex-wrap justify-content-between align-items-center">
            <input
                class="form-control"
                type="text"
                v-model="title" 
                placeholder="Movie title"
                @keyup.enter="search" />
            <select
                v-for="filter in filters"
                :key="filter.name"
                v-model="$data[filter.name]"
                class="form-select"
                :aria-label="filter.name">
                <option
                    v-if="filter.name === 'year'"
                    value="">
                    All
                </option>
                <option
                    v-for="item in filter.items"
                    :key="item">
                    {{ item }}
                </option>
            </select>
            <button
                class="btn btn-primary"
                type="submit"
                @click="search">
                Search
            </button>
        </form>
    </section>
</template>

<script>
export default {
    data() {
        return {
            title: "",
            type: "movie",
            maxCnt: 10,
            year: "",
            filters: [
                {
                    name: "type",
                    items: ["movie", "series", "episode"],
                },
                {
                    name: "maxCnt",
                    items: [10, 20, 30],
                },
                {
                    name: "year",
                    items: (() => {
                        const years = [];
                        const currentYear = new Date().getFullYear(); // 올해 연도
                        for (let i = currentYear; i >= 1900; i--) {
                            years.push(i);
                        }
                        return years;
                    })(),
                },
            ]
        }
    },
    methods: {
        async search() {
            this.$store.dispatch('movie/searchMovies', {
                title:  this.title,
                type:   this.type,
                year:   this.year,
                maxCnt: this.maxCnt,
            })
        }
    },
}
</script>

<style lang="scss" scoped>
.container{
    form{
        gap: 10px;
        .form-control{
            flex: 5;
            min-width: 150px;
        }
        .form-select,
        .btn{
            flex: 1;
            min-width: 150px;
        }
    }
}
/* [MO] =================== */
@include media-breakpoint-down(md){
    .container{
        form{
            .form-control{
                flex-basis: 100%;
            }
            .form-select,
            .btn{
                flex-basis: 50%
            }
        }
    }
}
</style>