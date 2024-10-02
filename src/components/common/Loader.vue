<template>
    <div
        :class="positionClass"
        class="spinner-border text-primary"
        :style="{
            width: `${size}rem`,
            height: `${size}rem`,
            zIndex
        }"></div>
</template>

<script>
export default {
    props: {
        size: {
            type: Number,
            default: 2,
        },
        position: {
            type: String,
            default: ''
        },
        zIndex: {
            type: Number,
            default: 0,
        },
    },
    computed: {
        positionClass() {
            const centerClass = ' top-0 start-0 bottom-0 end-0 m-auto' // translate-middle 클래스 적용 시 스피너의 rotate 속성이 사라져서 사용 불가
            return this.position != '' ? 'position-' + this.position + centerClass : ''
        },
    },
}
</script>