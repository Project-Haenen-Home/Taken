<template>
    <div class="task">
        <div class="header">
            <div class="title-bay">
                <span style="display: flex">
                    <span class="title">{{ task.name }}</span>
                    <rotateIcon class="logo" v-if="task.rotate != null && task.rotate" style="margin-left: 10px" />
                </span>
                <span class="logo-bay">
                    <!-- <analyzeIcon class="logo clickable" /> -->
                    <settingsIcon
                        class="logo clickable"
                        @click="pushOverlay({ id: task._id, name: 'editTask', popOut: false })"
                    />
                </span>
            </div>
            <div class="under-title">
                <span>{{ idToName(task.personID, people) }}</span>
                <span>&nbsp;-&nbsp;</span>
                <span>{{ idToName(task.roomID, rooms) }}</span>
                <span v-if="task.comment != undefined">
                    <span>&nbsp;-&nbsp;</span>
                    <span>
                        Notitie...
                        <span class="clickable" @click="showComment = !showComment">{{
                            showComment ? "(-)" : "(+)"
                        }}</span>
                    </span>
                </span>
            </div>
        </div>
        <div class="comment" v-if="showComment">{{ task.comment }}</div>
        <div class="grid-container">
            <div style="grid-column: 1; grid-row: 1">
                {{ dealineString(task.finished[task.finished.length - 1], task.period) }}
            </div>
            <progressBar
                style="grid-column: 1; grid-row: 2"
                :progress="deadlineProgress(task.finished[task.finished.length - 1], task.period)"
            />
            <div class="under-title" style="grid-column: 1; grid-row: 3; margin: 5px 0 0 0">
                Laatst voltooid: {{ formatDate(task.finished[task.finished.length - 1]) }}
            </div>

            <div class="finishItem">
                <div class="finishButton clickable" @click="finishTask(task._id)">Gedaan!</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState, mapActions, mapMutations } from "vuex";
import { PairIDName } from "../common/types";

import settingsIcon from "@/assets/icons/settings.svg";
import rotateIcon from "@/assets/icons/rotate.svg";
// import analyzeIcon from "../assets/icons/analyze.svg";

import progressBar from "./elements/progressbar.vue";

export default defineComponent({
    name: "task",
    components: { settingsIcon, rotateIcon, progressBar },
    props: ["task"],
    data() {
        return {
            showComment: false
        };
    },
    computed: mapState(["rooms", "people"]),
    methods: {
        dealineString(date: string, period: number) {
            const d = period - (new Date().getTime() - new Date(date).getTime()) / (1000 * 3600 * 24);
            if (d > 2) return "Deadline over " + d.toFixed(0) + " dagen";
            else if (d > 1) return "Deadline is morgen";
            else if (d < -2) return "Deadline is " + -d.toFixed(0) + " dagen geleden verlopen";
            else if (d < -1) return "Deadline is gisteren verlopen";
            else return "Deadline is vandaag";
        },
        deadlineProgress(date: string, period: number) {
            const d = (100 * ((new Date().getTime() - new Date(date).getTime()) / (1000 * 3600 * 24))) / period;
            return d.toFixed(0);
        },
        formatDate: function(dateString: string) {
            const date = new Date(dateString);
            return date.toLocaleDateString("nl-NL", {
                weekday: "short",
                year: "numeric",
                month: "long",
                day: "numeric"
            });
        },
        idToName(id: string, array: PairIDName[]) {
            const obj = array.find((el) => el._id == id);
            return obj?.name != undefined ? obj.name : "";
        },
        finishTask(id: string) {
            if (confirm("Heb je deze taak gedaan?")) {
                const requestOptions = {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ finished: true })
                };
                fetch("http://wolleserver.local:2400/task/" + id, requestOptions)
                    .then((response) => response.json())
                    .then((data) => console.log(data))
                    .then(() => this.fetchTasks());
            }
        },
        ...mapActions(["fetchTasks"]),
        ...mapMutations(["pushOverlay"])
    }
});
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

.title-bay {
    position: relative;
}

.title {
    display: flex;
    justify-content: flex-start;
    font-size: 24px;
    font-weight: bold;
    font-family: "Raleway", sans-serif;
    max-width: calc(100% - 80px);
}

.logo-bay {
    position: absolute;
    top: 0;
    right: 10px;
}

.under-title {
    font-size: 12px;
    color: darkslategray;
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

.deadline-txt {
    margin-left: 10px;
}

.comment {
    color: darkslategray;
    font-style: italic;
    margin-bottom: 10px;
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
    user-select: none;
}
</style>
