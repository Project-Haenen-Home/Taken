<template>
    <div>
        <div class="overlay" v-if="getOverlay.popOut" @click="popAllOverlay()"></div>
        <div id="popOut" v-if="getOverlay.popOut && getOverlay.name != 'expandLowNav'" class="pop-out">
            <roomPopOut id="roomPopOut" v-if="getOverlay.name == 'roomPopOut'" />
            <personPopOut id="personPopOut" v-if="getOverlay.name == 'personPopOut'" />
        </div>

        <div :class="{ 'low-nav': true, 'low-nav-expanded': getOverlay.popOut }">
            <div class="container">
                <roomIcon
                    id="roomIcon"
                    v-if="getOverlay.popOut"
                    class="logo clickable"
                    @click="pushOverlay({ id: '', name: 'roomPopOut', popOut: true })"
                />
                <dotsIcon
                    id="menuIcon"
                    :class="{ 'menu-small': !getOverlay.popOut, 'menu-large': getOverlay.popOut, clickable: true }"
                    @click="toggle"
                />
                <personIcon
                    id="personIcon"
                    v-if="getOverlay.popOut"
                    class="logo clickable"
                    @click="pushOverlay({ id: '', name: 'personPopOut', popOut: true })"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from "vue";
import { mapGetters, mapMutations } from "vuex";

import roomIcon from "@/assets/icons/room.svg";
import dotsIcon from "@/assets/icons/dots-menu.svg";
import personIcon from "@/assets/icons/person.svg";

const status = { loading: false };

const roomPopOut = defineAsyncComponent(() => {
    status.loading = true;
    return import("@/components/editors/roomPopOut.vue").then((module) => {
        status.loading = false;
        return module;
    });
});

const personPopOut = defineAsyncComponent(() => {
    status.loading = true;
    return import("@/components/editors/personPopOut.vue").then((module) => {
        status.loading = false;
        return module;
    });
});

export default defineComponent({
    name: "lownav",
    components: { roomIcon, dotsIcon, personIcon, roomPopOut, personPopOut },
    computed: mapGetters(["getOverlay"]),
    methods: {
        toggle: function() {
            if (this.getOverlay.popOut) {
                this.popAllOverlay();
            } else {
                this.pushOverlay({ id: "", name: "expandLowNav", popOut: true });
            }
        },
        ...mapMutations(["pushOverlay", "popAllOverlay"])
    }
});
</script>

<style lang="scss">
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

<style lang="scss" scoped>
.overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
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
    -ms-transform: translate(-50%, 0);

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
