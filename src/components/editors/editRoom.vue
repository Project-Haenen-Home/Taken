<template>
    <div>
        <div id="title">Kamer wijzigen</div>
        <table>
            <tr><td><label for="name">Naam: </label></td> <td><input id="name" type="text" v-model="name"/></td></tr>
            <tr><td></td><td><button @click="editRoom">Wijzig</button></td></tr>
        </table>
    </div>
</template>

<script>
import DBStore from "../../stores/DBStore"

export default {
    name: "addRoom",
    props: ['roomID'],
    data() {
        return {
            curID: "",
            roomName: "",

            DBStore: DBStore.data
        }
    },
    computed: {
        name: {
            get: function() {
                if(this.curID != this.roomID) this.getRoom();
                return this.roomName;
            },
            set: function(value) { this.roomName = value }
        }
    },
    methods: {
        editRoom: function() {
            if(this.name != "") {
                var json = { name: this.name };

                const requestOptions = {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(json)
                };


                fetch("http://wolleserver.local:2400/room/" + this.roomID, requestOptions)
                    .then(response => response.json())
                    .then(data => console.log(data))
                    .then(() => {
                        DBStore.methods.getRooms();
                        this.$emit("close");
                    });
            } else alert("Sommige verplichten velden zijn niet ingevuld!");
        },
        idToName: function(id, arr) {
            for (let el of arr) {
                if (el._id === id) {
                    return el.name;
                }
            }
        },
        getRoom: function() {
            this.name = this.idToName(this.roomID, this.DBStore.rooms);
            this.curID = this.roomID;
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