<template>
  <div class="task">
        <div class="header">
            <div>
                <span id="title">{{ task.name }}</span>
                <span style="float: right;">
                    <editIcon class="logo clickable" />
                    <deleteIcon class="logo clickable" @click="deleteItem(task._id)" />
                </span>
            </div>
            <div id="under-title">
                <span>{{ idToName(task.personID, DBStore.people) }}</span>
                <span>&nbsp;-&nbsp;</span>
                <span>{{ idToName(task.roomID, DBStore.rooms) }}</span>
                <span>&nbsp;-&nbsp;</span>
                <span>{{ formatDate(task.finished[task.finished.length - 1]) }}</span>
            </div>
        </div>
        <div class="deadline"><progressBar :progress="deadlineProgress(task.finished[task.finished.length - 1], task.period)"/><span class="deadline-txt">{{ dealineString(task.finished[task.finished.length - 1], task.period) }}</span></div>
        <div>{{ task.comment }}</div>
  </div>
</template>

<script>
import DBStore from "../stores/DBStore"
import deleteIcon from "../assets/delete.svg"
import editIcon from "../assets/pen.svg"

import progressBar from "./elements/progressbar.vue"

export default {
    name: "task",
    components: { deleteIcon, editIcon, progressBar },
    props: ['task'],
    data() {
        return {
            DBStore: DBStore.data
        }
    },
    methods: {
        dealineString(date, period) {
            const d = period - (new Date() - new Date(date)) / (1000 * 3600 * 24);
            if(d > 1) return "Deadline over " + d.toFixed(0) + " dagen";
            else if(d == 1) return "Deadline is morgen";
            else if (d == -1) return "Deadline is gisteren verlopen";
            else if(d < -1) return "Deadline is " + -d.toFixed(0) + " dagen geleden verlopen";
            else return "Deadline is vandaag";
        },
        deadlineProgress(date, period) {
            const d = 100 * ((new Date() - new Date(date)) / (1000 * 3600 * 24)) / period;
            return d.toFixed(0);
        },
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
                .then(() => DBStore.methods.getTasks());
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
        font-family: 'Raleway', sans-serif;
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

    .deadline {
        display: flex;
        align-content: center;
    }

    .deadline-txt {
        margin-left: 10px;
    }
</style>