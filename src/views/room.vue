<template>
	<div class="content">
		<div class="wrap">
			<div id="taskContainer">
				<task v-for="task in tasks" :key="task.id" :task="task" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import task from "@c/task.vue";

import { jsonParseNXT, Task } from "@/typedefs";

export default defineComponent({
	name: "home",
	components: { task },
	data() {
		return {
			tasks: Array<Task>(),
		};
	},
	created() {
		const fetchRooms = () => {
			fetch(
				`http://192.168.2.210:2600/api/tasks?roomID=${this.$route.params.id}`
			)
				.then((resp) => resp.text())
				.then((json: string) => {
					this.tasks = jsonParseNXT(json);
				});
		};

		fetchRooms();
	},
});
</script>

<style>
@media only screen and (min-width: 740px) {
	#taskContainer {
		padding: 0 20px 0 20px;
		display: grid;
		gap: 0 15px;
		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
	}
}
</style>
