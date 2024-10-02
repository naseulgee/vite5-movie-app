<template>
    <span>{{ msg }}</span>
</template>

<script>
export default {
    props: {
        msg: {
            type: String,
            default: ''
        }
    },
}
</script>