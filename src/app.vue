<template>
    <div>
        <h1 style="margin: 0">{{ greeting }}</h1>
        <task-adder v-bind:people="people" v-bind:rooms="rooms"/>
        <hr>
        <tasks v-bind:tasks="tasks" v-bind:people="people" v-bind:rooms="rooms"/>
    </div>
</template>

<script>
import taskAdder from "./components/addTask.vue"
import tasks from "./components/listTasks.vue"

export default {
    name: "App",
    components: { tasks, taskAdder },
    data() {
        return {
            greeting: "Taken",
            tasks: [],
            people: [],
            rooms: []
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