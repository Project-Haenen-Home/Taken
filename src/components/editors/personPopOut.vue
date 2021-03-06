<template>
    <div>
        <div class="pop-out-title">Personen</div>

        <div v-for="person in people" :key="person._id" class="pop-out-item">
            <input
                type="checkbox"
                :id="'c_' + person._id"
                :value="person._id"
                v-model="taskFilter.personID"
                @change="fetchTasks"
            /><label :for="'c_' + person._id">{{ person.name }}</label>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";

export default defineComponent({
    name: "personPopOut",
    computed: mapState(["taskFilter", "people"]),
    methods: mapActions(["fetchTasks"])
});
</script>
