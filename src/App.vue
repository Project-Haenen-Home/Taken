<template>
    <title-bar title="Taken @ HaenenHome" />
    <div id="main">
        <div id="content">
            <filter-bay id="filterBay" />
            <div id="wrap">
                <div id="taskContainer">
                    <task v-for="task in tasks" :key="task._id" :task="task" />
                </div>
            </div>
        </div>
        <sidenav id="sidenav" />
        <lownav id="lownav" />
    </div>
    <overlay />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState, mapActions } from "vuex";

import titleBar from "@/components/titleBar.vue";
import task from "@/components/task.vue";

import lownav from "@/components/lownav.vue";
import filterBay from "@/components/filterBay.vue";

import overlay from "@/components/overlay.vue";
import sidenav from "@/components/sidenav.vue";

export default defineComponent({
    name: "App",
    components: { titleBar, task, sidenav, overlay, lownav, filterBay },
    mounted() {
        this.fetchAll();
        setInterval(() => {
            this.fetchAll();
        }, 30000);
    },
    computed: mapState(["tasks", "rooms", "people"]),
    methods: mapActions(["fetchAll"])
});
</script>

<style lang="scss">
* {
    box-sizing: border-box;
    font-family: "Montserrat", sans-serif;
}

body {
    margin: 0;
    height: 100vh;
}

#app {
    overflow-y: visible;
}

.hidden {
    display: none;
}

.clickable {
    cursor: pointer;
}

/* scrollbar */
::-webkit-scrollbar {
    width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
    background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>

<style lang="scss" scoped>
#main {
    display: flex;
    height: calc(100vh - 90px);
}

#content {
    flex: 1;
    display: flex;
    flex-flow: column;
}

#sidenav {
    display: none;
    width: 275px;
    padding: 20px 0 0 20px;
    border-left: 1px solid grey;
}

#wrap {
    padding: 0 10px 0 10px;
    overflow-y: scroll;
}

#wrap::after {
    content: " ";
    height: 10px;
}

@media only screen and (min-width: 740px) {
    #taskContainer {
        padding: 0 20px 0 20px;
        display: grid;
        gap: 0 15px;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    }
}

@media only screen and (min-width: 1150px) {
    #filterBay {
        display: none;
    }

    #lownav {
        display: none;
    }

    #sidenav {
        display: block;
    }
}
</style>
