<template>
    <h1> Pet Full Details</h1>
</template>

<script setup>
    import { useRoute } from 'vue-router';

    const route = useRoute();
    console.log(route.params);
</script>

<style scoped>
</style>