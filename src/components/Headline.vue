<template>
    <!-- NOTE:
    [참고] https://www.capitoltheatre.com.au/
    [참고] https://colorlib.com/wp/wp-content/uploads/sites/2/theater-websites.jpg
    -->
    <section class="intro container-fluid d-flex flex-column justify-content-center align-items-center overflow-hidden text-center text-white position-relative z-1">
        <div class="container">
            <h1 class="fw-bold">
                <Logo />
                <br />
                <span class="text-outline">The Open Movie Database</span>
            </h1>
            <hr class="mx-auto" />
            <p class="hand-writing">
                The OMDb API is a RESTful web service to obtain movie information, all content and images on the site are contributed and maintained by our users.
            </p>
            <font-awesome-icon
                icon="fa-solid fa-chevron-down"
                v-for="i in 3"
                :key="i" />
        </div>
        <div
            v-for="i in 2"
            :key="i"
            :class="['curtains-wrap', (i == 1 ? 'left' : 'right')]">
            <div
                class="curtain"
                v-for="j in 5"
                :key="j"></div>
        </div>
    </section>
</template>

<script>
import Logo from '~/components/common/Logo'

export default {
    components: {
        Logo,
    },
}
</script>

<style lang="scss" scoped>
@keyframes _ani_arrow_down { 100% { bottom: min(1.5vh, 50px); transform: translate(-50%, 0%); } }

.intro {
    height: $vh-H;
    background: url('@/assets/images/main/main-bg.jpg') no-repeat center/cover;
    &::before {
        display: block;
        content: "";
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
    }
    h1 {
        font-size: calc(3rem + 1.5vw);
    }
    hr {
        width: 10vw;
        opacity: 1;
    }
    .fa-chevron-down{
        width: 2rem;
        height: 2rem;
        position: absolute;
        left: 50%;
        bottom: 5vh;
        transform: translate(-50%, -50%);
        animation: _ani_arrow_down 1.5s ease-out infinite;
        &:nth-of-type(2) {
            opacity: 0.5;
            transform: translate(-50%, -85%);
        }
        &:nth-of-type(3) {
            opacity: 0.2;
            transform: translate(-50%, -120%);
        }
    }
}

// 커튼 CSS
$curtainColor: #a02020;
$deg: 2deg;

@keyframes _ani_curtain        { 50%  { transform: rotate(-$deg); } }
@keyframes _ani_curtain_open   { 100% { transform: scaleX(0.6); } }
@keyframes _ani_curtain_open_r { 100% { transform: scaleX(0.6); right: -70%; } }

.curtains-wrap {
    width: 51%;
    height: 110%;
    overflow: hidden;
    position: absolute;
    top:-10%;
    left: 0;
    transform-style: preserve-3d;
    transition: 6s ease;
    transform-origin: -120% top;
    background: darken($curtainColor, 12%);
    text-align: left;
    animation: _ani_curtain_open 4s ease forwards;
    &.right{
        left: auto;
        right: 0;
        text-align: right;
        animation: _ani_curtain_open_r 4s ease forwards;
    }
    .curtain {
        display:inline-block;
        width: 10vw;
        height: 110%;
        background: repeating-linear-gradient(
                to left,
                $curtainColor 4vw, 
                darken($curtainColor, 20%) 8vw,
                lighten($curtainColor, 20%) 10vw) 100%;
        transform: rotate($deg);
        transform-origin: 0 0;
        animation: _ani_curtain 2s ease infinite;
    
        &:nth-child(1) { animation-delay: -0.1s; }
        &:nth-child(2) { animation-delay: -0.2s; }
        &:nth-child(3) { animation-delay: -0.3s; }
        &:nth-child(4) { animation-delay: -0.4s; }
        &:nth-child(5) { animation-delay: -0.5s; }
    }
}
</style>