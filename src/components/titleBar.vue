<template>
    <div id="header">{{ title }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "titleBar",
    props: ["title"]
});
</script>

<style lang="scss" scoped>
#header {
    background-color: $primary;
    padding: 20px 0;

    width: 100vw;
    text-align: center;
    font-size: 30px;
    font-weight: 700;
    font-family: "Raleway", sans-serif;
    color: $titleColor;
}

@media only screen and (min-width: 700px) {
    #header {
        padding: 20px;
        height: 90px;

        font-size: 40px;
        text-align: start;
    }
}
</style>
