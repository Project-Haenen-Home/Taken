<template>
    <div>
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