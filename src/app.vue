<template>
    <h1 class="epic">{{ greeting }}</h1>
</template>

<script>
export default {
    name: "App",
    data() {
        return {
            greeting: "Hello Vue!"
        };
    }
};
</script>

<style scoped>
    .epic {
        color: greenyellow;
    }
</style>