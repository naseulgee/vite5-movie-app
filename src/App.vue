<template>
    <!-- NOTE:
        routes/index.js 에서 meta 에 설정한 레이아웃 컴포넌트가 그려진다.
        지정한 값이 없을 경우 BasicLayout 레이아웃 컴포넌트가 그려진다.
        레이아웃 컴포넌트의 slot 부분으로 routes/index.js 에서 설정한 주소에 일치하는 컴포넌트가 그려진다.
    -->
    <component :is="$route.meta.layout || 'BasicLayout'">
        <RouterView />
    </component>
</template>

<script>
import BasicLayout from "~/layouts/BasicLayout";

export default {
    components: {
        BasicLayout,
    }
}
</script>