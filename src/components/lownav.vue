<template>
    <div>
        <div class="overlay" v-if="navExpanded" @click="toggle"></div>
        <div id="popOut" v-if="showRooms || showPeople" class="pop-out">
            <div id="roomPopOut" v-if="showRooms" class="pop-out-content">
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

            <div id="personPopOut" v-if="showPeople">
                <div class="pop-out-title">Personen</div>

                <div v-for="person in DBStore.people" :key="person._id" class="pop-out-item" >
                    <input type="checkbox" :id="'c_' + person._id" :value="person._id" v-model="DBStore.taskFilter.personID" @change="DBMethods.getTasks"><label :for="'c_' + person._id">{{person.name}}</label>
                </div>
            </div>
        </div>

        <div :class="{ 'low-nav': true, 'low-nav-expanded': navExpanded }">
            <div class="container">
                <roomIcon id="roomIcon" v-if="navExpanded" class="logo clickable" @click="toggleRoomPop"/>
                <dotsIcon id="menuIcon" :class="{ 'menu-small': !navExpanded, 'menu-large': navExpanded, clickable: true }" @click="toggle"/>
                <personIcon id="personIcon" v-if="navExpanded" class="logo clickable" @click="togglePersonPop"/>
            </div>
        </div>
    </div>
</template>

<script>
import DBStore from "../stores/DBStore"

import roomIcon from "../assets/room.svg"
import dotsIcon from "../assets/dots-menu.svg"
import personIcon from "../assets/person.svg"
import settingsIcon from "../assets/settings.svg"

export default {
    name: "lownav",
    props: ['current'],
    components: { roomIcon, dotsIcon, personIcon, settingsIcon },
    data() {
        return {
            checkVals: [],
            roomID: "",

            navExpanded: false,
            showRooms: false,
            showPeople: false,

            filter: {
                personID: "",
                roomID: ""
            },

            DBStore: DBStore.data,
            DBMethods: DBStore.methods
        }
    },
    watch: {
        current: function(newVal, oldVal) {
            if(newVal == "roomFilter") {
                this.toggle();
                this.toggleRoomPop();
            } else if(newVal == "personFilter") {
                this.toggle();
                this.togglePersonPop();
            }
        }
    },
    methods: {
        toggle: function() {
            if(this.navExpanded) {
                this.showRooms = false;
                this.showPeople = false;
                this.$root.$emit("openPopOut","");
            }

            this.navExpanded = !this.navExpanded;

        },
        toggleRoomPop: function() {
            this.showRooms = !this.showRooms;
            this.showPeople = false;
        },
        togglePersonPop: function() {
            this.showPeople = !this.showPeople;
            this.showRooms = false;
        },
        openOverlay: function() {
            this.$root.$emit('openOverlay', '{"overlay": "roomSettings"}')
        }
    }
}
</script>

<style scoped>
    .overlay {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0,0,0,0.5);
        z-index: 2;
        cursor: pointer;
    }

    .pop-out {
        padding: 20px;
        max-height: 75vh;
        width: 100%;
        border-radius: 10px;

        background-color: linen;

        bottom: 8%;
        left: 50%;
        transform: translate(-50%, -60px);
        -ms-transform: translate(-50%, -60px);

        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

        position: fixed;
        z-index: 4;
        overflow-x: hidden;
    }

    @media only screen and (min-width: 350px) {
        .pop-out {
            width: 60%;
            max-width: 500px;
            min-width: 350px;
        }
    }

    .pop-out-title {
        font-size: 20px;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .pop-out-list::-webkit-scrollbar-track {
        background: linen;
    }

    .pop-out-list {
        margin-top: 10px;
        height: calc(75vh - 100px);
        width: 95%;
        overflow-y: scroll;
    }

    .pop-out-item {
        margin: 10px 20px;
        padding: 0 10px 20px 10px;
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
        z-index: 3;
        overflow-x: hidden;
        transition: bottom 300ms ease-out;
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

        transition: width 310ms ease-out;
    }

    .menu-large {
        width: 30px;
        height: 30px;
        margin: 20px;
    }

    .logo-small {
        width: 24px;
        height: 24px;

        margin-left: 10px;
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