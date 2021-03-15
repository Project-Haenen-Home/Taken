<template>
	<title-bar title="Taken @ HaenenHome" />
	<div id="main">
		<div id="content">
			<!-- <filter-bay id="filterBay" /> -->
			<div id="wrap">
				<div id="taskContainer">
					<room v-for="room in rooms" :key="room.id" :room="room" />
					<!-- <task v-for="task in tasks" :key="task.id" :task="task" /> -->
				</div>
			</div>
		</div>
		<!-- <sidenav id="sidenav" /> -->
		<!-- <lownav id="lownav" /> -->
	</div>
	<div id="background"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import titleBar from "@c/titleBar.vue";
import task from "@c/task.vue";
import room from "@c/room.vue";

// import * as z from "zod";
import { jsonParseNXT, Room, Task } from "@/typedefs";

export default defineComponent({
	name: "App",
	components: { titleBar, task, room },
	data() {
		return {
			rooms: Array<Room>(),
		};
	},
	created() {
		const fetchRooms = () => {
			fetch("http://wolleserver.local:2600/api/rooms/taskStats")
				.then((resp) => resp.text())
				.then((json: string) => {
					this.rooms = jsonParseNXT(json);
				});
		};

		fetchRooms();
	},
});
</script>

<style lang="scss">
@import url("@s/common.css");
</style>

<style lang="scss" scoped>
#main {
	display: flex;
	height: calc(100vh - 90px);
}

#content {
	flex: 1;
	display: flex;
	flex-flow: column;
}

#sidenav {
	display: none;
	width: 275px;
	padding: 20px 0 0 20px;
	border-left: 1px solid grey;
}

#wrap {
	padding: 0 10px 0 10px;
	overflow-y: scroll;
}

#wrap::after {
	content: " ";
	height: 30px;
	display: block;
}

@media only screen and (min-width: 740px) {
	#taskContainer {
		padding: 0 20px 0 20px;
		display: grid;
		gap: 0 15px;
		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
	}
}

@media only screen and (min-width: 1150px) {
	#filterBay {
		display: none;
	}

	#lownav {
		display: none;
	}

	#sidenav {
		display: block;
	}
}

#background {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: -1;
	background-image: linear-gradient(
		180deg,
		#2f6ed3 5%,
		#5095e4 20%,
		#5095e4 60%,
		#2f6ed3 95%
	);
}
</style>
