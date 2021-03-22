<template>
	<div class="wrap">
		<div id="roomName">{{ room.name }}</div>
		<div id="taskContainer">
			<task v-for="task in tasks" :key="task.id" :task="task" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import task from "@c/task.vue";

import { jsonParseNXT, Task, Room } from "@/typedefs";

export default defineComponent({
	name: "home",
	components: { task },
	data() {
		return {
			room: new Object() as Room,
			tasks: Array<Task>(),
		};
	},
	created() {
		fetch(`http://192.168.2.210:2600/api/rooms/${this.$route.params.id}`)
			.then((resp) => resp.text())
			.then((json: string) => {
				this.room = jsonParseNXT(json);
			});
		fetch(
			`http://192.168.2.210:2600/api/tasks?roomID=${this.$route.params.id}`
		)
			.then((resp) => resp.text())
			.then((json: string) => {
				this.tasks = jsonParseNXT(json);
			});
	},
});
</script>

<style lang="scss" scoped>
#roomName {
	color: $titleColor;
	font-size: 28px;
	font-weight: bold;
	font-family: "Noto Sans JP", sans-serif;
	margin: 15px 0 2.5px 10px;
}

@media only screen and (min-width: 740px) {
	#taskContainer {
		padding: 0 20px 0 20px;
		display: grid;
		gap: 0 15px;
		grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
	}
}
</style>
