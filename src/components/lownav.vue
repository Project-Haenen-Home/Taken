<template>
    <div class="low-nav">
        <div class="container">
            <roomIcon id="roomIcon" class="logo clickable hidden"/>
            <dotsIcon id="menuIcon" class="menu-small clickable" @click="toggle"/>
            <personIcon id="personIcon" class="logo clickable hidden"/>
        </div>
    </div>
</template>

<script>
import roomIcon from "../assets/room.svg"
import dotsIcon from "../assets/dots-menu.svg"
import personIcon from "../assets/person.svg"

export default {
    name: "lownav",
    components: { roomIcon, dotsIcon, personIcon },
    methods: {
        toggle: function() {
            const lowNav = document.querySelector(".low-nav");
            const room = document.querySelector("#roomIcon");
            const menu = document.querySelector("#menuIcon");
            const person = document.querySelector("#personIcon");

            lowNav.classList.toggle("low-nav-expanded");
            room.classList.toggle("hidden");
            menu.classList.toggle("menu-large");
            person.classList.toggle("hidden");
        }
    }
}
</script>

<style scoped>
    .low-nav {
        border-radius: 10px;

        background-color: linen;

        height: 40px;
        
        bottom: 2%;
        left: 50%;
        transform: translate(-50%, 0);
        -ms-transform: translate(-50%,0);

        box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.4), 0 8px 20px 3px rgba(0, 0, 0, 0.3);
        
        position: fixed;
        z-index: 1;
        overflow-x: hidden;
    }

    .low-nav-expanded {
        height: 54px;
        bottom: 5%;
    }

    .container {
        display: flex;
        justify-content: space-around;
    }

    .menu-small {
        width: 20px;
        height: 20px;
        margin: 10px;
    }

    .menu-large {
        width: 24px;
        height: 24px;
        margin: 15px;
    }

    .logo {
        width: 30px;
        height: 30px;
        margin: 12px;
    }

    .clickable {
        cursor: pointer;
    }

    .hidden {
        display: none;
    }
</style>