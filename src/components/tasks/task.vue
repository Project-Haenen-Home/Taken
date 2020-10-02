<template>
  <div id="task">
        <div><span id="title">{{ task.name }}</span><deleteLogo class="logo clickable" @click="deleteItem(task._id)" /></div>
        <div id="under-title">{{ formatDate(task.finished[task.finished.length - 1]) }}</div>
        <div>{{ idToName(task.personID, people) }}</div>
        <div>{{ idToName(task.roomID, rooms) }}</div>
        <div>{{ task.comment }}</div>
  </div>
</template>

<script>
import deleteLogo from "../../assets/delete.svg"

export default {
    name: "task",
    components: { deleteLogo },
    props: ['task', 'people', 'rooms'],
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
        },
        deleteItem: function(id) {
            fetch("http://wolleserver.local:2400/task/" + id, { method: "DELETE" })
                .then(response => response.json())
                .then(data => console.log(data))
                .then(() => this.$root.$emit("refreshTasks"));
        }
    }
}
</script>

<style scoped>
    #task {
        width: 20%;
        margin: 20px 10px;
    }

    #title {
        font-size: 24px;
        font-weight: bold;
    }

    #under-title {
        font-size: 12px;
        color:darkslategray;
        font-style: italic;
        margin: 2.5px 0 0 5px;
    }

    .logo {
        width: 28px;
        height: 28px;
        margin-right: 20px;
        float: right;
    }

    .clickable {
        cursor: pointer;
    }
</style>