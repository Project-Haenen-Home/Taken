<template>
    <div>
        <div v-for="task in tasks" v-bind:key="task._id">
            <h2>{{ task.name }}</h2>
            <p>{{ formatDate(task.finished[task.finished.length - 1]) }}</p>
            <p>{{ idToName(task.personID, people) }}</p>
            <p>{{ idToName(task.roomID, rooms) }}</p>
            <p>{{ task.comment }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "tasks",
    props: ['tasks', 'rooms', 'people'],
    methods: {
        formatDate: function(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString("nl-NL", { weekday: "short", year: "numeric", month: 'long', day: 'numeric' });
        },
        idToName: function(id, arr) {
            for (let el of arr) {
                if (el._id === id) {
                    return el.name;
                }
            }
        }
    }
};
</script>