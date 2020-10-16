<template>
    <div>
        <div class="pop-out-title">Personen</div>

        <div v-for="person in DBStore.people" :key="person._id" class="pop-out-item" >
            <input type="checkbox" :id="'c_' + person._id" :value="person._id" v-model="DBStore.taskFilter.personID" @change="DBMethods.getTasks"><label :for="'c_' + person._id">{{person.name}}</label>
        </div>
    </div>
</template>

<script>
import DBStore from "../../stores/DBStore"

export default {
    name: "personPopOut",
    data() {
        return {
            DBStore: DBStore.data,
            DBMethods: DBStore.methods
        }
    }
}
</script>