<template>
	<title-bar title="Taken @ HaenenHome" />
	<div id="main">
		<router-view></router-view>
	</div>
	<div id="background"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import titleBar from "@c/titleBar.vue";

export default defineComponent({
	name: "App",
	components: { titleBar },
});
</script>

<style lang="scss">
@import url("@s/common.css");

.content {
	flex: 1;
	display: flex;
	flex-flow: column;
}

.wrap {
	padding: 0 10px 0 10px;
	overflow-y: scroll;
	flex: 1 1 auto;
}

.wrap::after {
	content: " ";
	height: 30px;
	display: block;
}
</style>

<style lang="scss" scoped>
#main {
	display: flex;
	height: calc(100vh - 90px);
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
