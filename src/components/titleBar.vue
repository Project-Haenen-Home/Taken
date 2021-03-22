<template>
	<div id="header" class="glass">
		<back-icon
			id="back"
			class="dropShadow clickable"
			@click="$router.go(-1)"
		/>
		{{ title }}
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import backIcon from "@i/back.svg";

export default defineComponent({
	name: "titleBar",
	props: ["title"],
	components: { backIcon },
	computed: {
		hasBack(): any {
			return this.$router.options.history.state.back;
		},
	},
});
</script>

<style lang="scss" scoped>
#back {
	$wh: 30px;

	position: absolute;
	left: 15px;
	top: 50%;
	transform: translate(0, -50%);
	width: $wh;
	height: $wh;
}

#header {
	position: relative;
	padding: 20px 0;
	width: 100vw;
	text-align: center;
	font-size: 30px;
	font-weight: 700;
	font-family: "Raleway", sans-serif;
	color: $titleColor;
}

@media only screen and (min-width: 700px) {
	#header {
		padding: 20px;
		height: 90px;

		font-size: 40px;
	}
}
</style>
