<template>
    <div>
        <overlay :rooms="rooms" :people="people" />
        <titleBar />
        <tasks id="main-content" :tasks="tasks" :rooms="rooms" :people="people"/>
        <sidenav id="side-nav" :people="people"/>
    </div>
</template>

<script>
import titleBar from "./components/titleBar.vue"
import sidenav from "./components/sidenav.vue"
import tasks from "./components/listTasks.vue"
import overlay from "./components/overlay.vue"

export default {
    name: "App",
    components: { tasks, overlay, titleBar, sidenav },
    data() {
        return {
            tasks: [],
            rooms: [],
            people: []
        };
    },
    created() {
        fetch("http://wolleserver.local:2400/task")
        .then(resp => resp.json())
        .then(data => {
            this.respAvail = true;
            this.tasks = data;
        });
        
        fetch("http://wolleserver.local:2400/person")
        .then(resp => resp.json())
        .then(data => {
            this.respAvail = true;
            this.people = data;
        });
        fetch("http://wolleserver.local:2400/room")
        .then(resp => resp.json())
        .then(data => {
            this.respAvail = true;
            this.rooms = data;
        });
    },
    mounted() {
        this.$root.$on('refreshTasks', () => {
            fetch("http://wolleserver.local:2400/task")
                .then(resp => resp.json())
                .then(data => {
                    this.respAvail = true;
                    this.tasks = data;
                });
        });
        this.$root.$on('refreshRooms', () => {
            fetch("http://wolleserver.local:2400/room")
                .then(resp => resp.json())
                .then(data => {
                    this.respAvail = true;
                    this.rooms = data;
                });
        });
        this.$root.$on('refreshPeople', () => {
            fetch("http://wolleserver.local:2400/person")
                .then(resp => resp.json())
                .then(data => {
                    this.respAvail = true;
                    this.people = data;
                });
        });
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