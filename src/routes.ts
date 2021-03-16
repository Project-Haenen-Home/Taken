import Home from "@v/home.vue";
import Room from "@v/room.vue";

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
