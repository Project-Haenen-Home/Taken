<template>
    <div>
        <overlay :rooms="rooms" :people="people" />
        <h1 style="margin: 0; padding: 20px; color: whitesmoke">{{ greeting }}</h1>
        <tasks :tasks="tasks" :rooms="rooms" :people="people"/>
    </div>
</template>

<script>
import tasks from "./components/listTasks.vue"
import overlay from "./components/overlay.vue"

export default {
    name: "App",
    components: { tasks, overlay },
    data() {
        return {
            greeting: "Taken",

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

    h1 {
        background-color: dodgerblue;
    }
</style>