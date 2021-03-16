import Home from "@v/home.vue";
import { defineAsyncComponent } from "vue";
const Room = defineAsyncComponent(() => import("@v/room.vue"));

export default [
	{
		path: "/",
		redirect: "/home",
	},
	{
		path: "/home",
		component: Home,
	},
	{
		path: "/room/:id",
		component: Room,
	},
];
