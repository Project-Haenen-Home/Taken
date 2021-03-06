import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import { Task, PairIDName, TaskFilter } from "../common/types";

export interface RootState {
    tasks: Task[];
    rooms: PairIDName[];
    people: PairIDName[];

    deadSlider: number;

    overlay: PairIDName;
    taskFilter: TaskFilter;
}

export const key: InjectionKey<Store<RootState>> = Symbol();

export function useStore() {
    return baseUseStore(key);
}

export default createStore<RootState>({
    state: {
        tasks: Array<Task>(),
        rooms: Array<PairIDName>(),
        people: Array<PairIDName>(),

        deadSlider: 12,

        overlay: { _id: "", name: "" },
        taskFilter: { personID: [], roomID: "0", dayFilter: -1 }
    },
    mutations: {
        setTasks(state, value: Task[]) {
            state.tasks = value;
        },
        setRoom(state, value: PairIDName[]) {
            state.rooms = value;
        },
        setPeople(state, value: PairIDName[]) {
            state.people = value;
        },
        setOverlay(state, value: PairIDName) {
            console.log(value);
            state.overlay = value;
        },
        setDayFilter(state, value: number) {
            state.taskFilter.dayFilter = value;
        },
        setPersonFilter(state, value: string[]) {
            state.taskFilter.personID = value;
        },
        setRoomFilter(state, value: string) {
            state.taskFilter.roomID = value;
        },
        setDeadSlider(state, value: number) {
            state.deadSlider = value;
        }
    },
    actions: {
        fetchAll(context) {
            context.dispatch("fetchTasks");
            context.dispatch("fetchRooms");
            context.dispatch("fetchPeople");
        },
        fetchTasks(context) {
            console.log(context.state.taskFilter);
            const taskFilter = context.state.taskFilter;

            let query = "";
            const qArr: string[] = [];
            if (taskFilter.personID.length > 0) qArr.push("personID=" + taskFilter.personID.join("|"));
            if (taskFilter.roomID != "" && taskFilter.roomID != "0") qArr.push("roomID=" + taskFilter.roomID);
            if (taskFilter.dayFilter > 0) qArr.push("dayFilter=" + taskFilter.dayFilter);

            if (qArr.length > 0) query = "?" + qArr.join("&");

            fetch("http://wolleserver.local:2400/task" + query)
                .then((resp) => resp.json())
                .then((data: Task[]) => {
                    context.commit("setTasks", data);
                });
        },
        fetchRooms(context) {
            fetch("http://wolleserver.local:2400/room")
                .then((resp) => resp.json())
                .then((data: PairIDName[]) => {
                    context.commit("setRoom", data);
                });
        },
        fetchPeople(context) {
            fetch("http://wolleserver.local:2400/person")
                .then((resp) => resp.json())
                .then((data: PairIDName[]) => {
                    context.commit("setPeople", data);
                });
        }
    },
    modules: {}
});
