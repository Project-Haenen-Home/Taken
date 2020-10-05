<template>
    <div>
        <div class="pop-out hidden">
            <div id="roomPopOut" class="hidden">
                <div class="pop-out-title">Kamers</div>
                <div class="pop-out-item clickable" @click="filterByRoom('')">Alle kamers</div>
                <div v-for="room in DBStore.rooms" :key="room._id" class="pop-out-item clickable" @click="filterByRoom(room._id)">{{ room.name }}</div>
            </div>
            <div id="personPopOut" class="hidden">
                <div class="pop-out-title">Personen</div>
                <div v-for="person in DBStore.people" :key="person._id" class="pop-out-item" ><input type="checkbox" :id="'c_' + person._id" :value="person._id" v-model="checkVals" @change="filterByPerson"><label :for="'c_' + person._id">{{person.name}}</label></div>
            </div>
        </div>
        <div class="low-nav">
            <div class="container">
                <roomIcon id="roomIcon" class="logo clickable hidden" @click="toggleRoomPop"/>
                <dotsIcon id="menuIcon" class="menu-small clickable" @click="toggle"/>
                <personIcon id="personIcon" class="logo clickable hidden" @click="togglePersonPop"/>
            </div>
        </div>
    </div>
</template>

<script>
import DBStore from "../stores/DBStore"

import roomIcon from "../assets/room.svg"
import dotsIcon from "../assets/dots-menu.svg"
import personIcon from "../assets/person.svg"

export default {
    name: "lownav",
    components: { roomIcon, dotsIcon, personIcon },
    data() {
        return {
            checkVals: [],

            filter: {
                personID: "",
                roomID: ""
            },

            DBStore: DBStore.data
        }
    },
    methods: {
        toggle: function() {
            const lowNav = document.querySelector(".low-nav");
            const room = document.querySelector("#roomIcon");
            const menu = document.querySelector("#menuIcon");
            const person = document.querySelector("#personIcon");
            const popOut = document.querySelector(".pop-out");
            const roomPopOut = document.querySelector("#roomPopOut");
            const personPopOut = document.querySelector("#personPopOut");

            if(lowNav.classList.contains("low-nav-expanded")) {
                popOut.classList.add("hidden");
                roomPopOut.classList.add("hidden");
                personPopOut.classList.add("hidden");
            }
            lowNav.classList.toggle("low-nav-expanded");
            room.classList.toggle("hidden");
            menu.classList.toggle("menu-large");
            person.classList.toggle("hidden");
        },
        toggleRoomPop: function() {
            const popOut = document.querySelector(".pop-out");
            const roomPopOut = document.querySelector("#roomPopOut");
            const personPopOut = document.querySelector("#personPopOut");

            if(personPopOut.classList.contains("hidden")) popOut.classList.toggle("hidden");
            else personPopOut.classList.add("hidden");
            roomPopOut.classList.toggle("hidden");
        },
        togglePersonPop: function() {
            const popOut = document.querySelector(".pop-out");
            const roomPopOut = document.querySelector("#roomPopOut");
            const personPopOut = document.querySelector("#personPopOut");

            if(roomPopOut.classList.contains("hidden")) popOut.classList.toggle("hidden");
            else roomPopOut.classList.add("hidden");
            personPopOut.classList.toggle("hidden");
        },
        filterByPerson: function() {
            this.filter.personID = this.checkVals.join('|');
            DBStore.methods.getTasks(this.filter);
        },
        filterByRoom:  function(id) {
            this.filter.roomID = id;
            DBStore.methods.getTasks(this.filter);
            this.toggle();
        }
    }
}
</script>

<style scoped>
    .pop-out {
        padding: 20px;
        width: 60%;
        border-radius: 10px;

        background-color: linen;

        bottom: 8%;
        left: 50%;
        transform: translate(-50%, -60px);
        -ms-transform: translate(-50%, -60px);

        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

        position: fixed;
        z-index: 1;
        overflow-x: hidden;
    }

    .pop-out-title {
        font-size: 20px;
        font-weight: 700;
    }

    .pop-out-item {
        margin: 10px 20px;
        padding: 10px;
    }

    .low-nav {
        border-radius: 10px;

        background-color: linen;

        height: 44px;
        
        bottom: 3%;
        left: 50%;
        transform: translate(-50%, 0);
        -ms-transform: translate(-50%,0);

        box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.4), 0 8px 20px 3px rgba(0, 0, 0, 0.3);
        
        position: fixed;
        z-index: 1;
        overflow-x: hidden;
    }

    .low-nav-expanded {
        height: 70px;
        bottom: 8%;
    }

    .container {
        display: flex;
        justify-content: space-around;
    }

    .menu-small {
        width: 24px;
        height: 24px;
        margin: 10px;
    }

    .menu-large {
        width: 30px;
        height: 30px;
        margin: 20px;
    }

    .logo {
        width: 36px;
        height: 36px;
        margin: 17px;
    }

    .clickable {
        cursor: pointer;
    }

    .hidden {
        display: none;
    }
</style>