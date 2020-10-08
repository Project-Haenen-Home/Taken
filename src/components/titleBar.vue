<template>
    <div id="header">
        <span id="title">Taken</span>
    </div>
</template>

<script>

export default {
    name: "titleBar",
}
</script>

<style scoped>
    #header {
        background-color: dodgerblue;
        padding: 20px;
        height: 90px;
    }

    #title {
        font-size: 40px;
        font-weight: 700;
        font-family: 'Raleway', sans-serif;
        color: whitesmoke;
    }
</style>