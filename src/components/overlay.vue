<template>
    <div id="overlay" @click="closeOverlay">
        <div id="content">
            <closeIcon class="logo clickable" @click="closeOverlay" />
            <taskAdder @close="closeOverlay" :rooms="rooms" :people="people"/>
        </div>
    </div>
</template>

<script>
import closeIcon from "../assets/close.svg"
import taskAdder from "./editors/addTask.vue"

export default {
    name: "overlay",
    components: { taskAdder, closeIcon },
    props: ['rooms', 'people'],
    methods: {
        closeOverlay: function() {
            const overlay = document.querySelector("#overlay");
            overlay.style.display = "none";
        }
    }
}
</script>

<style scoped>
    #overlay {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0,0,0,0.5);
        z-index: 2;
        cursor: pointer;
    }

    #content {
        position: absolute;
        top: 50%;
        left: 50%;
        background-color: white;
        padding: 30px 50px;
        border-radius: 10px;
        cursor: default;
        transform: translate(-50%,-50%);
        -ms-transform: translate(-50%,-50%);
    }

     .logo {
        position: fixed;
        width: 24px;
        height: 24px;
        right: 20px;
        top: 20px;
    }

    .clickable {
        cursor: pointer;
    }
</style>