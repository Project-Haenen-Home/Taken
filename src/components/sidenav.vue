<template>
    <div class="side-nav">
        <div class="filter">
            <div class="filter-head">Kamers<settingsIcon class="logo clickable" @click="openOverlay" /></div>
            <div class="filter-content">
                <select id="room" v-model="DBStore.taskFilter.roomID" style="margin-top: 5px" @change="DBMethods.getTasks"><option selected value="0">Alle kamers</option><option v-for="room in DBStore.rooms" :key="room._id" :value="room._id">{{ room.name }}</option></select>
            </div>
        </div>
        <div class="filter">
            <div class="filter-head">Personen</div>
            <div class="filter-content">
                <div v-for="person in DBStore.people" :key="person._id" class="filter-item"><input type="checkbox" :id="'c_' + person._id" :value="person._id" v-model="DBStore.taskFilter.personID" @change="DBMethods.getTasks"><label :for="'c_' + person._id">{{person.name}}</label></div>
            </div>
        </div>
        <div class="filter">
            <div class="filter-head">Deadline</div>
            <div class="filter-content">
                <div class="filter-item" style="display: flex; align-items: center;"><input type="range" class="slider" id="dealineSlider" v-model="deadVal" @mouseup="filterValue" min="1" max="12"><label for="dealineSlider">{{ deadComp }}</label></div>
            </div>
        </div>
        <div class="filter">
            <div class="filter-head clickable" style="margin-top: 20px" @click="openAdder">Nieuwe taak<addIcon class="logo"/></div>
        </div>
    </div>
</template>

<script>
import DBStore from "../stores/DBStore"

import addIcon from "../assets/add.svg"
import settingsIcon from "../assets/settings.svg"

export default {
    name: "sidenav",
    components: { addIcon, settingsIcon },
    data() {
        return {
            testVals: [],
            deadVal: 12,
            room: "",

            filter: {
                personID: "",
                roomID: ""
            },

            DBStore: DBStore.data,
            DBMethods: DBStore.methods
        }
    },
    computed: {
        deadComp: function() {
            if(this.deadVal == 1) {
                DBStore.data.taskFilter.dayFilter = 1;
                return "1 dag";
            }
            if(this.deadVal <= 6) {
                DBStore.data.taskFilter.dayFilter = this.deadVal;
                return this.deadVal + " dagen";
            }
            if(this.deadVal == 7) {
                DBStore.data.taskFilter.dayFilter = 7;
                return "1 week";
            } 
            if(this.deadVal <= 9) {
                DBStore.data.taskFilter.dayFilter = (Number(this.deadVal) - 6) * 7;
                return (Number(this.deadVal) - 6) + " weken";
            }
            if(this.deadVal == 10) {
                DBStore.data.taskFilter.dayFilter = 30;
                return "1 maand";
            }
            if(this.deadVal == 11) {
                DBStore.data.taskFilter.dayFilter = 60;
                return "2 maanden";
            }
            if(this.deadVal == 12) {
                DBStore.data.taskFilter.dayFilter = Number.MAX_SAFE_INTEGER;
                return "Alle taken"; 
            }
        }
    },
    methods: {
        openOverlay: function() {
            this.$root.$emit('openOverlay', '{"overlay": "roomSettings"}')
        },
        openAdder: function() {
            this.$root.$emit('openOverlay', '{"overlay": "addTask"}');
        },
        filterValue: function() {
            DBStore.methods.getTasks();
        }
    }
}
</script>

<style scoped>
    .side-nav {
        position: fixed;
        z-index: 1;
        overflow-x: hidden;
        padding-top: 20px;
    }

    .filter {
        margin-bottom: 20px;
    }

    .filter-head {
        font-size: 20px;
        font-weight: 700;
        font-family: 'Raleway', sans-serif;
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