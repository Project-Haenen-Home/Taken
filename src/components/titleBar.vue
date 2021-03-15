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
    background: rgba( 255, 255, 255, 0.25 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    -webkit-backdrop-filter: blur(4px);
    backdrop-filter: blur(4px);
    border: 1px solid rgba( 255, 255, 255, 0.18 );

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
