<template>
    <div>
        <div class="pop-out-title">
            <div>Kamers</div>
            <settingsIcon
                class="logo-small clickable"
                @click="pushOverlay({ id: '', name: 'roomSettings', popOut: false, mustReturn: true })"
            />
        </div>

        <div class="pop-out-list">
            <div class="pop-out-item">
                <input
                    type="radio"
                    id="r_all"
                    name="room"
                    v-model="taskFilter.roomID"
                    value="0"
                    @change="fetchTasks"
                    checked
                /><label for="r_all">Alle kamers</label>
            </div>

            <div v-for="room in rooms" :key="room._id" class="pop-out-item">
                <input
                    type="radio"
                    :id="'r_' + room._id"
                    name="room"
                    v-model="taskFilter.roomID"
                    :value="room._id"
                    @change="fetchTasks"
                /><label :for="'r_' + room._id">{{ room.name }}</label>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapMutations, mapState } from "vuex";

import settingsIcon from "@/assets/icons/settings.svg";

export default defineComponent({
    name: "roomPopOut",
    components: { settingsIcon },
    computed: mapState(["taskFilter", "rooms"]),
    methods: { ...mapMutations(["pushOverlay"]), ...mapActions(["fetchTasks"]) }
});
</script>
