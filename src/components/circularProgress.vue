<template>
	<svg
		class="dropShadow"
		width="120"
		height="120"
		viewBox="0 0 120.01 120.01"
	>
		<circle
			ref="ring"
			class="ring"
			:stroke="color"
			stroke-width="10"
			:r="radius"
			cx="60"
			cy="60"
			:style="{ strokeDasharray: circum, strokeDashoffset: offset }"
		/>
	</svg>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { constrain } from "@/functions";

export default defineComponent({
	name: "circularProgress",
	props: ["progress"],
	data() {
		return {
			radius: 40,
		};
	},
	computed: {
		circum(): string {
			const c = this.radius * 2 * Math.PI;
			return `${c} ${c}`;
		},
		offset(): number {
			const c = this.radius * 2 * Math.PI;
			const p = constrain(this.progress, 1, 100);
			const offset = c - (p / 100) * c;
			return offset;
		},
		color(): string {
			const p = constrain(this.progress, 1, 100);
			if (p < 120) {
				if (p < 90) {
					if (p < 60) {
						if (p < 30) {
							return "#85fa00";
						} else return "#e9fa00";
					} else return "#fad400";
				} else return "#faab00";
			} else return "#be1c07";
		},
	},
});
</script>

<style lang="scss" scoped>
.ring {
	fill: transparent;

	transition: stroke-dashoffset 0.35s;
	transform: rotate(-90deg);
	transform-origin: 50% 50%;
}
</style>
