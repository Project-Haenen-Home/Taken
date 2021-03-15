<template>
    <div class="room">
        <div class="title">{{ room.name }}</div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "room",
    props: ["room"],
});
</script>

<style lang="scss">
.room {
    background: rgba(255, 255, 255, 0.25);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    -webkit-backdrop-filter: blur(4px);
    backdrop-filter: blur(4px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 10px;

    padding: 15px;
    margin: 10px 0;
}

.title {
    display: flex;
    justify-content: flex-start;
    font-size: 24px;
    font-weight: bold;
    font-family: "Raleway", sans-serif;
    max-width: calc(100% - 80px);
    color: $titleColor;
}
</style>