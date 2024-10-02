<template>
    <!-- NOTE: RouterLink
        [참고] https://router.vuejs.kr/guide/essentials/active-links.html
        to: 라우터 설정(/src/routes/index.js)에 선언된 페이지 중 path 와 일치하는 페이지로 이동시킨다
        active-class: 클릭시 활성화되는 클래스를 지정한다.
            기본값: router-link-active

        $route : 페이지 정보 속성을 가지는 객체(fullPath, params, ...)
        $router: 페이지 조작을 위한 메소드를 가지는 객체(push, back, ...)
    -->
    <header class="nav-wrap w-100 container-fluid position-fixed start-0">
        <nav class="container d-flex justify-content-between align-items-center">
            <Logo
                color-class="text-light"
                size-class="d-none d-md-block fs-2 fw-bold" />
            <ul class="nav nav-pills">
                <li
                    class="nav-item"
                    v-for="navigation in navigations"
                    :key="navigation.name">
                    <RouterLink
                        :class="['nav-link', { active: isMatch(navigation.path) }]"
                        active-class="active"
                        :to="navigation.href">
                        <span class="d-sm-block d-md-none">
                            <font-awesome-icon :icon="['fa-solid', navigation.icon]" />
                        </span>
                        <span class="d-none d-md-block">{{ navigation.name }}</span>
                    </RouterLink>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
import Logo from '~/components/common/Logo'

export default {
    components: {
        Logo
    },
    data() {
        return {
            navigations: [
                {
                    name: "Home",
                    href: "/",
                    icon: "house" // MO
                },
                {
                    name: "Search",
                    href: "/search",
                    icon: "fa-magnifying-glass"
                },
                {
                    name: "Movie",
                    href: "/movie/tt4520988", // 기본 경로
                    icon: "film",
                    path: /^\/movie/, // /movie 로 시작하는 경로를 모두 일치시킴
                },
                {
                    name: "About",
                    href: "/about",
                    icon: "user"
                },
            ]
        }
    },
    methods: {
        isMatch(path) {
            if(!path) return false
            return path.test(this.$route.fullPath) // 정규표현식의 test 함수를 사용하여 포함여부 반환
        }
    }
}
</script>

<style lang="scss">
.nav-wrap {
    z-index: 99;
    nav {
        height: 75px;
    }
}
/* [PC] =================== */
@include media-breakpoint-up(md){
    .nav-wrap {
        top: 0;
        background-color: $dark;
        + section {
            margin-top: 75px;
        }
    }
}
/* [MO] =================== */
@include media-breakpoint-down(md){
    .nav-wrap {
        bottom: 0;
        background-color: $light;
        box-shadow: $box-shadow-lg;
        nav{
            height: 50px;
            font-size: 1.2em;
            .nav{
                display: flex;
                justify-content: space-around;
                align-items: center;
                width: 100%;
                .nav-link{
                    transform-origin: center bottom;
                    transition: 0.5s;
                    &.active{
                        font-size: 1.5em;
                        transform: translate(0, -10%);
                    }
                }
            }
        }
    }
}
</style>