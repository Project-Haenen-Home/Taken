<template>
    <div>
        <div id="title">Kamer wijzigen</div>
        <table>
            <tr>
                <td><label for="name">Naam: </label></td>
                <td><input id="name" type="text" v-model="name" /></td>
            </tr>
            <tr>
                <td></td>
                <td><button @click="editRoom">Wijzig</button></td>
            </tr>
        </table>
    </div>
</template>

<script lang="ts">
import { PairIDName } from "@/common/types";
import { mapActions, mapState } from "vuex";

export default {
    name: "addRoom",
    data() {
        return {
            curID: "",
            roomName: ""
        };
    },
    computed: {
        name: {
            get: function(): string {
                if (this.curID != this.overlay._id) this.getRoom();
                return this.roomName;
            },
            set: function(value: string) {
                this.roomName = value;
            }
        },
        ...mapState(["overlay", "rooms"])
    },
    methods: {
        editRoom: function() {
            if (this.name != "") {
                const json = { name: this.name };

                const requestOptions = {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(json)
                };

                fetch("http://wolleserver.local:2400/room/" + this.curID, requestOptions)
                    .then((response) => response.json())
                    .then((data) => console.log(data))
                    .then(() => {
                        this.fetchRooms();
                        this.$emit("close");
                    });
            } else alert("Sommige verplichten velden zijn niet ingevuld!");
        },
        idToName(id: string, array: PairIDName[]) {
            const obj = array.find((el) => el._id == id);
            return obj?.name != undefined ? obj.name : "";
        },
        getRoom: function() {
            this.name = this.idToName(this.overlay._id, this.rooms);
            this.curID = this.overlay._id;
        },
        ...mapActions(["fetchRooms"])
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
</style>
