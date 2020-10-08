<template>
    <div id="overlay" class="hidden">
        <div id="content">
            <closeIcon class="logo clickable" @click="closeOverlay" />
            <taskAdder id="taskAdder" class="hidden" @close="closeOverlay" />
            <taskEditor id="taskEditor" class="hidden" @close="closeOverlay" :taskID="contentID" />
            <roomAdder id="roomAdder" class="hidden" @close="closeOverlay" />
            <roomEditor id="roomEditor" class="hidden" @close="closeOverlay" :roomID="contentID" />
            <roomSettings id="roomSettings" class="hidden" @close="closeOverlay" />
        </div>
    </div>
</template>

<script>
import closeIcon from "../assets/close.svg"
import taskAdder from "./editors/addTask.vue"
import taskEditor from "./editors/editTask.vue"
import roomAdder from "./editors/addRoom.vue"
import roomEditor from "./editors/editRoom.vue"
import roomSettings from "./editors/roomSettings.vue"

export default {
    name: "overlay",
    components: { taskAdder, taskEditor, roomAdder, roomEditor, roomSettings, closeIcon },
    props: ['current', 'contentID'],
    watch: {
        current: function(newVal, oldVal) {
            const overlay = document.querySelector("#overlay");
            const taskAdd = document.querySelector("#taskAdder");
            const taskEdit = document.querySelector("#taskEditor");
            const roomAdd = document.querySelector("#roomAdder");
            const roomEdit = document.querySelector("#roomEditor");
            const roomSet = document.querySelector("#roomSettings");

            if(newVal == "addRoom") {
                this.closeAll();
                overlay.classList.remove("hidden");
                roomAdd.classList.remove("hidden");
            } else if(newVal == "addTask") {
                this.closeAll();
                overlay.classList.remove("hidden");
                taskAdd.classList.remove("hidden");
            } else if(newVal == "roomSettings") {
                this.closeAll();
                overlay.classList.remove("hidden");
                roomSet.classList.remove("hidden");
            } else if(newVal == "editRoom") {
                this.closeAll();
                overlay.classList.remove("hidden");
                roomEdit.classList.remove("hidden");
            } else if(newVal == "editTask") {
                this.closeAll();
                overlay.classList.remove("hidden");
                taskEdit.classList.remove("hidden");
            }
        }
    },
    methods: {
        closeOverlay: function() {
            const overlay = document.querySelector("#overlay");
            
            overlay.classList.add("hidden");
            this.$root.$emit('openOverlay', '{ "overlay": "", "id": ""}');
        },
        
        closeAll: function() {
            const taskAdd = document.querySelector("#taskAdder");
            const roomAdd = document.querySelector("#roomAdder");
            const roomEdit = document.querySelector("#roomEditor");
            const taskEdit = document.querySelector("#taskEditor");
            const roomSet = document.querySelector("#roomSettings");

            taskAdd.classList.add("hidden");
            taskEdit.classList.add("hidden");
            roomAdd.classList.add("hidden");
            roomEdit.classList.add("hidden");
            roomSet.classList.add("hidden");
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
        background-color: white;
        top: 50%;
        left: 50%;
        width: 90%;
        max-width: 500px;
        padding: 30px 50px;
        transform: translate(-50%,-50%);
        -ms-transform: translate(-50%,-50%);
        padding: 30px 50px;
        border-radius: 10px;
        cursor: default;
    }

    @media only screen and (min-width: 900px) {
        #content {
            width: 50%;
            height: auto;
        }
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