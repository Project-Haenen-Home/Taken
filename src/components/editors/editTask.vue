<template>
    <div>
        <div style="position: relative">
            <div id="title">Taak wijzigen</div>
            <deleteIcon class="logo clickable" style="margin-right: 5px" @click="deleteTask(curID)" />
        </div>
        <table>
            <tr>
                <td><label for="name">Naam: </label></td>
                <td><input id="name" type="text" v-model="name" /></td>
            </tr>
            <tr>
                <td><label for="person">Persoon: </label></td>
                <td>
                    <select id="person" v-model="person"
                        ><option v-for="person in people" :key="person._id" :value="person._id">{{
                            person.name
                        }}</option></select
                    >
                </td>
            </tr>
            <tr>
                <td><label for="rotate">Roterend: </label></td>
                <td><input id="rotate" type="checkbox" v-model="rotate" style="margin-left: 0" /></td>
            </tr>
            <tr>
                <td><label for="room">Kamer: </label></td>
                <td>
                    <select id="room" v-model="room"
                        ><option v-for="room in rooms" v-bind:key="room._id" v-bind:value="room._id">{{
                            room.name
                        }}</option></select
                    >
                </td>
            </tr>
            <tr>
                <td><label for="period">Periode: </label></td>
                <td><input id="period" v-model="period" type="number" min="1" step="1" /><span>&nbsp;Dagen</span></td>
            </tr>
            <tr>
                <td><label for="comment">Notitie: </label></td>
                <td><textarea id="comment" v-model="comment" rows="4"></textarea></td>
            </tr>
            <tr>
                <td></td>
                <td><button @click="editTask">Wijzig</button></td>
            </tr>
        </table>
    </div>
</template>

<script lang="ts">
import { PairIDName, Task } from "@/common/types";
import { mapActions, mapState } from "vuex";

import deleteIcon from "@/assets/icons/delete.svg";

export default {
    name: "editTask",
    components: { deleteIcon },
    data() {
        return {
            curID: "",
            task: {} as Task
        };
    },
    computed: {
        name: {
            get: function(): string {
                if (this.curID != this.overlay._id) this.getTask();
                return this.task.name;
            },
            set: function(value: string) {
                this.task.name = value;
            }
        },
        person: {
            get: function(): string {
                if (this.curID != this.overlay._id) this.getTask();
                return this.task.personID;
            },
            set: function(value: string) {
                this.task.personID = value;
            }
        },
        rotate: {
            get: function(): boolean {
                if (this.curID != this.overlay._id) this.getTask();
                return this.task.rotate != undefined ? this.task.rotate : false;
            },
            set: function(value: boolean) {
                this.task.rotate = value;
            }
        },
        room: {
            get: function(): string {
                if (this.curID != this.overlay._id) this.getTask();
                return this.task.roomID;
            },
            set: function(value: string) {
                this.task.roomID = value;
            }
        },
        period: {
            get: function(): number {
                if (this.curID != this.overlay._id) this.getTask();
                return this.task.period;
            },
            set: function(value: number) {
                this.task.period = value;
            }
        },
        comment: {
            get: function(): string {
                if (this.curID != this.overlay._id) this.getTask();
                return this.task.comment != undefined ? this.task.comment : "";
            },
            set: function(value: string) {
                this.task.comment = value;
            }
        },
        ...mapState(["tasks", "rooms", "people", "overlay"])
    },
    methods: {
        getTask: function() {
            for (let i = 0; i < this.tasks.length; i++) {
                if (this.tasks[i]._id == this.overlay._id) {
                    this.curID = this.overlay._id;
                    this.task = { ...this.tasks[i] };
                    break;
                }
            }
        },
        editTask: function() {
            if (this.name != "" && this.person != "" && this.room != "" && this.period != 0) {
                const json = {} as Task;
                json.name = this.name;
                json.personID = this.person;
                json.roomID = this.room;
                json.period = this.period;

                if (this.rotate) {
                    json.rotate = true;

                    const rotateGroup: string[] = [];
                    this.people.forEach((person: PairIDName) => {
                        rotateGroup.push(person._id);
                    });

                    json.rotateGroup = rotateGroup;
                } else json.rotate = false;

                if (this.comment != "") json.comment = this.comment;

                const requestOptions = {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(json)
                };

                fetch("http://wolleserver.local:2400/task/" + this.curID, requestOptions)
                    .then((response) => response.json())
                    .then((data) => console.log(data))
                    .then(() => {
                        this.fetchTasks();
                        this.$emit("close");
                    });
            } else alert("Sommige verplichten velden zijn niet ingevuld!");
        },
        deleteTask: function(id: string) {
            if (confirm("Weet je zeker dat je deze taak wilt verwijderen?")) {
                fetch("http://wolleserver.local:2400/task/" + id, { method: "DELETE" })
                    .then((response) => response.json())
                    .then((data) => console.log(data))
                    .then(() => {
                        this.fetchTasks();
                        this.$emit("close");
                    });
            }
        },
        ...mapActions(["fetchTasks"])
    }
};
</script>

<style scoped>
#title {
    font-size: 20px;
    font-weight: 700;
    font-family: "Raleway", sans-serif;
    margin-bottom: 7px;
}

td {
    vertical-align: top;
}

button {
    float: right;
    margin: 10px 5% 5px 0;
}

textarea {
    resize: none;
}

.logo {
    position: absolute;
    top: 0;
    right: 30px;
    width: 24px;
    height: 24px;
}
</style>
