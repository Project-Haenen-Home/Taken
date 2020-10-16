<template>
    <div>
        <div style="position: relative">
            <div id="title">Taak wijzigen</div>
            <deleteIcon class="logo clickable" style="margin-right: 5px" @click="deleteTask(taskID)" />
        </div>
        <table>
            <tr><td><label for="name">Naam: </label></td> <td><input id="name" type="text" v-model="name"/></td></tr>
            <tr><td><label for="person">Persoon: </label> </td><td><select id="person" v-model="person"><option v-for="person in DBStore.people" :key="person._id" :value="person._id">{{ person.name }}</option></select></td></tr>
            <tr><td><label for="rotate">Roterend: </label></td> <td><input id="rotate" type="checkbox" v-model="rotate" style="margin-left: 0" /></td></tr>
            <tr><td><label for="room">Kamer: </label></td> <td><select id="room" v-model="room"><option v-for="room in DBStore.rooms" v-bind:key="room._id" v-bind:value="room._id">{{ room.name }}</option></select></td></tr>
            <tr><td><label for="period">Periode: </label></td> <td><input id="period" v-model="period" type="number" min="1" step="1"/><span>&nbsp;Dagen</span></td></tr>
            <tr><td><label for="comment">Notitie: </label></td> <td><textarea id="comment" v-model="comment" rows="4" ></textarea></td></tr>
            <tr><td></td><td><button @click="editTask">Wijzig</button></td></tr>
        </table>
    </div>
</template>

<script>
import DBStore from "../../stores/DBStore"

import deleteIcon from "../../assets/delete.svg"

export default {
    name: "editTask",
    props: ['taskID'],
    components: { deleteIcon },
    data() {
        return {
            curID: "",
            task: null,

            DBStore: DBStore.data
        }
    },
    computed: {
        name: {
            get: function() {
                if(this.curID != this.taskID) this.getTask();
                return this.task.name;
            },
            set: function(value) { this.task.name = value }
        },
        person: {
            get: function() {
                if(this.curID != this.taskID) this.getTask();
                return this.task.personID;
            },
            set: function(value) { this.task.personID = value }
        },
        rotate: {
            get: function() {
                if(this.curID != this.taskID) this.getTask();
                return this.task.rotate;
            },
            set: function(value) { this.task.rotate = value }
        },
        room: {
            get: function() {
                if(this.curID != this.taskID) this.getTask();
                return this.task.roomID;
            },
            set: function(value) { this.task.roomID = value }
        },
        period: {
            get: function() {
                if(this.curID != this.taskID) this.getTask();
                return this.task.period;
            },
            set: function(value) { this.task.period = value }
        },
        comment: {
            get: function() {
                if(this.curID != this.taskID) this.getTask();
                return this.task.comment;
            },
            set: function(value) { this.task.comment = value }
        }
    },
    methods: {
        getTask: function() {
            for(var i = 0; i < DBStore.data.tasks.length; i++) {
                if(DBStore.data.tasks[i]._id == this.taskID) {
                    this.curID = this.taskID;
                    this.task = {...DBStore.data.tasks[i]};
                    break;
                }
            }
        },
        editTask: function() {
            if(this.name != "" && this.person != "" && this.room != "" && this.number != "") {

                var json = new Object();
                json.name = this.name;
                json.personID = this.person;
                json.roomID = this.room;
                json.period = this.period;

                if(this.rotate) {
                    json.rotate = true;

                    var rotateGroup = [];
                    DBStore.data.people.forEach(person => {
                        rotateGroup.push(person._id);
                    });
                    json.rotateGroup = rotateGroup;
                } else json.rotate = false;
                if(this.comment != "") json.comment = this.comment;

                const requestOptions = {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(json)
                };


                fetch("http://wolleserver.local:2400/task/" + this.taskID, requestOptions)
                    .then(response => response.json())
                    .then(data => console.log(data))
                    .then(() => {
                        DBStore.methods.getTasks();
                        this.$emit("close");
                    });
            } else alert("Sommige verplichten velden zijn niet ingevuld!");
        },
        deleteTask: function(id) {
            if(confirm("Weet je zeker dat je deze taak wilt verwijderen?")) {
                fetch("http://wolleserver.local:2400/task/" + id, { method: "DELETE" })
                    .then(response => response.json())
                    .then(data => console.log(data))
                    .then(() => {
                        DBStore.methods.getTasks();
                        this.$emit("close");
                    });
            }
        }
    }
}
</script>

<style scoped>
    #title {
        font-size: 20px;
        font-weight: 700;
        font-family: 'Raleway', sans-serif;
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