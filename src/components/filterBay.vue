<template>
    <div id="filterBay">
        <div style="margin: 12px 5px 0 0;">Filters:</div>
        <div class="filters">
            <div class="filter-item clickable" @click="$root.$emit('openPopOut', 'roomFilter')">{{ idToName(DBStore.taskFilter.roomID, DBStore.rooms) }}</div>
            <div v-for="person in DBStore.taskFilter.personID" :key="person" class="filter-item clickable" @click="deletePerson(person)">{{ idToName(person, DBStore.people) }}</div>
            <div class="filter-item clickable" style="width: 120px; text-align: center;" @click="toggleSliderPop">{{ deadComp }}<div id="sliderPop" class="hidden"><input type="range" class="slider" id="dealineSlider" v-model="DBStore.deadSlider" @mouseup="filterValue" min="1" max="12"></div></div>
        </div>
        <div class="new-task clickable" @click="openAdder">Nieuwe taak<addIcon class="logo"/></div>
    </div>
</template>

<script>
import DBStore from "../stores/DBStore"

import addIcon from "../assets/add.svg"

export default {
    name: "filterBay",
    components: { addIcon },
    data() {
        return {
            DBStore: DBStore.data
        }
    },
    computed: {
        deadComp: function() {
            if(DBStore.data.deadSlider == 1) {
                DBStore.data.taskFilter.dayFilter = 1;
                return "1 dag";
            }
            if(DBStore.data.deadSlider <= 6) {
                DBStore.data.taskFilter.dayFilter = DBStore.data.deadSlider;
                return DBStore.data.deadSlider + " dagen";
            }
            if(DBStore.data.deadSlider == 7) {
                DBStore.data.taskFilter.dayFilter = 7;
                return "1 week";
            } 
            if(DBStore.data.deadSlider <= 9) {
                DBStore.data.taskFilter.dayFilter = (Number(DBStore.data.deadSlider) - 6) * 7;
                return (Number(DBStore.data.deadSlider) - 6) + " weken";
            }
            if(DBStore.data.deadSlider == 10) {
                DBStore.data.taskFilter.dayFilter = 30;
                return "1 maand";
            }
            if(DBStore.data.deadSlider == 11) {
                DBStore.data.taskFilter.dayFilter = 60;
                return "2 maanden";
            }
            if(DBStore.data.deadSlider == 12) {
                DBStore.data.taskFilter.dayFilter = Number.MAX_SAFE_INTEGER;
                return "Geen limiet"; 
            }
        }
    },
    methods: {
        idToName: function(id, arr) {
            if(id == "0") return "Alle kamers";
            for (let el of arr) {
                if (el._id === id) {
                    return el.name;
                }
            }
        },
        openAdder: function() {
            this.$root.$emit('openOverlay', '{"overlay": "addTask"}');
        },
        deletePerson: function(id) {
            const index = DBStore.data.taskFilter.personID.indexOf(id);
            if (index > -1) {
                DBStore.data.taskFilter.personID.splice(index, 1);
                DBStore.methods.getTasks();
            }
        },
        filterValue: function() {
            DBStore.methods.getTasks();
        },
        toggleSliderPop: function() {
            document.querySelector('#sliderPop').classList.toggle('hidden');
        }
    }
}
</script>

<style scoped>
    #filterBay {
        position: relative;
        display: flex;
        align-items: flex-start;
        margin: 0;
    }

    .filters {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        max-width: calc(100% - 130px - 1%);;
    }

    .filter-item {
        position: relative;
        border: 2px solid;
        border-radius: 5px;
        padding: 5px;
        margin: 5px 3px;
    }

    @media only screen and (min-width: 1400px) {
        #filterBay {
            display: none;
        }
    }

    #sliderPop {
        position: absolute;
        top: 0;
        left: 50%;
        border: 2px solid;
        border-radius: 5px;
        background-color: #ffffff;
        padding: 5px;
        transform: translate(-50%, 40px);
        -ms-transform: translate(-50%, 0);
        z-index: 1;
    }

    .logo {
        width: 24px;
        height: 24px;
        margin-left: 5px;
    }

    .new-task {
        position: absolute;
        display: flex;
        align-items: center;
        top: 0;
        right: 0;
        width: 130px;
        margin: 10px 3px;
    }
</style>