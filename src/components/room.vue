<template>
	<div class="room">
		<div class="title">{{ room.name }}</div>
		<div class="under-title">
			Deelnemers:
			<span v-for="(person, index) in room.people" :key="person.id">
				{{
					`${person.name}${
						room.people.length - 1 != index ? " - " : ""
					}`
				}}
			</span>
		</div>
		<div class="stats">
			<span style="display: flex" v-if="room.numExpired > 0">
				<span>{{ room.numExpired }}</span>
				<span>
					<crit-icon
						class="icon"
						style="fill: rgba(219, 26, 26, 0.8)"
					/>
				</span>
			</span>
			<span style="display: flex" v-if="room.numDue > 0">
				<span>{{ room.numDue }}</span>
				<span>
					<crit-icon
						class="icon"
						style="fill: rgba(236, 215, 32, 0.863)"
					/>
				</span>
			</span>
		</div>
		<div class="enterField">
			<div class="enterButton clickable">Betreed</div>
		</div>
		<settingsIcon class="icon clickable settings" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import critIcon from "@i/critical.svg";
import settingsIcon from "@i/settings.svg";

export default defineComponent({
	name: "room",
	props: ["room"],
	components: { critIcon, settingsIcon },
});
</script>

<style lang="scss">
.room {
	position: relative;
	background: rgba(255, 255, 255, 0.25);
	box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
	-webkit-backdrop-filter: blur(4px);
	backdrop-filter: blur(4px);
	border: 1px solid rgba(255, 255, 255, 0.18);
	border-radius: 10px;

	padding: 15px;
	margin: 10px 0;
}

.title {
	display: flex;
	justify-content: flex-start;
	font-size: 24px;
	font-weight: bold;
	font-family: "Raleway", sans-serif;
	max-width: calc(100% - 80px);
	color: $titleColor;
}

.under-title {
	font-size: 12px;
	color: rgb(61, 47, 79);
	font-style: italic;
	margin: 2.5px 0 0 3px;
}

.icon {
	$wh: 30px;

	width: $wh;
	height: $wh;

	-webkit-filter: drop-shadow(1px 3px 2px rgba(135, 31, 31, 0.527));
	filter: drop-shadow(1px 3px 2px rgba(135, 31, 31, 0.295));
}

.icon.settings {
	position: absolute;
	top: 10px;
	right: 15px;
	fill: white;
}

.stats {
	color: $titleColor;
	font-size: 26px;

	width: auto;
	height: 57px;

	padding: 10px;

	display: flex;
	justify-content: center;

	span {
		margin: 0 15px;

		span {
			margin: 0 5px;
		}
	}
}

.enterField {
	display: flex;
	justify-content: center;
}

@media only screen and (min-width: 400px) {
	.enterField {
		position: absolute;
		right: 50px;
		bottom: 20px;
	}

	.stats {
		justify-content: flex-start;
		width: 200px;

		span {
			margin: 0 15px 0 0;

			span {
				margin: 0 5px;
			}
		}
	}
}

.enterButton {
	background: rgba(255, 255, 255, 0.25);
	box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
	-webkit-backdrop-filter: blur(4px);
	backdrop-filter: blur(4px);
	border: 1px solid rgba(255, 255, 255, 0.18);

	color: white;
	border-radius: 5px;
	display: flex;
	justify-content: center;
	align-items: center;
	// background-color: linen;

	// height: 90%;
	height: 50px;

	width: 120px;
	// width: 90%;
	// min-width: 80px;
	// max-width: 150px;

	-webkit-user-select: none;
	user-select: none;
}
</style>
