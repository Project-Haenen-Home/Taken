<template>
    <div v-if="overlay.name != ''">
        <div id="overlay" @click="closeOverlay"></div>
        <div id="content">
            <closeIcon class="logo clickable" @click="closeOverlay" />
            <taskAdder id="taskAdder" v-if="overlay.name == 'addTask'" @close="closeOverlay" />
            <taskEditor id="taskEditor" v-if="overlay.name == 'editTask'" @close="closeOverlay" :taskID="overlay._id" />
            <roomAdder id="roomAdder" v-if="overlay.name == 'addRoom'" @close="closeOverlay" />
            <roomEditor id="roomEditor" v-if="overlay.name == 'editRoom'" @close="closeOverlay" :roomID="overlay._id" />
            <roomSettings id="roomSettings" v-if="overlay.name == 'roomSettings'" @close="closeOverlay" />
            <!-- <div v-if="stat.loading" id="loader"><loader /></div> -->
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from "vue";
import { mapMutations, mapState } from "vuex";

import closeIcon from "@/assets/icons/close.svg";
// import loader from "./elements/loader.vue";

const status = { loading: false };

const taskAdder = defineAsyncComponent(() => {
    status.loading = true;
    return import("./editors/addTask.vue").then((module) => {
        status.loading = false;
        return module;
    });
});

const taskEditor = defineAsyncComponent(() => {
    status.loading = true;
    return import("./editors/editTask.vue").then((module) => {
        status.loading = false;
        return module;
    });
});

const roomAdder = defineAsyncComponent(() => {
    status.loading = true;
    return import("./editors/addRoom.vue").then((module) => {
        status.loading = false;
        return module;
    });
});

const roomEditor = defineAsyncComponent(() => {
    status.loading = true;
    return import("./editors/editRoom.vue").then((module) => {
        status.loading = false;
        return module;
    });
});

const roomSettings = defineAsyncComponent(() => {
    status.loading = true;
    return import("./editors/roomSettings.vue").then((module) => {
        status.loading = false;
        return module;
    });
});

export default defineComponent({
    name: "overlay",
    components: { taskAdder, taskEditor, roomAdder, roomEditor, roomSettings, closeIcon /*, loader*/ },
    data() {
        return {
            stat: status
        };
    },
    computed: mapState(["overlay"]),
    methods: {
        closeOverlay: function() {
            this.setOverlay({ _id: "", name: "" });
        },
        ...mapMutations(["setOverlay"])
    }
});
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
    background-color: rgba(0, 0, 0, 0.5);
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
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
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

#loader {
    display: flex;
    justify-content: center;
    align-items: center;
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
