<template>
    <div id="filterBay">
        <div style="margin-right: 5px;">Filters:</div>
        <div class="filter-item">{{ idToName(DBStore.taskFilter.roomID, DBStore.rooms) }}</div>
        <div v-for="person in DBStore.taskFilter.personID" :key="person" class="filter-item">{{ idToName(person, DBStore.people) }}</div>
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
        }
    }
}
</script>

<style scoped>
    #filterBay {
        display: flex;
        align-items: center;
        margin: 0;
    }

    .filter-item {
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

    .logo {
        width: 24px;
        height: 24px;
        margin-left: 5px;
    }

    .new-task {
        position: absolute;
        display: flex;
        align-items: center;
        right: 2%;
    }
</style>