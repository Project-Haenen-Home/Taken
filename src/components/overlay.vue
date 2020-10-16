<template>
    <div>
        <div id="overlay" @click="closeOverlay"></div>
        <div id="content">
            <closeIcon class="logo clickable" @click="closeOverlay" />
            <taskAdder id="taskAdder" v-if="current == 'addTask'" @close="closeOverlay" />
            <taskEditor id="taskEditor" v-if="current == 'editTask'" @close="closeOverlay" :taskID="contentID" />
            <roomAdder id="roomAdder" v-if="current == 'addRoom'" @close="closeOverlay" />
            <roomEditor id="roomEditor" v-if="current == 'editRoom'" @close="closeOverlay" :roomID="contentID" />
            <roomSettings id="roomSettings" v-if="current == 'roomSettings'" @close="closeOverlay" />
        </div>
    </div>
</template>

<script>
import closeIcon from "../assets/close.svg"
const taskAdder = () => import("./editors/addTask.vue")
const taskEditor = () => import("./editors/editTask.vue")
const roomAdder = () => import("./editors/addRoom.vue")
const roomEditor = () => import("./editors/editRoom.vue")
const roomSettings = () => import("./editors/roomSettings.vue")

export default {
    name: "overlay",
    components: { taskAdder, taskEditor, roomAdder, roomEditor, roomSettings, closeIcon },
    props: ['current', 'contentID'],
    data() {
        return {
            showRoomAdd: false,
            showRoomEdit: false,
            showRoomSet: false,

            showTaskAdd: false,
            showTaskEdit: false,
        }
    },
    methods: {
        closeOverlay: function() {
            this.$root.$emit('openOverlay', '{ "overlay": "", "id": ""}');
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
        z-index: 5;
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
        z-index: 6;
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