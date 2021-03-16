<template>
	<div class="task">
		<div class="header">
			<div class="title-bay">
				<span style="display: flex">
					<span class="title">{{ task.name }}</span>
					<rotateIcon
						class="logo"
						v-if="task.rotate != null && task.rotate"
						style="margin-left: 10px"
					/>
				</span>
				<span class="logo-bay">
					<!-- <analyzeIcon class="logo clickable" /> -->
					<settingsIcon class="logo clickable" />
				</span>
			</div>
			<div class="under-title">
				<span>{{ task.person }}</span>
				<span>-</span>
				<span>{{ task.room }}</span>
				<span v-if="task.comment != ''">
					<span>-</span>
					<span>
						Notitie...
						<span
							class="clickable"
							@click="showComment = !showComment"
							>{{ showComment ? "(-)" : "(+)" }}</span
						>
					</span>
				</span>
			</div>
		</div>
		<div class="comment" v-if="showComment">{{ task.comment }}</div>
		<div class="grid-container">
			<div style="grid-column: 1; grid-row: 1">
				{{ dealineString(task.due) }}
			</div>
			<progressBar
				style="grid-column: 1; grid-row: 2"
				:progress="deadlineProgress(task.finished, task.period)"
			/>
			<div
				class="under-title"
				style="grid-column: 1; grid-row: 3; margin: 5px 0 0 0"
			>
				Laatst voltooid:
				{{ toDateString(task.finished) }}
			</div>

			<div class="finishItem">
				<div class="finishButton clickable">Gedaan!</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import settingsIcon from "@i/settings.svg";
import rotateIcon from "@i/rotate.svg";
// import analyzeIcon from "@i/analyze.svg";

import progressBar from "@c/progressBar.vue";

export default defineComponent({
	name: "task",
	components: { settingsIcon, rotateIcon, progressBar },
	props: ["task"],
	data() {
		return {
			showComment: false,
		};
	},
	methods: {
		dealineString(dDate: Date): string {
			if (dDate != null) {
				const nTime =
					BigInt(new Date().getTime()) / (1000n * 3600n * 24n);
				const dTime = BigInt(dDate.getTime()) / (1000n * 3600n * 24n);
				const deadline = dTime - nTime;

				if (deadline >= 2n) return `Deadline over ${deadline} dagen`;
				else if (deadline == 1n) return "Deadline is morgen";
				else if (deadline <= -2n)
					return `Deadline is ${-deadline} dagen geleden verlopen`;
				else if (deadline == -1n)
					return "Deadline is gisteren verlopen";
			}

			return "Deadline is vandaag";
		},
		deadlineProgress(fDate: Date, period: number): number {
			if (fDate == null) return 100;
			const nTime = BigInt(new Date().getTime()) / (1000n * 3600n * 24n);
			const fTime = BigInt(fDate.getTime()) / (1000n * 3600n * 24n);
			return 100 * (Number(nTime - fTime) / Number(period));
		},
		toDateString(date: Date): string {
			if (date == null) return "Nog niet voltooid";

			return date.toLocaleDateString("nl-NL", {
				weekday: "short",
				year: "numeric",
				month: "long",
				day: "numeric",
			});
		},
		finishTask(id: number) {},
	},
});
</script>

<style lang="scss" scoped>
.task {
	background: rgba(255, 255, 255, 0.25);
	box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
	-webkit-backdrop-filter: blur(4px);
	backdrop-filter: blur(4px);
	border: 1px solid rgba(255, 255, 255, 0.18);
	border-radius: 10px;

	padding: 15px;
	margin: 10px 0;
}

.header {
	padding-bottom: 10px;
}

.title-bay {
	position: relative;
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

.logo-bay {
	position: absolute;
	top: 0;
	right: 10px;
}

.under-title {
	font-size: 12px;
	color: darkslategray;
	font-style: italic;
	margin: 2.5px 0 0 5px;
}

.grid-container {
	display: grid;
	gap: 12px;
}

.logo {
	width: 24px;
	height: 24px;
	stroke: #e8f1f8;
	fill: #e8f1f8;
}

.deadline-txt {
	margin-left: 10px;
}

.comment {
	color: darkslategray;
	font-style: italic;
	margin-bottom: 10px;
}

.finishItem {
	grid-column: 2;
	grid-row: 1 / span 3;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	margin-right: 20px;
}

.finishButton {
	background: rgba(255, 255, 255, 0.25);
	box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
	-webkit-backdrop-filter: blur(4px);
	backdrop-filter: blur(4px);
	border: 1px solid rgba(255, 255, 255, 0.18);

	// border: 2px solid;
	border-radius: 5px;
	display: flex;
	justify-content: center;
	align-items: center;
	// background-color: linen;

	// height: 90%;
	height: 80px;

	width: 120px;
	// width: 90%;
	// min-width: 80px;
	// max-width: 150px;

	-webkit-user-select: none;
	user-select: none;
}
</style>
