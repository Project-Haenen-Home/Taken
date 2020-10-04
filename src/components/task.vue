<template>
  <div class="task">
        <div class="header">
            <div>
                <span id="title">{{ task.name }}</span>
                <span style="float: right;">
                    <editLogo class="logo clickable" />
                    <deleteLogo class="logo clickable" @click="deleteItem(task._id)" />
                </span>
            </div>
            <div id="under-title">
                <span>{{ idToName(task.personID, people) }}</span>
                <span>&nbsp;-&nbsp;</span>
                <span>{{ idToName(task.roomID, rooms) }}</span>
                <span>&nbsp;-&nbsp;</span>
                <span>{{ formatDate(task.finished[task.finished.length - 1]) }}</span>
            </div>
        </div>
        <div>{{ task.comment }}</div>
  </div>
</template>

<script>
import deleteLogo from "../assets/delete.svg"
import editLogo from "../assets/pen.svg"

export default {
    name: "task",
    components: { deleteLogo, editLogo },
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
    .task {
        height: 150px;
        border: 2px solid;
        border-radius: 5px;
        padding: 10px;
        margin: 10px 0;
    }

    .header {
        padding-bottom: 20px;
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
    }

    .clickable {
        cursor: pointer;
    }
</style>