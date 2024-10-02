<template>
    <section class="container d-flex flex-wrap flex-column justify-content-center align-items-center text-center">
        <h1 class="errCode m-0 text-primary">
            4
            <font-awesome-icon icon="fa-regular fa-face-dizzy" />
            4
        </h1>
        <h2 class="errMsg m-0">
            Page Not Found
        </h2>
        <!-- RouterLink 가 아닌 method를 활용한 이동 -->
        <div class="btn-wrap d-flex flex-wrap justify-content-center align-items-center mt-4">
            <button
                class="btn btn-outline-primary text-uppercase"
                @click="toBack">
                Go back
                <font-awesome-icon icon="fa-solid fa-reply" />
            </button>
            <button
                class="btn btn-primary text-uppercase"
                @click="toHome">
                Go home
                <font-awesome-icon icon="fa-solid fa-hand-point-right" />
            </button>
        </div>
    </section>
</template>

<script>
export default {
    methods: {
        toBack() {
            this.$router.back()
        },
        toHome() {
            this.$router.push('/')
        },
    },
}
</script>

<style lang="scss" scoped>
.container{
    height: $vh-HF;
    .btn-wrap{
        gap: 1.25rem;
    }
}
/* [PC] =================== */
@include media-breakpoint-up(md){
    .container{
        h1{
            font-size: 7rem;
        }
        h2{
            font-size: 3rem;
        }
    }
}
</style>