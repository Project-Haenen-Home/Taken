<template>
    <div class="task">
            <div class="header">
                <div style="position: relative;">
                    <span id="title">{{ task.name }}</span>
                    <span class="logo-bay">
                        <settingsIcon class="logo clickable" @click="openEditor(task._id)"/>
                    </span>
                </div>
                <div class="under-title">
                    <span>{{ idToName(task.personID, DBStore.people) }}</span>
                    <span>&nbsp;-&nbsp;</span>
                    <span>{{ idToName(task.roomID, DBStore.rooms) }}</span>
                </div>
            </div>
            <div class="grid-container">
                <div style="grid-column: 1; grid-row: 1">{{ dealineString(task.finished[task.finished.length - 1], task.period) }}</div>
                <progressBar style="grid-column: 1; grid-row: 2" :progress="deadlineProgress(task.finished[task.finished.length - 1], task.period)"/>
                <div class="under-title" style="grid-column: 1; grid-row: 3; margin: 5px 0 0 0">Laatst voltooid: {{ formatDate(task.finished[task.finished.length - 1]) }}</div>

                <div class="finishItem"><div class="finishButton clickable" @click="finishTask(task._id)">Gedaan!</div></div>
            </div>
            <!-- <div>{{ task.comment }}</div> -->
    </div>
</template>

<script>
import DBStore from "../stores/DBStore"
import settingsIcon from "../assets/settings.svg"

import progressBar from "./elements/progressbar.vue"

export default {
    name: "task",
    components: { settingsIcon, progressBar },
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
        },
        finishTask(id) {
            const requestOptions = {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ finished: true })
            };


            fetch("http://wolleserver.local:2400/task/" + id, requestOptions)
                .then(response => response.json())
                .then(data => console.log(data))
                .then(() => DBStore.methods.getTasks());
        },
        openEditor: function(id) {
            this.$root.$emit('openOverlay', '{ "overlay": "editTask", "id": "' + id + '" }');
        }
    }
}
</script>

<style scoped>
    .task {
        border: 2px solid;
        border-radius: 5px;
        padding: 15px;
        margin: 10px 0;
    }

    .header {
        padding-bottom: 10px;
    }

    #title {
        display: block;
        font-size: 24px;
        font-weight: bold;
        font-family: 'Raleway', sans-serif;
        max-width: 375px;
    }

    .logo-bay {
        position: absolute;
        top: 0;
        right: 10px
    }

    .under-title {
        font-size: 12px;
        color:darkslategray;
        font-style: italic;
        margin: 2.5px 0 0 5px;
    }

    .grid-container {
        display: grid;
        gap: 12px;
    }

    .logo {
        width: 24px;
        height: 24px;
    }

    .clickable {
        cursor: pointer;
    }

    .deadline-txt {
        margin-left: 10px;
    }

    .finishItem {
        grid-column: 2;
        grid-row: 1 / span 3;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-right: 20px;
    }

    .finishButton {
        border: 2px solid;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: linen;
        width: 90%;
        height: 90%;
        min-width: 80px;
        max-width: 150px;
    }
</style>