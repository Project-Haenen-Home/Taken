<template>
    <div id="header">
        <span id="title">{{ title }}</span>
    </div>
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
    padding: 20px;
    height: 90px;
}

#title {
    font-size: 40px;
    font-weight: 700;
    font-family: "Raleway", sans-serif;
    color: $titleColor;
}
</style>
