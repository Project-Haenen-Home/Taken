<template>
    <div>
        <div id="taskContainer">
            <task v-for="task in DBStore.tasks" v-bind:key="task._id" :task="task" />
        </div>
    </div>
</template>

<script>
import DBStore from "../stores/DBStore"
import task from "./task.vue"

export default {
    name: "tasks",
    components: { task },
    props: ['rooms', 'people'],
    data() {
        return {
            DBStore: DBStore.data
        }
    }
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
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        }
    }
</style>