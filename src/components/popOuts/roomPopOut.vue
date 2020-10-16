<template>
    <div>
        <div class="pop-out-title">
            <div>Kamers</div>
            <settingsIcon class="logo-small clickable" @click="openOverlay" />
        </div>

        <div class="pop-out-list">
            <div class="pop-out-item">
                <input type="radio" id="r_all" name="room" v-model="DBStore.taskFilter.roomID" value="0" @change="DBMethods.getTasks" checked><label for="r_all">Alle kamers</label>
            </div>

            <div v-for="room in DBStore.rooms" :key="room._id" class="pop-out-item">
                <input type="radio" :id="'r_' + room._id" name="room" v-model="DBStore.taskFilter.roomID" :value="room._id" @change="DBMethods.getTasks"><label :for="'r_' + room._id">{{room.name}}</label>
            </div>
        </div>
    </div>
</template>

<script>
import DBStore from "../../stores/DBStore"
import settingsIcon from "../../assets/settings.svg"

export default {
    name: "roomPopOut",
    components: { settingsIcon },
    data() {
        return {
            DBStore: DBStore.data,
            DBMethods: DBStore.methods
        }
    },
    methods: {
        openOverlay: function() {
            this.$root.$emit('openOverlay', '{"overlay": "roomSettings"}')
        }
    }
}
</script>