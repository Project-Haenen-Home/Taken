<template>
    <div class="side-nav">
        <div class="filter">
            <div class="filter-head">Personen</div>
            <div class="filter-content">
                <div v-for="person in people" :key="person._id" class="filter-item"><input type="checkbox" :id="'c_' + person._id" :value="person._id"><label :for="'c_' + person._id">{{person.name}}</label></div>
            </div>
        </div>
        <div class="filter">
            <div class="filter-head">Deadline</div>
            <div class="filter-content">
                <div class="filter-item"><input type="range" class="slider" id="dealineSlider" v-model="deadVal" min="1" max="31"><label for="dealineSlider">{{ deadComp }}</label></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "sidenav",
    props: ['people'],
    data() {
        return {
            deadVal: 7
        }
    },
    computed: {
        deadComp: function() {
            if(this.deadVal == 1) return "1 dag";
            if(this.deadVal >= 30) return "1 maand";
            if((this.deadVal % 7) == 0) {
                if((this.deadVal / 7) == 1) return "1 week"
                return (this.deadVal / 7) + " weken";
            } 
            return this.deadVal + " dagen";
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
    }

    .filter-content {
        margin-left: 10px;
    }

    .filter-item {
        margin: 5px 0;
    }

    .slider {
        width: 100px;
        margin-right: 10px;
    }
</style>