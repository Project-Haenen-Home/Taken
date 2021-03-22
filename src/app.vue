<template>
	<title-bar title="Taken @ HaenenHome" />
	<div id="main">
		<div id="content">
			<router-view></router-view>
		</div>
	</div>
	<div id="background"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import titleBar from "@c/titleBar.vue";

export default defineComponent({
	name: "App",
	components: { titleBar },
	computed: {
		r() {
			return this.$router;
		},
	},
	watch: {
		r() {
			console.log(this.r.options.history.state.back);
		},
	},
});
</script>

<style lang="scss">
@import url("@s/common.css");
@import url("@s/elements.css");
@import url("@s/layout.css");
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
