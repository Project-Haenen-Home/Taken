<template>
    <div id="roomSettings">
        <div id="header">
            <div id="title">Kamer instellingen</div>
            <addIcon class="logo clickable" @click="pushOverlay({ id: '', name: 'addRoom' })" />
        </div>
        <div id="rooms">
            <div v-for="room in rooms" :key="room._id" class="room">
                <div>{{ room.name }}</div>
                <editIcon
                    class="logo clickable"
                    style="margin-right: 5px"
                    @click="pushOverlay({ id: '', name: 'editRoom', popOut: false })"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapMutations, mapState } from "vuex";

import addIcon from "@/assets/icons/add.svg";
import editIcon from "@/assets/icons/pen.svg";

export default defineComponent({
    name: "roomSettings",
    components: { addIcon, editIcon },
    computed: mapState(["rooms"]),
    methods: mapMutations(["pushOverlay"])
});
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
    font-family: "Raleway", sans-serif;
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
