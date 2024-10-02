<template>
    <footer>
        <div class="container py-1 opacity-50 text-center">
            <Logo size-class="fs-2 fw-bold" />
            <p>(c) {{ new Date().getFullYear() }} SeulGee All rights reserved.</p>
        </div>
    </footer>
</template>

<script>
import Logo from "~/components/common/Logo"

export default {
    components: {
        Logo
    },
}
</script>

<style lang="scss" scoped>
footer .container{
    height: 113px;
}
</style>