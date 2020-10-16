<template>
    <div>
        <div class="overlay" v-if="navExpanded" @click="toggle"></div>
        <div id="popOut" v-if="showRooms || showPeople" class="pop-out">
            <roomPopOut id="roomPopOut" v-if="showRooms" />
            <personPopOut id="personPopOut" v-if="showPeople" />
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

const roomPopOut = () => import("../components/popOuts/roomPopOut.vue")
const personPopOut = () => import("../components/popOuts/personPopOut.vue")

export default {
    name: "lownav",
    props: ['current'],
    components: { roomIcon, dotsIcon, personIcon, roomPopOut, personPopOut },
    data() {
        return {
            navExpanded: false,
            showRooms: false,
            showPeople: false,

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
        }
    }
}
</script>

<style>
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

    .logo-small {
        width: 24px;
        height: 24px;

        margin-left: 10px;
    }
</style>

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

    .logo {
        width: 36px;
        height: 36px;
        margin: 17px;
    }
</style>