<template>
    <div>
        <overlay id="overlay" v-if="showOverlay" :current="currentOverlay" :contentID="overlayID"  />
        <titleBar title="Taken @ HaenenHome" />
        <div id="content">
            <div id="main-content">
                <filterBay />
                <tasks />
            </div>
            <sidenav id="side-nav" />
        </div>
        <lownav id="low-nav" :current="currentPopOut"/>
    </div>
</template>

<script>
import filterBay from "./components/filterBay.vue"
import lownav from "./components/lownav.vue"
import DBStore from "./stores/DBStore"
import titleBar from "./components/titleBar.vue"
import tasks from "./components/listTasks.vue"

const sidenav = () => import("./components/sidenav.vue"/* webpackChunkName: "sidenav" */)
const overlay = () => import("./components/overlay.vue"/* webpackChunkName: "overlay" */)

export default {
    name: "App",
    components: { tasks, overlay, titleBar, sidenav, lownav, filterBay },
    data() {
        return {
            showOverlay: false,
            currentOverlay: "",
            overlayID: "",
            currentPopOut: "",

            DBStore: DBStore.data
        };
    },
    created() {
        DBStore.methods.getAll();
    },
    mounted() {
        this.$root.$on('openOverlay', (data) => {
            const j = JSON.parse(data);

            if(j.overlay != "") this.showOverlay = true;
            else this.showOverlay = false;

            this.overlayID = j.id;
            this.currentOverlay = j.overlay;
        })
        this.$root.$on('openPopOut', (data) => {
            this.currentPopOut = data;
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

<style scoped>
    #content {
        display: flex;
        width: 100%;
        height: calc(100vh - 90px);
    }

    #main-content {
        width: 100%;
        height: inherit;
        overflow-y: scroll;
    }

    #side-nav {
        display: none;
    }

    @media only screen and (min-width: 1025px) {
        #side-nav {
            display: block;
            padding: 20px 0 0 20px;
            border-left: 1px solid grey;
            min-width: 275px;
        }

        #low-nav {
            display: none;
        }
    }
</style>