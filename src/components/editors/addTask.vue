<template>
    <div>
        <div id="title">Taak toevoegen</div>
        <table>
            <tr><td><label for="name">Naam: </label></td> <td><input id="name" type="text" v-model="name"/></td></tr>
            <tr><td><label for="person">Persoon: </label> </td><td><select id="person" v-model="person"><option v-for="person in people" v-bind:key="person._id" v-bind:value="person._id">{{ person.name }}</option></select></td></tr>
            <tr><td><label for="room">Kamer: </label></td> <td><select id="room" v-model="room"><option v-for="room in rooms" v-bind:key="room._id" v-bind:value="room._id">{{ room.name }}</option></select></td></tr>
            <tr><td><label for="period">Periode: </label></td> <td><input id="period" v-model="period" type="number" min="1" step="1"/><span>&nbsp;Dagen</span></td></tr>
            <tr><td><label for="comment">Notitie: </label></td> <td><textarea id="comment" v-model="comment" rows="4" cols="40" ></textarea></td></tr>
            <tr><td></td><td><button @click="addTask">Voeg toe</button></td></tr>
        </table>
    </div>
</template>

<script>
export default {
    name: "addTask",
    props: ['people', 'rooms'],
    data() {
        return {
            name: "",
            person: "",
            room: "",
            period: "10",
            comment: ""
        }
    },
    methods: {
        addTask: function() {
            if(this.name != "" && this.person != "" && this.room != "" && this.number != "") {

                var json = new Object();
                json.name = this.name;
                json.personID = this.person;
                json.roomID = this.room;
                json.period = this.period;

                if(this.comment != "") json.comment = this.comment;

                const requestOptions = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(json)
                };


                fetch("http://wolleserver.local:2400/task", requestOptions)
                    .then(response => response.json())
                    .then(data => console.log(data))
                    .then(() => {
                        this.$root.$emit("refreshTasks");
                        this.$emit("close");
                    });
            } else alert("Sommige verplichten velden zijn niet ingevuld!");
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
</style>