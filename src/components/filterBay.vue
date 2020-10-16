<template>
    <div id="filterBay">
        <div class="overlay" v-if="showSlider" @click="showSlider = false"></div>
        <div style="margin: 12px 5px 0 0;">Filters:</div>
        <div class="filters">
            <div class="filter-item clickable" @click="$root.$emit('openPopOut', 'roomFilter')">{{ idToName(DBStore.taskFilter.roomID, DBStore.rooms) }}</div>
            <div v-for="person in DBStore.taskFilter.personID" :key="person" class="filter-item clickable" @click="deletePerson(person)">{{ idToName(person, DBStore.people) }}</div>
            <div style="position: relative; width: 120px;">
                <div class="filter-item clickable" style="text-align: center;" @click="showSlider = true">{{ deadComp }}</div>
                <div id="sliderPop" v-if="showSlider"><input type="range" class="slider" id="dealineSlider" v-model="DBStore.deadSlider" @mouseup="filterValue" @touchend="filterValue" min="1" max="12"></div>
            </div>
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
            showSlider: false,

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
        }
    }
}
</script>

<style scoped>
    #filterBay {
        position: sticky;
        position: -webkit-sticky;
        display: flex;
        align-items: flex-start;
        margin: 0;
        top: 0;
        background: white;
        z-index: 1;
    }

    .filters {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        width: 100%;
    }

    .filter-item {
        position: relative;
        border: 2px solid;
        border-radius: 5px;
        padding: 5px;
        margin: 5px 3px;
    }

    @media only screen and (min-width: 1025px) {
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
        z-index: 10;
    }

    .logo {
        width: 24px;
        height: 24px;
        margin-left: 5px;
    }

    .new-task {
        display: flex;
        align-items: center;
        min-width: 120px;
        margin: 10px 3px;
        font-size: 14px;
    }

    .overlay {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0,0,0,0.2);
        z-index: 9;
        cursor: pointer;
    }

</style>