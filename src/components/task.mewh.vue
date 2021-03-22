<template>
	<div class="task glass">
		<div class="columns">
			<div>
				<div class="titleBar">
					<div
						class="taskTitle"
						:style="{
							marginRight: '10px',
							fontSize: `${
								task.name.length >= 20 ? '20' : '24'
							}px`,
						}"
					>
						{{ task.name }}
					</div>
					<progress-bar
						class="progress"
						:progress="deadlineProgress(task.finished, task.period)"
					/>
				</div>
				<div class="under-title"></div>
				<div style="margin: 10px 0">{{ dealineString(task.due) }}</div>
				<div class="under-title" style="margin-left: 0">
					{{ task.person }} - Laatst voltooid:
					{{ toDateString(task.finished) }}
				</div>
			</div>

			<div class="buttonField">
				<div class="glassButton">Gedaan</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import settingsIcon from "@i/settings.svg";
import rotateIcon from "@i/rotate.svg";
// import analyzeIcon from "@i/analyze.svg";

import progressBar from "@c/circularProgress.vue";

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

				if (deadline >= 1n) return `Deadline over ${deadline} dagen`;
				else if (deadline <= -2n)
					return `${-deadline} dagen geleden verlopen`;
				else if (deadline == -1n) return "gisteren verlopen";
			}

			return "Deadline is vandaag";
		},
		deadlineProgress(fDate: Date, period: bigint): number {
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
$titleSize: 24px;

.task {
	position: relative;
	border-radius: 10px;
	color: $titleColor;
	padding: 15px;
	margin: 10px 0;
}

.columns {
	display: flex;
}

.titleBar {
	display: flex;
	align-items: center;
}

.taskTitle {
	display: flex;
	justify-content: flex-start;
	font-size: $titleSize;
	font-weight: bold;
	font-family: "Noto Sans JP", sans-serif;
	// max-width: calc(100% - 80px);
	color: $titleColor;
	flex-shrink: 1;
}

.logo-bay {
	position: absolute;
	top: 0;
	right: 10px;
}

.logo {
	width: 24px;
	height: 24px;
	stroke: #e8f1f8;
	fill: #e8f1f8;
}

.comment {
	color: darkslategray;
	font-style: italic;
	margin-bottom: 10px;
}

.buttonField {
	display: flex;
	justify-content: flex-end;
	align-items: flex-end;
	flex-grow: 1;
	margin: 10px 10px 10px 0;
}

.progress {
	$wh: 40px;

	width: $wh;
	height: $wh;
	min-width: $wh;
	min-height: $wh;
}
</style>
