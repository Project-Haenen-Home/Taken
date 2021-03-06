<template>
    <div class="side-nav">
        <div class="filter">
            <div class="filter-head">
                Kamers<settingsIcon
                    class="logo clickable"
                    @click="pushOverlay({ id: '', name: 'roomSettings', popOut: false })"
                />
            </div>
            <div class="filter-content">
                <select id="room" v-model="taskFilter.roomID" style="margin-top: 5px" @change="fetchTasks()">
                    <option selected value="0">Alle kamers</option>
                    <option v-for="room in rooms" :key="room._id" :value="room._id">{{ room.name }}</option>
                </select>
            </div>
        </div>
        <div class="filter">
            <div class="filter-head">Personen</div>
            <div class="filter-content">
                <div v-for="person in people" :key="person._id" class="filter-item">
                    <input
                        type="checkbox"
                        :id="'c_' + person._id"
                        :value="person._id"
                        v-model="taskFilter.personID"
                        @change="fetchTasks()"
                    /><label :for="'c_' + person._id">{{ person.name }}</label>
                </div>
            </div>
        </div>
        <div class="filter">
            <div class="filter-head">Deadline</div>
            <div class="filter-content">
                <div class="filter-item" style="display: flex; align-items: center;">
                    <input
                        type="range"
                        class="slider"
                        id="dealineSlider"
                        v-model="deadSlider"
                        @mouseup="fetchTasks()"
                        @touchend="fetchTasks()"
                        min="1"
                        max="12"
                    /><label for="dealineSlider">{{ deadComp }}</label>
                </div>
            </div>
        </div>
        <div class="filter">
            <div
                class="filter-head clickable"
                style="margin-top: 20px"
                @click="pushOverlay({ id: '', name: 'addTask', popOut: false })"
            >
                Nieuwe taak<addIcon class="logo" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapMutations, mapState } from "vuex";

import addIcon from "@/assets/icons/add.svg";
import settingsIcon from "@/assets/icons/settings.svg";

export default defineComponent({
    name: "sidenav",
    components: { addIcon, settingsIcon },
    data() {
        return {
            room: "",

            filter: {
                personID: "",
                roomID: ""
            }
        };
    },
    computed: {
        deadComp: function(): string {
            if (this.deadSlider == 1) return "1 dag";
            if (this.deadSlider <= 6) return this.deadSlider + " dagen";
            if (this.deadSlider == 7) return "1 week";
            if (this.deadSlider <= 9) return Number(this.deadSlider) - 6 + " weken";
            if (this.deadSlider == 10) return "1 maand";
            if (this.deadSlider == 11) return "2 maanden";
            return "Alle taken";
        },
        deadSlider: {
            get: function(): number {
                if (this.taskFilter.dayFilter <= 7) return this.taskFilter.dayFilter;
                if (this.taskFilter.dayFilter <= 14) return 8;
                if (this.taskFilter.dayFilter <= 21) return 9;
                if (this.taskFilter.dayFilter <= 30) return 10;
                if (this.taskFilter.dayFilter <= 60) return 11;
                return 12;
            },
            set: function(value: number) {
                if (value <= 7) this.setDayFilter(Number(value));
                else if (value == 8) this.setDayFilter(14);
                else if (value == 9) this.setDayFilter(21);
                else if (value == 10) this.setDayFilter(30);
                else if (value == 11) this.setDayFilter(60);
                else this.setDayFilter(Number.MAX_SAFE_INTEGER);
            }
        },
        ...mapState(["taskFilter", "people", "rooms"])
    },
    methods: {
        ...mapMutations(["pushOverlay", "setDayFilter", "setPersonFilter", "setRoomFilter"]),
        ...mapActions(["fetchTasks"])
    }
});
</script>

<style scoped>
.filter {
    margin-bottom: 20px;
}

.filter-head {
    font-size: 20px;
    font-weight: 700;
    font-family: "Raleway", sans-serif;
    display: flex;
    align-items: center;
    margin-bottom: 5px;
}

.filter-content {
    margin-left: 10px;
}

.filter-item {
    margin: 5px 0;
}

.slider {
    width: 80px;
    margin-right: 10px;
}

.logo {
    width: 20px;
    height: 20px;

    margin-left: 10px;
}
</style>
