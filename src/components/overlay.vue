<template>
    <div id="overlay" class="hidden">
        <div id="content">
            <closeIcon class="logo clickable" @click="closeOverlay" />
            <taskAdder id="taskAdder" class="hidden" @close="closeOverlay" />
            <roomAdder id="roomAdder" class="hidden" @close="closeOverlay" />
        </div>
    </div>
</template>

<script>
import closeIcon from "../assets/close.svg"
import taskAdder from "./editors/addTask.vue"
import roomAdder from "./editors/addRoom.vue"

export default {
    name: "overlay",
    components: { taskAdder, roomAdder, closeIcon },
    props: ['current'],
    watch: {
        current: function(newVal, oldVal) {
            const overlay = document.querySelector("#overlay");
            const taskAdd = document.querySelector("#taskAdder");
            const roomAdd = document.querySelector("#roomAdder");

            if(newVal == "addRoom") {
                overlay.classList.remove("hidden");
                roomAdd.classList.remove("hidden");
            } else if(newVal == "addTask") {
                overlay.classList.remove("hidden");
                taskAdd.classList.remove("hidden");
            }
        }
    },
    methods: {
        closeOverlay: function() {
            const overlay = document.querySelector("#overlay");
            const taskAdd = document.querySelector("#taskAdder");
            const roomAdd = document.querySelector("#roomAdder");

            overlay.classList.add("hidden");
            taskAdd.classList.add("hidden");
            roomAdd.classList.add("hidden");
            this.$root.$emit("openOverlay", "");
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