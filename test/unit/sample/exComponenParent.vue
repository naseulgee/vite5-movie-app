<template>
    <div class="parent">
        <h1>Parent</h1>
        <span>{{ msg }}</span>
    </div>
    <div class="child">
        <h1>Child</h1>
        <exComponenChild msg="Hi" />
    </div>
</template>

<script>
import exComponenChild from './exComponenChild';
export default {
    components: {
        exComponenChild,
    },
    data() {
        return {
            msg: 'Hello Vue test utils'
        }
    },
    computed: {
    },
    methods: {
    },
    watch: {
    },
}
</script>