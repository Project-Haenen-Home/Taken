<template>
    <div id="taskContainer">
        <task v-for="task in tasks" v-bind:key="task._id" v-bind:task="task" v-bind:people="people" v-bind:rooms="rooms"/>
    </div>
</template>

<script>
import task from "./task.vue"

export default {
    name: "tasks",
    components: { task },
    props: ['tasks', 'rooms', 'people'],
};
</script>

<style scoped>
    #taskContainer {
        margin: 20px 10px 0 10px;
    }

    @media only screen and (min-width: 600px) {
        #taskContainer {
            margin: 10px 20px 0 20px;
            display: grid;
            gap: 0 15px;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        }
    }
</style>