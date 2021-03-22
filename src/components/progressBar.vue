<template>
	<div class="progressBar">
		<div
			class="progress"
			:style="
				'width: ' +
				progressClamped +
				'%; background-color: ' +
				color +
				';'
			"
		></div>
	</div>
</template>

<script>
export default {
	name: "progressbar",
	props: ["progress"],
	computed: {
		progressClamped() {
			return Math.max(0, Math.min(100, this.progress));
		},
		color() {
			if (this.progress < 120) {
				if (this.progress < 90) {
					if (this.progress < 60) {
						if (this.progress < 30) {
							return "#85fa00";
						} else return "#e9fa00";
					} else return "#fad400";
				} else return "#faab00";
			} else return "#be1c07";
		},
	},
};
</script>

<style scoped>
.progressBar {
	width: 200px;
	height: 20px;
	border: 0px solid;

	border-radius: 5px;
}

.progress {
	-webkit-filter: drop-shadow(1px 3px 2px rgba(135, 86, 31, 0.295));
	filter: drop-shadow(1px 3px 2px rgba(102, 68, 68, 0.295));
	border-radius: 5px;
	height: 100%;
	width: 0%;
	background-color: #be1c07;
}
</style>
