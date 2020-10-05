<template>
    <div>
        <overlay/>
        <titleBar />
        <tasks id="main-content"/>
        <sidenav id="side-nav"/>
    </div>
</template>

<script>
import DBStore from "./stores/DBStore"
import titleBar from "./components/titleBar.vue"
import sidenav from "./components/sidenav.vue"
import tasks from "./components/listTasks.vue"
import overlay from "./components/overlay.vue"

export default {
    name: "App",
    components: { tasks, overlay, titleBar, sidenav },
    data() {
        return {
            DBStore: DBStore.data
        };
    },
    created() {
        DBStore.methods.getAll();
    }
};
</script>

<style>
    * {
        font-family: 'Montserrat', sans-serif;
    }  

    body {
        margin: 0;
    }

    #main-content {
        margin-right: 16%;
    }

    #side-nav {
        height: 100%;
        width: 13%;
        top: 90px;
        right: 0;
        border-left: 1px solid grey;
        padding: 20px;
    }
</style>