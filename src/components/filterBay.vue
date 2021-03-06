<template>
    <div>
        <div id="bay">
            <div class="overlay" v-if="showSlider" @click="showSlider = false"></div>
            <div style="margin: 12px 5px 0 0;">Filters:</div>
            <div class="filters">
                <div class="filter-item clickable" @click="pushOverlay({ id: '', name: 'roomPopOut', popOut: true })">
                    {{ idToName(taskFilter.roomID, rooms) }}
                </div>
                <div
                    v-for="person in taskFilter.personID"
                    :key="person"
                    class="filter-item clickable"
                    @click="deletePersonFilter(person)"
                >
                    {{ idToName(person, people) }}
                </div>
                <div style="position: relative; width: 120px;">
                    <div class="filter-item clickable" style="text-align: center;" @click="showSlider = true">
                        {{ deadComp }}
                    </div>
                    <div id="sliderPop" v-if="showSlider">
                        <input
                            type="range"
                            class="slider"
                            id="dealineSlider"
                            v-model="deadSlider"
                            @mouseup="fetchTasks()"
                            @touchend="fetchTasks()"
                            min="1"
                            max="12"
                        />
                    </div>
                </div>
            </div>
            <div class="new-task clickable" @click="pushOverlay({ id: '', name: 'addTask', popOut: false })">
                Nieuwe taak<addIcon class="logo" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapMutations, mapState } from "vuex";
import { PairIDName } from "@/common/types";

import addIcon from "@/assets/icons/add.svg";

export default defineComponent({
    name: "filterBay",
    components: { addIcon },
    data() {
        return {
            showSlider: false
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
        ...mapState(["taskFilter", "rooms", "people"])
    },
    methods: {
        idToName(id: string, array: PairIDName[]) {
            if (id == "0") return "Alle kamers";
            const obj = array.find((el) => el._id == id);
            return obj?.name != undefined ? obj.name : "";
        },
        ...mapMutations(["setDayFilter", "pushOverlay"]),
        ...mapActions(["fetchTasks", "deletePersonFilter"])
    }
});
</script>

<style scoped>
#bay {
    display: flex;
    align-items: flex-start;
    margin: 0;
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

#sliderPop {
    position: absolute;
    top: 0;
    left: 50%;
    border: 1.2px solid;
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
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 9;
    cursor: pointer;
}
</style>
