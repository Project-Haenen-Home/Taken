<template>
	<div class="wrap">
		<div id="roomContainer">
			<room v-for="room in rooms" :key="room.id" :room="room" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import room from "@c/room.vue";

import { jsonParseNXT, Room } from "@/typedefs";

export default defineComponent({
	name: "home",
	components: { room },
	data() {
		return {
			rooms: Array<Room>(),
		};
	},
	created() {
		const fetchRooms = () => {
			fetch("http://192.168.2.210:2600/api/rooms/taskStats")
				.then((resp) => resp.text())
				.then((json: string) => {
					this.rooms = jsonParseNXT(json);
				});
		};

		fetchRooms();
	},
});
</script>

<style>
@media only screen and (min-width: 740px) {
	#roomContainer {
		padding: 0 20px 0 20px;
		display: grid;
		gap: 0 15px;
		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
	}
}
</style>
