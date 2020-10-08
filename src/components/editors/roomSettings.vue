<template>
    <div id="roomSettings">
        <div id="header">
            <div id="title">Kamer instellingen</div>
            <addIcon class="logo clickable" @click="openAdd"/>
        </div>
        <div id="rooms">
            <div v-for="room in DBStore.rooms" :key="room._id" class="room">
                <div>{{ room.name }}</div>
                <editIcon class="logo clickable" style="margin-right: 5px" @click="openEdit(room._id)" />
            </div>
        </div>
    </div>
</template>

<script>
import DBStore from "../../stores/DBStore"
import addIcon from "../../assets/add.svg"
import editIcon from "../../assets/pen.svg"

export default {
    name: "roomSettings",
    components: { addIcon, editIcon },
    data() {
        return {
            DBStore: DBStore.data
        }
    },
    methods: {
        openAdd: function() {
            this.$root.$emit('openOverlay', '{ "overlay": "addRoom" }');
        },
        openEdit: function(id) {
            this.$root.$emit('openOverlay', '{ "overlay": "editRoom", "id": "' + id + '" }');
        },
    }
}
</script>

<style>
    #roomSettings {
        margin: 0 20px;
    }

    #header {
        display: flex;
    }

    #title {
        font-size: 20px;
        font-weight: 700;
        font-family: 'Raleway', sans-serif;
        margin-bottom: 7px;
    }

    #rooms {
        padding: 10px;
    }

    .room {
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .logo {
        width: 24px;
        height: 24px;
        margin-left: 10px;
    }
</style>