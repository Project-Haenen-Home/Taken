<template>
    <div>
        <overlay id="overlay" :current="currentOverlay" :contentID="overlayID" />
        <titleBar />
        <filterBay />
        <tasks id="main-content" />
        <sidenav id="side-nav" />
        <lownav id="low-nav" />
    </div>
</template>

<script>
import filterBay from "./components/filterBay.vue"
import lownav from "./components/lownav.vue"
import DBStore from "./stores/DBStore"
import titleBar from "./components/titleBar.vue"
import sidenav from "./components/sidenav.vue"
import tasks from "./components/listTasks.vue"
import overlay from "./components/overlay.vue"

export default {
    name: "App",
    components: { tasks, overlay, titleBar, sidenav, lownav, filterBay },
    data() {
        return {
            currentOverlay: "",
            overlayID: "",

            DBStore: DBStore.data
        };
    },
    created() {
        DBStore.methods.getAll();
    },
    mounted() {
        this.$root.$on('openOverlay', (data) => {
            const j = JSON.parse(data);

            this.overlayID = j.id;
            this.currentOverlay = j.overlay;
        })
    }
};
</script>

<style>
    * {
        box-sizing: border-box;
        font-family: 'Montserrat', sans-serif;
    }  

    body {
        margin: 0;
    }

    .hidden {
        display: none;
    }

    #side-nav {
        display: none;
    }

    @media only screen and (min-width: 1400px) {
        #main-content {
            margin-right: 13%;
        }

        #side-nav {
            display: block;
            height: 100%;
            width: 13%;
            top: 90px;
            right: 0;
            border-left: 1px solid grey;
            padding: 20px;
        }

        #low-nav {
            display: none;
        }
    }

    .clickable {
        cursor: pointer;
    }
</style>