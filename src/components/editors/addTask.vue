<template>
    <div>
        <div id="title">Taak toevoegen</div>
        <table>
            <tr>
                <td><label for="name">Naam: </label></td>
                <td><input id="name" type="text" v-model="name" /></td>
            </tr>
            <tr>
                <td><label for="person">Persoon: </label></td>
                <td>
                    <select id="person" v-model="person"
                        ><option selected value="0" hidden>Kies een persoon...</option
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
                        ><option selected value="0" hidden>Kies een kamer...</option
                        ><option v-for="room in rooms" :key="room._id" :value="room._id">{{
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
                <td><button @click="addTask">Voeg toe</button></td>
            </tr>
        </table>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";
import { PairIDName, Task } from "@/common/types";

export default defineComponent({
    name: "addTask",
    data() {
        return {
            name: "",
            person: "",
            rotate: false,
            room: "",
            period: "10",
            comment: ""
        };
    },
    methods: {
        addTask: function() {
            if (this.name != "" && this.person != "0" && this.room != "0" && this.period != "") {
                const json = {} as Task;
                json.name = this.name;
                json.personID = this.person;
                json.roomID = this.room;
                json.period = Number(this.period);

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
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(json)
                };

                fetch("http://wolleserver.local:2400/task", requestOptions)
                    .then((response) => response.json())
                    .then((data) => console.log(data))
                    .then(() => {
                        this.fetchTasks();
                        this.$emit("close");
                    });
            } else alert("Sommige verplichten velden zijn niet ingevuld!");
        },
        ...mapActions(["fetchTasks"])
    },
    computed: mapState(["people", "rooms"])
});
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
</style>
